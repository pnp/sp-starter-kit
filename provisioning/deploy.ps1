#
# Notice the use of -ReturnConnection on Connect-PnPOnline and -Connection parameter on the majority
# of the PnP Cmdlets. We do this specifically because we do some so-called 'context switching' behind
# the scenes. In a normal case it is -not- needed to specifically specify the connection when using 
# a PnP Cmdlet. The moment you run Connect-PnPOnline (without -ReturnConnection) the cmdlets will work
# with the current connected context.
#
Param(
    [Parameter(Mandatory = $true, Position = 1)]
    [string]$TenantUrl,

    [Parameter(Mandatory = $false, Position = 1)]
    [string]$SitePrefix = "DEMO_",

    [Parameter(Mandatory = $false, Position = 2)]
    [PSCredential]$Credentials,

    [Parameter(Mandatory = $false, Position = 3)]
    [switch]$Build,

    [Parameter(Mandatory = $false, Position = 3)]
    [switch]$SkipInstall = $false,

    [Parameter(Mandatory = $false, Position = 3)]
    [switch]$SkipSiteCreation = $false,

    [Parameter(Mandatory = $false)]
    [switch]$SkipSolutionDeployment = $false,

    [Parameter(Mandatory = $false)]
    [string]$WeatherCity = "Helsinki",

    [Parameter(Mandatory = $false)]
    [string]$StockSymbol = "MSFT",

    [Parameter(Mandatory = $false)]
    [string]$StockAPIKey = "",

    [Parameter(Mandatory = $false)]
    [string]$PortalTitle = "SP Portal Showcase - Helsinki Style",

    [Parameter(Mandatory = $false)]
    [string]$ThemeName = "Portal Showcase",

    [Parameter(Mandatory = $false)]
    [string]$ThemePath = "$PSScriptRoot\..\Assets\designs\portaltheme.xml"
)    

# Load helper functions
. "$PSScriptRoot\functions.ps1"

# Check if PnP PowerShell is installed
if (!$SkipInstall) {
    $modules = Get-Module -Name SharePointPnPPowerShellOnline -ListAvailable
    if ($modules -eq $null) {
        # Not installed.
        Install-Module -Name SharePointPnPPowerShellOnline -Scope CurrentUser -Force
        Import-Module -Name SharePointPnPPowerShellOnline -DisableNameChecking
    }
}

if ($Credentials -eq $null) {
    $Credentials = Get-Credential -Message "Enter credentials to connect to $siteUrl"
}
if ($SkipSiteCreation -eq $false) {
    # check if URL is valid
    $SiteUrl = New-SiteHierarchy -TenantUrl $TenantUrl -Prefix $SitePrefix -ConfigurationFilePath ./hierarchy.json -Credentials $Credentials
    if ($SiteUrl -isnot [array]) {
        $SiteUrl = @($SiteUrl)
    }
}
else {
    $hierarchy = ConvertFrom-Json (Get-Content -Path ./hierarchy.json -Raw)
    $SiteUrl = @("$TenantUrl/sites/$SitePrefix$($hierarchy.url)")
}

# Check if package existsd
if ((Test-Path "$PSScriptRoot\..\solution\sharepoint\solution\sharepoint-portal-showcase.sppkg") -eq $false -or $Build) {
    Set-Location $PSScriptRoot\..\solution
    npm install
    Set-Location $PSScriptRoot
    # does not exist. Build and Package
    Write-Host "Building solution" -ForegroundColor Cyan
    gulp -f "$PSScriptRoot\..\solution\gulpfile.js" build 2>&1 | Out-Null
    Write-Host "Bundling solution" -ForegroundColor Cyan
    gulp -f "$PSScriptRoot\..\solution\gulpfile.js" bundle --ship 2>&1 | Out-Null
    Write-Host "Packaging solution" -ForegroundColor Cyan 
    gulp -f "$PSScriptRoot\..\solution\gulpfile.js" package-solution --ship 2>&1 | Out-Null
}
$connection = Connect-PnPOnline -Url $SiteUrl[0] -Credentials $Credentials -ReturnConnection

if ($SkipSolutionDeployment -ne $true) {
    # Temporary until schema change is present
    Write-Host "Provisioning solution" -ForegroundColor Cyan
    $existingApp = Get-PnPApp -Identity "sharepoint-portal-showcase-client-side-solution" -ErrorAction SilentlyContinue
    if ($existingApp -ne $null) {
        Remove-PnPApp -Identity $existingApp
    }
    Apply-PnPProvisioningTemplate -Path "$PSScriptRoot\solution.xml" -Connection $connection
    Update-AppIfPresent -AppName "sharepoint-portal-showcase-client-side-solution" -Connection $connection
}

# Disable Quicklaunch for Portal
$web = Get-PnPWeb -Connection $connection
$web.QuicklaunchEnabled = $false
$web.Update()
Invoke-PnPQuery -Connection $connection

# Create and Set theme if needed
Set-ThemeIfNotSet -ThemeName $ThemeName -ThemePath $ThemePath -Connection $connection

# Register the site as the hubsite
$isHub = Get-PnPHubSite -Identity $siteUrl[0] -ErrorAction SilentlyContinue -Connection $connection
if ($isHub -eq $null) {
    Write-Host "Registering site as hubsite" -ForegroundColor Cyan
    Register-PnPHubSite -Site $siteUrl -Connection $connection 2>&1 | Out-Null
    
}
$HubSiteId = (Get-PnPSite -Includes Id).Id.ToString()

if ($StockAPIKey -ne $null -and $StockAPIKey -ne "") {
    Write-Host "Storing Stock API Key in tenant properties"
    Set-PnPStorageEntity -Key "PnP-Portal-AlphaVantage-API-Key" -Value $StockAPIKey -Comment "API Key for Alpha Advantage REST Stock service" -Description "API Key for Alpha Advantage REST Stock service" -Connection $connection
}

Write-Host "Applying template to portal" -ForegroundColor Cyan
Apply-PnPProvisioningTemplate -Path "$PSScriptRoot\portal.xml" -Parameters @{"WeatherCity" = $WeatherCity; "PortalTitle" = $PortalTitle; "StockSymbol" = $StockSymbol; "HubSiteId" = $HubSiteId} -Connection $connection
Apply-PnPProvisioningTemplate -Path "$PSScriptRoot\PnP-PortalFooter-Links.xml" -Connection $connection

Write-Host "Updating navigation and applying collab templates"
$departmentNode = Get-PnPNavigationNode -Location TopNavigationBar -Connection $connection | Where-Object {$_.Title -eq "Departments"} 
$children = Get-PnPProperty -ClientObject $departmentNode -Property Children
$hierarchy = ConvertFrom-Json (Get-Content -Path "$PSScriptRoot\hierarchy.json" -Raw)
foreach ($child in $hierarchy.children) {
    if (($children | Where-Object {$_.Title -eq $child.title}) -eq $null) {
        $node = Add-PnPNavigationNode -Location TopNavigationBar -Parent $departmentNode[0].Id -Title $child.title -Url "$TenantUrl/sites/$SitePrefix$($child.url)" -Connection $connection
        $childConnection = Connect-PnPOnline -Url "$TenantUrl/sites/$SitePrefix$($child.url)" -ReturnConnection
    }
    Apply-PnPProvisioningTemplate -Path "$PSScriptRoot\collab.xml" -Connection $childConnection
}

Write-Host "Done." -ForegroundColor Green


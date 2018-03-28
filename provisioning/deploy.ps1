
Param(
    [Parameter(Mandatory = $false, Position = 1)]
    [string]$SiteUrl,

    [Parameter(Mandatory = $false, Position = 2)]
    [PSCredential]$Credentials,

    [Parameter(Mandatory = $false, Position = 3)]
    [switch]$Build,

    [Parameter(Mandatory = $false)]
    [switch]$SkipSolutionDeployment = $false,

    [Parameter(Mandatory = $false)]
    [string]$WeatherCity = "Helsinki",

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
$modules = Get-Module -Name SharePointPnPPowerShellOnline -ListAvailable
if ($modules -eq $null) {
    # Not installed.
    Install-Module -Name SharePointPnPPowerShellOnline -Scope CurrentUser
    Import-Module -Name SharePointPnPPowerShellOnline -DisableNameChecking
}

if ($SiteUrl -eq "") {
    $SiteUrl = Read-Host -Prompt "Enter full URL of the site"
}
if ($Credentials -eq $null) {
    $Credentials = Get-Credential -Message "Enter credentials to connect to $siteUrl"
}
# check if URL is valid
if (Test-Url -Url $SiteUrl) {
    if(-not (Test-SiteExists -Url $SiteUrl -Credentials $Credentials))
    {
        Write-Information "Site does not exist. Creating new communications site."
        $uri = [System.Uri]$SiteUrl
        # Connect to root site with same credentials
        $rootSiteConnection = Connect-PnPOnline -Url "$($uri.Scheme)://$($uri.Host)" -Credentials $Credentials -ReturnConnection
        New-PnPSite -Type CommunicationSite -Title "SP Portal Showcase" -Url $SiteUrl -Connection $rootSiteConnection
    } 

    # Check if package exists
    if((Test-Path "$PSScriptRoot\..\solution\sharepoint\solution\sharepoint-portal-showcase.sppkg") -eq $false -or $Build)
    {
        Set-Location $PSScriptRoot\..\solution
        npm install
        Set-Location $PSScriptRoot
        # does not exist. Build and Package
        Write-Host "Building solution" -ForegroundColor Cyan
        gulp -f "$PSScriptRoot\..\solution\gulpfile.js" build #2>&1 | Out-Null
        Write-Host "Bundling solution" -ForegroundColor Cyan
        gulp -f "$PSScriptRoot\..\solution\gulpfile.js" bundle --ship #2>&1 | Out-Null
        Write-Host "Packaging solution" -ForegroundColor Cyan 
        gulp -f "$PSScriptRoot\..\solution\gulpfile.js" package-solution --ship #2>&1 | Out-Null
    }
    $connection = Connect-PnPOnline -Url $SiteUrl -Credentials $Credentials -ReturnConnection
  
    if($SkipSolutionDeployment -ne $true)
    {
        # Temporary until schema change is present
        Write-Host "Provisioning solution" -ForegroundColor Cyan
        $existingApp = Get-PnPApp -Identity "sharepoint-portal-showcase-client-side-solution"
        if($existingApp -ne $null)
        {
            Remove-PnPApp -Identity $existingApp
        }
        Apply-PnPProvisioningTemplate -Path "$PSScriptRoot\solution.xml" -Connection $connection
        Update-AppIfPresent -AppName "sharepoint-portal-showcase-client-side-solution" -Connection $connection
    }

    # Create and Set theme if needed
    Set-ThemeIfNotSet -ThemeName $ThemeName -ThemePath $ThemePath -Connection $connection

    # Register the site as the hubsite
    $isHub = Get-PnPHubSite -Identity $siteUrl -ErrorAction SilentlyContinue -Connection $connection
    if($isHub -eq $null)
    {
        Write-Host "Registering site as hubsite" -ForegroundColor Cyan
        Register-PnPHubSite -Site $siteUrl -Connection $connection 2>&1 | Out-Null
    }

    Write-Host "Applying template to portal" -ForegroundColor Cyan
    Apply-PnPProvisioningTemplate -Path "$PSScriptRoot\portal.xml" -Parameters @{"WeatherCity"=$WeatherCity;"PortalTitle"=$PortalTitle} -Connection $connection
}
else {
    Write-Error -Message "Url is of incorrect format"
}
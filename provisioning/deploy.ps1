
Param(
    [Parameter(Mandatory = $false, Position = 1)]
    [string]$SiteUrl,

    [Parameter(Mandatory = $false, Position = 2)]
    [PSCredential]$Credentials
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
        Connect-PnPOnline -Url "$($uri.Scheme)://$($uri.Host)" -Credentials $Credentials
        New-PnPSite -Type CommunicationSite -Title "SP Portal Showcase" -Url $SiteUrl
    } 
    "Root: $PSScriptRoot"
    Connect-PnPOnline -Url $SiteUrl -Credentials $Credentials
    Apply-PnPProvisioningTemplate -Path "$PSScriptRoot\portal.xml"
}
else {
    Write-Error -Message "Url is of incorrect format"
}
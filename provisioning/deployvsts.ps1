Param(
    [Parameter(Mandatory = $false, Position = 1)]
    [string]$SiteUrl,

    [Parameter(Mandatory = $true, Position = 2)]
    [string]$Username,

    [Parameter(Mandatory = $true, Position = 3)]
    [string]$Password
)    

$secPassword = ConvertTo-SecureString -String $Password -AsPlainText -Force
$creds = New-Object System.Management.Automation.PSCredential ($Username, $secPassword)
.\deploy.ps1 -SiteUrl $SiteUrl -Credentials $creds

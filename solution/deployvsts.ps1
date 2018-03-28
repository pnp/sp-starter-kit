Param(
    [Parameter(Mandatory = $false, Position = 1)]
    [string]$SiteUrl,

    [Parameter(Mandatory = $true, Position = 2)]
    [string]$Username,

    [Parameter(Mandatory = $true, Position = 3)]
    [string]$Password,

    [Parameter(Mandatory = $false)]
    [string]$CurrentFolder
)    

$secPassword = ConvertTo-SecureString -String $Password -AsPlainText -Force
$creds = New-Object System.Management.Automation.PSCredential ($Username, $secPassword)
&"$CurrentFolder\deploy.ps1" -Build -SiteUrl $SiteUrl -Credentials $creds -CurrentFolder $CurrentFolder

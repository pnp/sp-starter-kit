$secpasswd = ConvertTo-SecureString "PlainTextPassword" -AsPlainText -Force
$mycreds = New-Object System.Management.Automation.PSCredential ("username", $secpasswd)
$portalurl = "https://officedevpnp.sharepoint.com/sites/portal"
$PSScriptRoot/deploy.ps1 -Build -SiteUrl $portalurl -Credentials $mycreds
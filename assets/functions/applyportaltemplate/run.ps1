$in = Get-Content $triggerInput -Raw
Write-Output "Incoming request for '$in'"
Connect-PnPOnline -AppId $env:SPO_AppId -AppSecret $env:SPO_AppSecret -Url $in
Write-Output "Connected to site"
Apply-PnPProvisioningTemplate -Path D:\home\site\wwwroot\applyportaltemplate\portal.xml
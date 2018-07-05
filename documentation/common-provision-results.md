# Common SP Starter Kit Provisioning results

When provisioning SP Started Kit following the [`deployment proces`](../provisioning/readme.md), common outputs including the following.

All examples are based on running the following commands in PowerShell, where `[yourtenant]` is replaced with your specific tenant id.

```powershell
Connect-PnPOnline https://[yourtenant].sharepoint.com
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com
```

## Successful provisioning

If all[`pre-requirements`](../#pre-requirements) have been addressed and met, no errors should be generated.

![Successful Deployment](../assets/images/provision-ps-success.png)

## ERROR: General cascading errors

`Watch the pre-requirements` If you see many cascading errors, most likely a pre-requirement has not been set.

1. Ensure you are connecting to your tenant site using a tenant admin account.

2. Ensure that you have the latest PnP PowerShell commandlets. You might need to remove the PnP PowerShell commandlets and re-install to ensure you have the latest. [`PnP PowerShell - Recommended 2.27.1806.1 or later`](https://github.com/SharePoint/PnP-PowerShell/releases).

3. Your tenant must be set to `targeted release` for all users, and you must wait at least 24 hours after setting targeted release for all users before running deploy.ps1.

4. Verify you have already created your `tenant app catalog`.

5. Verify the account you are using to connect to your tenant site has already been added as a term store administrator.

6. If you believe the error is new and not addressed below or in the [`issues list`](https://github.com/SharePoint/sp-starter-kit/issues), please submit a [`new issue`](https://github.com/SharePoint/sp-starter-kit/issues). If the error appears to be an error reported in PowerShell, please enable the PnP Trace Log before running the deploy.ps1 script and report those findings in your new issue.

```powershell
Set-PnPTraceLog -On -Level Debug
```


## ERROR: Inproper version of PnP PowerShell installed

[`PnP PowerShell - Recommended 2.27.1806.1 or later`](https://github.com/SharePoint/PnP-PowerShell/releases) is required for SP Starter Kit to properly provision. It is recommended that you have only the latest version of PnP PowerShell installed on your workstation as well.

If you do not have the proper version of PnP PowerShell installed, you may receive errors similar to:

`New-PnPSite : The term 'Get-PnPHubSite' is not recognized as the name of a cmdlet, function, script file, or
operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and
try again.`

`Get-PnPHubSite : The term 'Get-PnPHubSite' is not recognized as the name of a cmdlet, function, script file, or
operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and
try again.'

![Invalid PnP PS](../assets/images/provision-ps-failed-invalid-pnpps-version.png)

### Recommended solution

Verify you have the latest PnP PS commandlets installed, as well as look for competeting, older versions. If you receive any error that references that a given `term` is not `recognized as the name of a cmdlet, function, script file, or
operable program`, you have an issue with how PnP PowerShell is installed on your workstation.

```powershell
Get-Module SharePointPnPPowerShell* -ListAvailable | Select-Object Name,Version | Sort-Object Version -Descending
```

![Multiple PnP PS](../assets/images/provision-ps-failed-invalid-pnpps-multiple.png)

`Update PnP PowerShell'

```powershell
Update-Module SharePointPnPPowerShell*
```

`Remove older verions(s) of PnP PowerShell'

Based on the example above, we can see there are two versions of PnP PS installed. We could remove version  2.23.1802.0 with the following command:

```powershell
Get-InstalledModule -Name "SharePointPnPPowerShellOnline" -RequiredVersion 2.23.1802.0 | Uninstall-Module
```

## ERROR: App Catalog Required

The SP Starter Kit includes a SPFx solution package, `sharepoint-starter-kit.sppkg`. By default this package will be deployed to the tenant app catalog by the `deploy.ps1` script. You may also [`deploy the pacakge manually`](./manual-deploy-sppkg-solution.md). This requires that the App Catalog be available, which by default, does not exist.

If you have not completed this task, you might receive an error that includes:

`WARNING: Tenant app catalog doesn't exist. ALM step will be skipped!`

![App catalog required](../assets/images/provision-ps-failed-no-app-catalog.png)

### Recommended solution

[`Create a tenant app catalog`](./manual-deploy-sppkg-solution.md) and wait for deployment to complete, which may take minutes, hours, or possibly a day.

If you provision `sharepoint-starter-kit.sppkg` manually to your tenant app catalog, you may then have the SP Starter Kit deployment script skip the package deployment by utilizing the `-SkipSolutionDeployment` parameter, i.e.

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -SkipSolutionDeployment
```


## ERROR: Term Set Permissions Required

The deployment script includes a PnP provisioning template that attempts to configure demo terms within the managed metadata service / term store. For this to succeed, the account used to connect to your tenant must have been manually added as a term store administator. If you have not completed this task, you might receive an error that includes:

`Apply-PnPProvisioningTemplate : Access denied. You do not have permissions to perform this action or access this resource.
At ...\provisioning\deploy.ps1:98...`

![Term store permission required](../assets/images/provision-ps-failed-not-termset-admin.png)

### Recommended solution

Verify that the account you are using to provision SP Starter Kit is a term store administrator.


## ERROR: Not Targeted Release

SP Starter Kit requires that your tenant be set to `Targeted Release` for all users. When the deployment script attempts to provision solution.xml to your tenant, included is an action to upload the included .sppkg SPFx solution to your tenant app catalog as well as approve API permissions. This step fails if you have not properly configured your tenant to `Targeted Release`.

An error may appear similar to the following:

`Apply-PnPProvisioningTemplate : {"error":{"code":"-2147024891, System.UnauthorizedAccessException","message":"{"lang","en-us","value":"Access denied. You do not have permissions to perform this action or access this resource."}}}
At: ...\provisioning\deploy.ps1:98...`

![Targeted Release](../assets/images/provision-ps-failed-not-targeted-release.png)

### Invalid App package installation - API Management missing

Deployment of the included SPFx solution `sharepoint-starter-kit.sppkg` may be  [`completed manually`](./manual-deploy-sppkg-solution.md). If you do not have `Targeted Release` enabled for all users, or if you have enabled Targeted Release for all users but have not waited at least 24 hours to full roll out, you may encounter errors when manually deploying the .sppgk package, or attempting to find API Management.

`Manually deploying sharepoint-starter-kit.sppkg`

Although you will be able to upload the SPFx package to the tenant app catalog, an error will be thrown.

![SPFx deployment error](../assets/images/provision-package-deployment-error.png)

`API Management missing`

Without Targeted Release enabled, you will be unable to find `API Management` in the Preview Admin Center.

![SPFx deployment error API Management](../assets/images/provision-error-api-management-missing.png)

### Recommended solution

Ensure that your tenant is set to targeted release for all users.

`NOTE:` You will need to wait at least 24 hours after setting your tenant to targeted release before all required updates are provisioned to your tenant before the deploy script will execute correctly.


## ERROR: Unable to create existing sites - groups already exist

By default, the `deploy.ps1` script uses a site prefix `DEMO_` which it will then add to the begining of each site created by the starter kit, i.e. `https://[yourtenant].sharepoint.com/sites/DEMO_portal`. If you run the kit deployment, and then re-run the script without any changes, the script notice the sites exist and will continue.

If you delete the portal, hr, and/or marketing sites though, the deploy script will attempt to recreate the sites, but you may receive an error that includes:

`New-PnPSite :
{"d":{"Create":{"__metadata":{"type":"SP.Publishing.CommunicationSiteCreationResponse"},"SiteStatus":3,"SiteUrl":""}}}`

`New-PnPSite : {"error":{"code":"-2147024713, Microsoft.SharePoint.SPException","message":{"lang":"en-US","value":"The
group alias already exists."}}}`

`New-PnPSite : {"error":{"code":"-2147024713,
Microsoft.SharePoint.SPException","message":{"lang":"en-US","value":"The group alias already exists."}}}`

`Get-PnPHubSite : File Not Found.
At E:\Datastore\Git Projects\GitHub\sp-starter-kit-dev\provisioning\functions.ps1:179 char:21
+ ... $hubsites = Get-PnPHubSite -Identity $hubParams.Url -Connection $conn ...

Cannot index into a null array.
At E:\Datastore\Git Projects\GitHub\sp-starter-kit-dev\provisioning\functions.ps1:180 char:12
+         if($hubsites[0].Id -eq $null)`

![Recreate site](../assets/images/provision-ps-failed-recreate-sites.png)

This is because the delete sites are still in the recycle bin. The recycle bin will be have to be cleared out using the SharePoint Online Management Shell.

### Recommended solution

1. You can provide a new site prefix using the `-SitePrefix` paramenter, i.e. `-SitePrefix "mydemo"`

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -SitePrefix "mydemo"
```

2. If you want to re-use a site prefix, delete the sites created by the deployment script, then use PowerShell to clear the recycle bin. You will also want to unregister Hub associations created by the Kit.

```powershell
//Remove hubsite associations
Connect-PnPOnline https://[yourtenant].sharepoint.com
Unregister-PnPHubSite -Site https://[yourtenant].sharepoint.com/sites/[your-prefix]portal

//Remove deleted sites
Connect-SPOService -Url "https://[yourtenant]-admin.sharepoint.com"
Get-SPODeletedSite | foreach { Remove-SPODeletedSite -Identity $_.Url }
```

![Remove deleted sites](../assets/images/provision-ps-failed-recreate-sites-deleted.png)

![Remove deleted sites](../assets/images/provision-ps-failed-recreate-sites-deleted2.png)

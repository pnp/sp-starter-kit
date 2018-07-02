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


## ERROR: Term Set Permissions Required

The deployment script includes a PnP provisioning template that attempts to configure demo terms within the managed metadata service / term store. For this to succeed, the account used to connect to your tenant must have been manually added as a term store administator. If you have not completed this task, you might receive an error that includes:

`Apply-PnPProvisioningTemplate : Access denied. You do not have permissions to perform this action or access this resource.
At ...\provisioning\deploy.ps1:98...'

![Term store permission required](../assets/images/provision-ps-failed-not-termset-admin.png)

### Recommended solution

Verify that the account you are using to provision SP Starter Kit is a term store administrator.


## ERROR: Not Targeted Release

SP Starter Kit requires that your tenant be set to `Targeted Release` for all users. When the deployment script attempts to provision solution.xml to your tenant, included is an action to upload the included .sppkg SPFx solution to your tenant app catalog as well as approve API permissions. This step fails if you have not properly configured your tenant to `Targeted Release`.

An error may appear similar to the following:

`Apply-PnPProvisioningTemplate : {"error":{"code":"-2147024891, System.UnauthorizedAccessException","message":"{"lang","en-us","value":"Access denied. You do not have permissions to perform this action or access this resource."}}}
At: ...\provisioning\deploy.ps1:98...`

![Targeted Release](../assets/images/provision-ps-failed-not-targeted-releaase.png)

### Recommended solution

Ensure that your tenant is set to targeted release for all users.

`NOTE:` You will need to wait at least 24 hours after setting your tenant to targeted release before all required updates are provisioned to your tenant before the deploy script will execute correctly.

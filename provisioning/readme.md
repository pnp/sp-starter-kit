# SP Starter Kit Provisioning Guidance

The following documentation provides guidance related to the the provisioning process of **SP Starter Kit**.

The primary entry point for automatic end-to-end provisioning is the **deploy.ps1** PowerShell script found within the `provisioning` folder.

## Minimal path to success

Open PowerShell and run the following commands, changing the tenant url to your primary SharePoint tenant site. Before running deploy.ps1, use PnP PowerShell to connect to any site in your tenant with the [`Connect-PnPOnline` cmdlet](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/connect-pnponline?view=sharepoint-ps) using your own tenant url.

```powershell
Connect-PnPOnline https://[yourtenant].sharepoint.com
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com
```

**Common notes**

- The tenant site you provide is only used to create the initial connection to your tenant. SP Starter Kit will create new demo sites by default. Refer to (SkipSiteCreation parameter)[#-SkipSiteCreation].

- The site hierarchy of the sites created by the deployment process will be read from the hierarchy.json file. **Modify this file as appropriate** The top level site will be provisioned as a **Communication Site** while all children you provide wil be provisioned as **Modern Team Sites**.

- You will be asked for credentials during deployment, those need to be tenant admin credentials. Refer to (Credentials parameter)[#-Credentials].

- If one of the required sites does not exist, the deployment process will create it.

- If the SPFx solution .sppkg file is not present in the **solution** folder tree, the solution will be built and packaged. Force building the solution with the (Build parameter)[#-Build].

- Any existing instances of the SPFx solution in the tenant or site app catalogs will be removed before deployment. Refer to (SkipSolutionDeployment parameter)[#-SkipSolutionDeployment].

## Fixing provisioning errors

- If you run into errors during provisioning, refer to ['Common SP Starter Kit Provisioning results'](./documentation/common-provision-results.md) for additional suggestions and common mistakes

- Refer to the ['Issues List'](https://github.com/SharePoint/sp-starter-kit/issues) to see if anyone else has run into a similar issue, and if so posisble paths to success

- ['Submit a new issue'](https://github.com/SharePoint/sp-starter-kit/issues) if you are unable to find a solution to your specific error or question

## Pre-providing credentials

Credentials may be provided via the command line, or by using the ['Windows credential manager'](https://www.youtube.com/watch?v=w7NJ_qTK1l8).

**Credentials provided via command line**

```powershell
$creds = Get-Credential
Connect-PnPOnline https://[yourtenant].sharepoint.com -Credentials $creds
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -Credentials $creds
```

## Provisioning Parameters

The deployment process may be configured with the following set of parameters that may be used in tandem with each other.

### -TenantUrl ###

**required**

Your tenant url, such as https://contoso.sharepoint.com, or any site within your tenant. Provides context for the provisioning process.

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com
```

### -SitePrefix ###

**optional**

**default value**: `DEMO_`

Override the prefix that will be prepended to all sites provided in hierarchy.json.

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -SitePrefix "mydemo"
```

### -Credentials ###

**optional**

**default value**: `$null`

Pre-provide credentials for deployment

```powershell
$creds = Get-Credential
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -Credentials $creds
```

### -Build ###

**optional**

**default value**: `$false`

Force the build and packaging of the SPFx solution .sppkg file

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -Build
```

### -SkipPowerShellInstall ###

**optional**

**default value**: `$false`

If parameter provided, then skip validation check and possible installation of PnP PowerShell module.

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -SkipPowerShellInstall
```

### -SkipSiteCreation ###

**optional**

**default value**: `$false`

If parameter provided, then skip the creation of the sites found within hierarchy.json. There is an assumption then that the sites have already been created. Useful when re-running the automated end-to-end deployment process.

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -SkipSiteCreation
```

### -SkipSolutionDeployment ###

**optional**

**default value**: `$false`

If parameter provided, then skip the deployment of the SPFx solution to the tenant app catalog.

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -SkipSolutionDeployment
```

### -Company ###

**optional**

**default value**: `Contoso`

Provide your company name, which is used during the site provisioning process to pre-set titles.

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -Company "SharePoint PnP"
```

### -WeatherCity ###

**optional**

**default value**: `Seattle`

The Weather webpart defaults to 'Seattle'. You can override this during deployment by utilizing the **WeatherCity** parameter as follows.

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -WeatherCity "Amsterdam"
```

### -StockSymbol ###

**optional**

**default value**: `MSFT`

The Stock Information webpart defaults to 'MSFT'. You can override this during deployment by utilizing the "StockSymbol" parameter although you will also need to [Request a custom API key to Alpha Vantage](../documentation/tenant-settings.md#APIKeyAlphaVantage) and utilize the "StockAPIKey" parameter as follows:

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -StockSymbol "GT" -StockAPIKey "your-api-key"
```

### -StockAPIKey ###

**optional**

**default value**: ``

Used in tandem with the **StockSymbol** parameter to configure the Stock Information webpart. [Request a custom API key to Alpha Vantage](../documentation/tenant-settings.md#APIKeyAlphaVantage).

```powershell
.\deploy.ps1 -TenantUrl https://[yourtenant].sharepoint.com -StockSymbol "GT" -StockAPIKey "your-api-key"
```

# SP Starter Kit Provisioning Guidance

The following documentation provides guidance related to the the provisioning process of **SP Starter Kit**.


## Minimal path to success

Open PowerShell and run the following commands, changing the tenant url to your primary SharePoint tenant site.

In order to succesfully install the SP Starter Kit you are required to install the latest PnP PowerShell (version 3.2.1810.0 or higher), which is done through

```powershell
Install-Module -Name SharePointPnPPowerShellOnline
```

After successfully installing PnP PowerShell you need to connect to your tenant:

```powershell
Connect-PnPOnline -Url https://[yourtenant].sharepoint.com
```

Then the easiest way to install the starter it is by entering:

```powershell
Apply-PnPTenantTemplate -Path starterkit.pnp
```

**Common notes**

- By default the starter kit will create 3 site collections, using a common prefix of 'Contoso'. These sites will be called 'contosoportal' (a communications site), 'contosohr' and 'contosomarketing' (both team sites). If you want to provide a different prefix, enter the apply cmdlet as follows:

```powershell
Apply-PnPTenantTemplate -Path starterkit.pnp -Parameters @{"SitePrefixUrl"="contoso"}
```

where you replace the 'contoso' part with your own prefix, for instance the name of your company.

- The tenant site you provide is only used to create the initial connection to your tenant. SP Starter Kit will create new demo sites by default. If the site collections are in place it will reuse those site collections.

- The site hierarchy of the sites created by the deployment process will be read from the starterkit.pnp file. If you want to modify this hierarchy you will have to modify and repackage the starterkit.xml into a starterkit.pnp file, which you can do using

```powershell
$kit = Read-PnPTenantTemplate -Path .\starterkit.xml
Save-PnPTenantTemplate -Hierarchy $kit -Out yourstarterkit.pnp
```

- Make sure that the credentials you use towards your tenat have tenant-admin rights. We require this to provision the taxonomy parts.

## Fixing provisioning errors

- If you run into errors during provisioning, refer to ['Common SP Starter Kit Provisioning results'](../documentation/common-provision-results.md) for additional suggestions and common mistakes

- Refer to the ['Issues List'](https://github.com/SharePoint/sp-starter-kit/issues) to see if anyone else has run into a similar issue, and if so posisble paths to success

- ['Submit a new issue'](https://github.com/SharePoint/sp-starter-kit/issues) if you are unable to find a solution to your specific error or question

## Pre-providing credentials

Credentials may be provided via the command line, or by using the ['Windows credential manager'](https://www.youtube.com/watch?v=w7NJ_qTK1l8).

**Credentials provided via command line**

```powershell
$creds = Get-Credential
Connect-PnPOnline https://[yourtenant].sharepoint.com -Credentials $creds
Apply-PnPTenantTemplate -Path .\starterkit.pnp
```

## Provisioning Parameters

The deployment process may be configured with the following set of parameters that may be used in tandem with each other.

### -Parameters ###

**Optional**

You can override certain parameters, being:

Company - defaults to "Contoso Electronics"
SiteUrlPrefix - defaults to "Contoso"
WeatherCity - defaults to "Seattle"
StockSymbol - defaults to "MSFT"

Override one or more settings can be done like this:

```powershell
Apply-PnPTenantTemplate -Path .\starterkit.pnp -Parameters @{"Company"="Your Company Name";"SiteUrlPrefix"="YourCompany";"WeatherCity"="Stockholm"}
```

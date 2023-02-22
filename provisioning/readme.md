# SP Starter Kit Provisioning Guidance - SharePoint Online

The following documentation provides guidance related to the provisioning process of **SP Starter Kit**.

**For SharePoint Online only**

This document provides guidance on installing a full installation for **SP Starter Kit** for only **SharePoint Online**. The installation includes one SPFx bundled solution per SPFx component, i.e. webpart, extension, library.

It is recommended you read this entire document before installing the starter kit, in particular pay close attention to [Common notes](#common-notes) and [Fixing provisioning errors](#fixing-provisioning-errors).

# Table of contents

- [Choose the right method depending on your requirements](#choose-the-right-method-depending-on-your-requirements)
- [Minimal path to success](#minimal-path-to-success)
- [Important notes](#important-notes)
- [Fixing provisioning errors](#fixing-provisioning-errors)
- [Pre-providing credentials](#pre-providing-credentials)
- [Provisioning Parameters](#provisioning-parameters)


## Choose the right method depending on your requirements

- **[Default installation](#minimal-path-to-success)** - SharePoint Online only, full installation, one SPFx solution per component.

- [Only SPFx components](./readme-spfx-only.md) - Advanced - Only install SPFx solutions to tenant app catalog, will not provision site designs, site scripts, sites, or content.

- [Single solution installation - deprecated v1 starter kit](https://github.com/pnp/sp-starter-kit/tree/v1/provisioning/) - SharePoint Online only, deprecated full installation, one SPFx solution for all components.

- [SharePoint 2019 - deprecated v2 starter kit](.https://github.com/pnp/sp-starter-kit/tree/v1/provisioning/readme-sp2019.md) - SharePoint 2019 ready, limited featureset.


## Minimal path to success

1. Ensure that you have met all **[Pre-requirements](../README.md#Pre-requirements)**

2. Open PowerShell and run the following commands, changing the tenant url to your primary SharePoint tenant site.

   In order to successfully install the SP Starter Kit, you are required to install the latest [PnP PowerShell](https://github.com/pnp/powershell) (validated at version 1.12.0 or higher), which can be installed with the following PowerShell command:

   ```powershell
   Install-Module -Name PnP.PowerShell
   ```

3. After successfully installing PnP PowerShell, you need to connect to your tenant **using authorization credentials that have tenant administrative rigths**. This level of access is required to provision taxonomy.

   ```powershell
   Connect-PnPOnline -Url https://[yourtenant].sharepoint.com
   ```

4. Install the starter kit using the **Invoke-PnPTenantTemplate** PowerShell commandlet from this project's **./provisioning** folder:

   ```powershell
   Invoke-PnPTenantTemplate -Path starterkit.pnp
   ```


## Important notes

- By default the starter kit will create three site collections, using a common prefix of 'Contoso'. These sites will be called 'contosoportal' (a communications site), 'contosohr' (a team site), and 'contosomarketing' (a team site). 

  To customize the site collection urls, use the **-Parameters** commandlet parameter as follows:

  ```powershell
  Invoke-PnPTenantTemplate -Path starterkit.pnp -Parameters @{"PORTALURL"="/sites/contosoportal"; "MARKETINGALIAS"="contosomarketing";   "HRALIAS"="contosohr" }
  ```

  Replace the values of **"PORTALURL"**, **"MARKETINGALIAS"**, and **"HRALIAS"** with your own custom site paths. The **PORTALURL** parameter is the tenant relative url for your main site collection. The two alias parameters are used to create modern team sites with connected Office 365 unified groups.

- The tenant site you connect to via PowerShell, i.e. **https://[yourtenant].sharepoint.com**, is only used to create the initial connection to your tenant. During application of the starter kit, the three demo sites previously mentioned will be created within the connected tenant. If any of the site collections already exist, the starter kit provisioning process will reuse the existing site collections.

- The site hierarchy of the sites created by the deployment process will be read from the starterkit.pnp file. If you want to modify this template you will have to modify and repackage **starterkit.xml** found in this project's **./source/templates** folder, into a new starterkit.pnp file. This may be accomplished with the following PowerShell commandlets:

  ```powershell
  $kit = Read-PnPTenantTemplate -Path ..\source\templates\starterkit.xml
  Save-PnPTenantTemplate -Template $kit -Out yourstarterkit.pnp
  ```

- Ensure the credentials you use to connect to your tenant have **tenant administrative rights**. We require this to provision the taxonomy parts.


## Fixing provisioning errors

- If you run into errors during provisioning, refer to ['Common SP Starter Kit Provisioning results'](../documentation/common-provision-results.md) for additional suggestions and common mistakes

- Refer to the ['Issues List'](https://github.com/SharePoint/sp-starter-kit/issues) to see if anyone else has run into a similar issue, and if so possible paths to success

- ['Submit a new issue'](https://github.com/SharePoint/sp-starter-kit/issues) if you are unable to find a solution to your specific error or question


## Pre-providing credentials

Credentials may be provided via the command line, or by using the ['Windows credential manager'](https://www.youtube.com/watch?v=w7NJ_qTK1l8).

**Credentials provided via command line**

```powershell
$creds = Get-Credential
Connect-PnPOnline https://[yourtenant].sharepoint.com -Credentials $creds
Invoke-PnPTenantTemplate -Path .\starterkit.pnp
```


## Provisioning Parameters

The deployment process may be configured with the following set of parameters that may be used in tandem with each other.

### -Parameters ###

**Optional**

You can override certain parameters, including:

**Company** - defaults to "Contoso Electronics"
**SiteUrlPrefix** - defaults to "Contoso"
**WeatherCity** - defaults to "Seattle"
**StockSymbol** - defaults to "MSFT"

**PORTALURL** - the site path to the starter kit portal site url, defaults to "/sites/contosoportal"
**MARKETINGALIAS** - the site path alias for the starter kit "marketing" team site, defaults to "contosomarketing"
**HRALIAS** - the site path alias for the starter kit "hr" team site, defaults to "contosohr"

Override one or more setting using the **-Parameters** parameter similar to the following. Each paramater must be separated by a semicolon, i.e. **;**:

```powershell
Invoke-PnPTenantTemplate -Path .\starterkit.pnp -Parameters @{"Company"="Your Company Name";"SiteUrlPrefix"="YourCompany";"WeatherCity"="Stockholm"}
```

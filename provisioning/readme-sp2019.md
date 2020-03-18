# SP Starter Kit Provisioning Guidance

The following documentation provides guidance related to the the provisioning process of **SP Starter Kit**.

## Installing the Starter Kit in a SharePoint 2019 Environment

**TODO** provide documentation for SharePoint 2019 - also note the limited 

**For SharePoint Online only**

This document provides guidance on installing a full installation for **SP Starter Kit** for only **SharePoint Online**. The installation includes one SPFx bundled solution per SPFx component, i.e. webpart, extentsion, librar. Additional options exist, refer to [Choose the right method depending on your requirements](#choose-the-right-method-depending-on-your-requirements).

It is recommended you read this entire document before installing the starter kit, in particular pay close attention to [Common notes](#common-notes) and [Fixing provisioning errors](#fixing-provisioning-errors)

## Choose the right method depending on your requirements

- **[Default installation](#minimal-path-to-success)** - SharePoint Online only, full installation, SPFx solution per component.

- [SharePoint 2019](../readme-sp2019.md) - SharePoint 2019 ready, limited featureset.

- [Only SPFx components](../readme-spfx-only.md) - Advanced - Only install SPFx solutions.

- [Single solution installation - deprecated](../readme-single-solution.md) - SharePoint Online only, decrecated full installation, on SPFx solution for all components.

## Minimal path to success

Open PowerShell and run the following commands, changing the tenant url to your primary SharePoint tenant site.

In order to succesfully install the SP Starter Kit, you are required to install the latest PnP PowerShell for SharePoint Online (version 3.19.2003 or higher), which can be installed with the following PowerShell command:

```powershell
Install-Module -Name SharePointPnPPowerShellOnline
```

After successfully installing PnP PowerShell, you need to connect to your tenant:

```powershell
Connect-PnPOnline -Url https://[yourtenant].sharepoint.com
```

Install the starter kit using the **Apply-PnPTenantTemplate** PowerShell commandlet from this project's **./provisioning** folder:

```powershell
Apply-PnPTenantTemplate -Path starterkit.pnp
```

## Common notes

- By default the starter kit will create three site collections, using a common prefix of 'Contoso'. These sites will be called 'contosoportal' (a communications site), 'contosohr' (a team site), and 'contosomarketing' (a team site). 

 To customize the site collection urls, use the **-Parameters** commandlet parameter as follows:

```powershell
Apply-PnPTenantTemplate -Path starterkit.pnp -Parameters @{"PORTALURL"="/sites/contosoportal"; "MARKETINGALIAS"="contosomarketing"; "HRALIAS"="contosohr" }
```

 Replace the values of **"PORTALURL"**, **"MARKETINGALIAS"**, and **"HRALIAS"** with your own custom site paths. The **PORTALURL** parameter is the tenant relative url for your main site collection. The two alias parameters are used to create modern team sites with connected Office 365 unified groups.

- The tenant site you connect to via PowerShell, i.e. **https://[yourtenant].sharepoint.com**, is only used to create the initial connection to your tenant. During application of the starter kit, the three demo sites previously mentioned will be created within the conncted tenant. If any of the site collections already exist, the starter kit provisioning process will reuse the existing site collections.

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

## Installing the Starter Kit in a SharePoint 2019 Environment

**TODO** provide documentation for SharePoint 2019 - also note the limited 
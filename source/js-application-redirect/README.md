# Redirect Application Customizer

Redirect from URL based on mapping from a list on the site. Can be used to automatically redirect from pages to other locations.

The redirection paths are administered via a SharePoint list named "PnP Redirect Links" that is hosted by the site that is set to use the redirect extension.

The list is automatically created by the extension if it is not found, dependent upon the current user loading the site has sufficient permissions to add a new list.

![Redirection Extension](../../assets/images/components/ext-redirects.gif)

> Screenshot is from the v1 version.


## PnP Redirect Links list details

This extension is dependent on a explicit `PnP Redirect Links` list that must be located in the current site that is utilizing the redirect extension.

| Display Name | Name | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Source URL | PnPSourceUrl | Hyperlink | yes | The path of the source page |
| Destination URL | PnPDestinationUrl | Hyperlink | yes | The path of the destination page |
| Redirection Enabled | PnPRedirectionEnabled | Boolean | yes | Should the particular redirection occur |

> Notice by default the extension will automatically create this list if it is not found in the current site, assuming the current user has the appropriate permissions to add a new list.

Original v1 implementation located at https://github.com/SharePoint/sp-starter-kit/blob/master/solution/src/extensions/redirect/RedirectApplicationCustomizer.ts

In v2 release repackaged as its own solution to provide more flexibility from deployment perspective.

In v3 release, SPFx was upgraded to version 1.16.1.

## Creating a redirection entry

Assume you have a url, **https://contoso.sharepoint.com/sites/contoso/sitepages/oldnews.aspx**, and you wish to automatically redirect visitors to this oldnews.aspx page to **https://contoso.sharepoint.com/sites/news/sitepages/news.aspx**.

- Within the site, **https://contoso.sharepoint.com/sites/contoso/**, you will need to enable the redirect extension and ensure the "PnP Redirect Links" list is created by the extension by loading any page within the site. If the list does not get automatically created, check to ensure your user account has sufficient permissions to add lists to the site, and also validate the extension is loading.

- Create a new list item in "PnP Redirect Links".

- List item settings:
  - Source Url: /sites/contoso/sitepages/oldnews.aspx
  - Destination Url: https://contoso.sharepoint.com/sites/news/sitepages/news.aspx
  - Redirection Enabled: yes

- After you save the list item, reload oldnews.aspx and you should be automatically redirected to the destination url.

- If the redirection does not occur, check the console log or network trace to validate that the extension was loaded.


## Installing the extension

See getting started from [SP-Starter-Kit repository readme](https://github.com/pnp/sp-starter-kit) for basic installation of the SP Starter Kit which includes installing the application customizer's sppkg to the tenant app catalog, and activating the extension on the hub site and associated team sites.

You can also download just the [extension (sppkg) file](./sharepoint/solution/js-application-redirect.sppkg) and install that to your tenant's app catalog. This extension does not have external dependencies.

> As this is a SharePoint Framework extension, you will need to explicitly enable this extension in a site using CSOM, REST APIs, PnP PowerShell, or PnP cli.

**A common approach to activate the extention on a given site connection is to use PnP PowerShell commandlets:**

  ```powershell
  Connect-PnPOnline https://contosodemosk.sharepoint.com/sites/site-to-configure
  Add-PnPCustomAction -Name "Redirect" -Title "Redirect" -ClientSideComponentId 27f45dfa-839e-45c2-a379-fbfe627ed97c -Location "ClientSideExtension.ApplicationCustomizer" -ClientSideComponentProperties "{&quot;redirectionsListTitle&quot;:&quot;PnP Redirect Links&quot;}" -Scope Site
  ```

> Set the full url and path of the Connect-PnPOnline commandlet to fit your specific tenant / site


## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.16.1-green.svg)

* Supported in SharePoint Online

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

Extension creates the needed list automatically if it's missing and user has sufficient permissions for the creation operation.

## Solution

Solution|Author(s)
--------|---------
solution/src/extensions/redirect | Paolo Pialorsi (@PaoloPia)
js-application-redirect | Sébastien Levert (@sebastienlevert)
js-application-redirect | Chandani Prajapati (@Chandani_SPD)

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 22, 2018|Initial release
2.0|December 29, 2019|v2.0
3.0|February 2023|Initial release for SharePoint Starter Kit v3 (Upgraded to SPFx 1.16.1)
## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* Move to correct folder where solution exists
* in the command line run:
  * `npm install`
  * `gulp serve`

## Features

Key features demostrated by this solution:

* PnPjs usage in the solution
* Dynamic creation of the list if it's missing

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/js-application-redirect" />

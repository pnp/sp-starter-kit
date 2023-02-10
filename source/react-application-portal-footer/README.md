# Portal Footer Application Customizer

This application customizer provides you the ability to include a footer designed for communiation sites. The footer includes sets of links configured using the tenant wide deployment list at the app catalog (global links). A second set of links are personalized links, unqiue to each user, stored within each user's user profile within a user profile property. If this property does not exist in the user profile service, this capability will be hidden. 

Portal footer has extending UI experience if user clicks the top arrow in the footer. 

![Portal Footer](../../assets/images/components/ext-portal-footer.gif)

Details on implementation at https://github.com/SharePoint/sp-starter-kit/blob/master/documentation/components/ext-portal-footer.md

## Configurable Properties

The `Portal Footer` application customizers can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Global links | linksListTitle | string | yes | The title of the list of global links |
| User profile propery name | personalItemsStorageProperty | string | yes | The name of the user profile property to store user specific links |
| Copyright message | copyright | string | yes | Footer copyright message |
| Support message | support | string | yes | A support message, i.e. email address or link |

## Modifying Extension properties

This extension has a collection of properties that are set by default, although may be modified using the [`PnP PowerShell`](https://github.com/pnp/powershell) commandlet Set-PnPApplicationCustomizer.

```powershell
Set-PnPApplicationCustomizer -Title "PortalFooter" -ClientSideComponentId df889434-1b1c-4f5b-ada3-086d948e4270 -ClientSideComponentProperties "{`"linksListTitle`":`"PnP-PortalFooter-Links`",`"personalItemsStorageProperty`":`"PnP-CollabFooter-MyLinks`",`"copyright`":`"Ⓒ Copyright 2023`",`"support`":`"support@contoso.com`"}"
```

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.16.1-green.svg)

* Supported in SharePoint Online

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

The shared links are retrieved from a list called `PnP-PortalFooter-Links`. The webpart will first look to see if the site is part of a hub site and get the data from the list from that hub site. If no hub site is available it falls back to the local site as the source. If you have not applied the starterkit.pnp package you can find the xml used to provision the list [here](../../provisioning/starterkit.xml)

Personalized links only works if a custom property called `PnP-CollabFooter-MyLinks` has been added to the user profile service. By default, this custom property is shared by both the portal and collaboration footer extensions to provide one list per user of customized links. This is string based property with maximum lenght. As there's no APIs to automate the property creation to the user profile service, this property will need to be manually created to enable the personalized links capability. Instructions to set up the custom property can be found [here](../../documentation/tenant-settings.md#create-a-custom-property-in-the-user-profile-service).

Both component property names can be [changed in the SPFx extension properties](#modifying-extension-properties). 

## Solution

Solution|Author(s)
--------|---------
react-application-portal-footer | Waldek Mastykarz
react-application-portal-footer | Paolo Pialorsi
react-application-portal-footer | David Opdendries
react-application-portal-footer | Chandani Prajapati

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 2019|Initial release for SharePoint Starter Kit v2
2.0|January 1, 2020|Initial release for SharePoint Starter Kit v2
3.0|February 2023|v3 - Upgraded to SPFx 1.16.1

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
* Work with data from user property

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-application-portal-footer" />

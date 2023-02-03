# Collaboration Footer Application Customizers

This application customizer provides you the ability to include a footer designed for normal and group associated teams sites. The footer includes sets of links configured within a taxonomy term set via the term store. A second set of links are personalized links, unqiue to each user, stored within each user's user profile within a user profile property. If this property does not exist in the user profile service, this capability will be hidden. 

![Collaboration Footer](../../assets/images/components/ext-collab-footer.gif)

Taxonomy dependency is utilized within the collaboration footer to provide a global set of links across multiple team sites, as well as a technology demostrator. Visit the [Portal footer application customizer](../react-application-portal-footer/) for an example of footer links driven by a SharePoint list.

Details on implementation at https://github.com/SharePoint/sp-starter-kit/blob/master/documentation/components/ext-collab-footer.md

## Configurable Properties

The `Collaboration Footer` application customizers can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Link Term Set name | sourceTermSet | string | yes | The name of the term set that stores link terms for footer |
| User profile propery name | personalItemsStorageProperty | string | yes | The name of the user profile property to store user specific links |

## Modifying Extension properties

This extension has a collection of properties that are set by default, although may be modified using the [`PnP PowerShell`](https://github.com/pnp/powershell) commandlet Set-PnPApplicationCustomizer.

```powershell
Set-PnPApplicationCustomizer -Title "CollabFooter" -ClientSideComponentId 6638da67-06f4-4f55-a1df-485d568e8b72 -ClientSideComponentProperties "{`"sourceTermSet`":`"PnP-CollabFooter-SharedLinks`",`"personalItemsStorageProperty`":`"PnP-CollabFooter-MyLinks`"}"
```

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.16.1-green.svg)

* Supported in SharePoint Online

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

The shared links are retrieved from a term set called `PnP-CollabFooter-SharedLinks`. This termset's intended use must be set for to be used for site navigation. The url is set in the terms property "simple link or header". The termset is created when applying the pnp tenant template found in the instructrions. The xml used to provision the termset can be found [here](../../provisioning/starterkit.xml).

Personalized links only works if a custom property called `PnP-CollabFooter-MyLinks` has been added on the user profile service. This is string based property with maximum lenght. As there's no APIs to automate the property creation to the user profile service, this property will need to be manually created to enable the personalized links capability. Instructions to set up the custom property can be found [here](../../documentation/tenant-settings.md#create-a-custom-property-in-the-user-profile-service).

Both component property names can be [changed in the SPFx extension properties](#modifying-extension-properties). 

## Solution

Solution|Author(s)
--------|---------
react-application-collab-footer | Paolo Pialorsi
react-application-collab-footer | David Opdendries
react-application-collab-footer | Chandani Prajapati

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 9, 2018|Initial release
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

* Work with term sets using spHttpClient
* Work with data from user property

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-application-collab-footer" />

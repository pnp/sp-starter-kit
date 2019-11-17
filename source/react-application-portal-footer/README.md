# Portal Footer Application Customizers

This application customizer provides you the ability to include a footer designed for communiation sites. The footer includes sets of links configured using the tenant wide deployment list at the app catalog (global links). A second set of links are personalized links, unqiue to each user, stored within each user's user profile within a user profile property. If this property does not exist in the user profile service, this capability will be hidden. 

Portal footer has extending UI experience if user clicks the top arrow in the footer. 

Personalized property capability only works in SharePoint Online as SP2019 does not have support for user profile property access using CSOM/REST.

![Collaboration Footer](../../assets/images/components/ext-portal-footer.gif)

Screenshot is from the v1 version, which worked using taxonomy term set (updated when v2 avaialble). Taxonomy dependency is removed from the v2 implementation to simplify the implementation.

Details on v1 implementation at https://github.com/SharePoint/sp-starter-kit/blob/master/documentation/components/ext-portal-footer.md

In v2 release repackaged as it's own solution to provide more flexibility from deployment perspective.

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.4-green.svg)

* Supported with SharePoint 2019

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)
* [SharePoint 2019](https://docs.microsoft.com/en-us/sharepoint/dev/general-development/sharepoint-2019-development-platform)

## Prerequisites

Personalized links only works if a custom property called `PnP-CollabFooter-MyLinks` has been added on the user profile service. This is string based property with maximum lenght. As there's no APIs to automate the property creation to the user profile service, this property will need to be manually created to enable the personalized links capability.

Personalized links capability does not also work in on-premises as there's no APIs to access the user profile service remotely.In SharePoint Online this is performed using CSOM APIs which are abstracted by using PnPjs library.

## Solution

Solution|Author(s)
--------|---------
folder name | Author details

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 25, 2019|Initial release for SharePoint Starter Kit v2

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

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-application-portal-footer" />

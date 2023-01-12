# Portal Footer Application Customizers

This application customizer provides you the ability to include a footer designed for communiation sites. The footer includes sets of links configured using the tenant wide deployment list at the app catalog (global links). A second set of links are personalized links, unqiue to each user, stored within each user's user profile within a user profile property. If this property does not exist in the user profile service, this capability will be hidden. 

Portal footer has extending UI experience if user clicks the top arrow in the footer. 

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

## Prerequisites

The shared links are retrieved from a list called `PnP-PortalFooter-Links`. The webpart will first look to see if the site is part of a hub site and get the data from the list from that hub site. If no hub site is available it falls back to the local site as the source. If you have not applied the starterkit.pnp package you can find the xml used to provision the list [here](../../provisioning/starterkit.xml)

Personalized links only works if a custom property called `PnP-CollabFooter-MyLinks` has been added on the user profile service. This is string based property with maximum lenght. As there's no APIs to automate the property creation to the user profile service, this property will need to be manually created to enable the personalized links capability. Instructions to set up the custom property can be found [here](../../documentation/tenant-settings.md#create-a-custom-property-in-the-user-profile-service).

Both component property names can be changed in the SPFx extension properties. 

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
1.0|January 12, 2019|Initial release for SharePoint Starter Kit v2
2.0|January 12, 2013|Initial release for SharePoint Starter Kit v3 (Upgraded to SPFx 1.16.1)

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

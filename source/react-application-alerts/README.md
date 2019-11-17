# Alerts Application Customizers

This application customizer provides you the ability to show notifications on the pages in the top / header area.

![Alert](../../assets/images/components/ext-alert.gif)

Screenshot is from the v1 version.

## Alert list details

This extension is dependent on a explicit `Alerts` list to be located in a hub site to which current site collection is associated. If site collection is the actual hub site, alerts list has to exist in the root of that site collection.

| Display Name | Name | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Alert type | PnPAlertType | choice | yes | Type of Alert to display. Urgent = Red. Information = Yellow. |
| Alert message | PnPAlertMessage | string | yes | The message you want to display in the alert |
| Start date-time | PnPAlertStartDateTime | date time | yes | The Date/Time the alert should show in the header placeholder |
| End date-time | PnPAlertEndDateTime | date time | yes | The Date/Time the alert stops showing in the header placeholder |
| More information link | PnPAlertMoreInformation | URL | no | Provides a clickable link at the end of the alert message |

> Notice that in default SharePoint Starter Kit installation this list is automatically provisioned on the hub site in the case of SharePoint Online solution. As SharePoint 2019 does NOT support hub sites, alert only works with the site collection root alerts.

Original v1 implementation located at https://github.com/SharePoint/sp-starter-kit/blob/master/documentation/components/ext-alert.md

In v2 release repackaged as it's own solution to provide more flexibility from deployment perspective.

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.4-green.svg)

* Supported with SharePoint 2019

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)
* [SharePoint 2019](https://docs.microsoft.com/en-us/sharepoint/dev/general-development/sharepoint-2019-development-platform)

## Prerequisites

Alert is is created automatically to the root of the site collection if it's missing where the extension is executed. This requires that the person using hte extension will have sufficient permissions. If permissions are missing, then application customizer will not render anything.

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

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-application-alerts" />

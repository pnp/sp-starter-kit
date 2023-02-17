# Discuss now extension

# Discuss Now List View Command Set

This List View Command Set provides you the ability to add a custom dialog to start a discussion on a specific document within a document library by creating a discussion on the choosen team at Microsoft Team.

The message is added to the team by using Microsoft Graph APIs based on choosen list of items.

The command set extension is designed for group associated team sites.

![Discuss Now](../../assets/images/components/ext-collab-discussnow.png)

This extension requires access to the Microsoft Graph and must target a specific list template types, such as `101` for document libraries.

Details on the v1 version of the extension from https://github.com/SharePoint/sp-starter-kit/blob/master/documentation/components/ext-collab-discussnow.md. Notice that the v1 UI is different as that was creatin a meeting for the discussion. In the v2, we need to ask list of teams which user has access to start the discussion. 

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.16.1-green.svg)

* Supported in SharePoint Online

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

Permissions to Microsoft Graph - scope: "Group.ReadWrite.All"

## Solution

Solution|Author(s)
--------|---------
react-command-discuss-now | Chandani Prajapati

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 25, 2019|Initial release
2.0|February 2023|Initial release for SharePoint Starter Kit v3 (Upgraded to SPFx 1.16.1)

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* Move to correct folder
* Update config.json based on the tenant details which you use for testing
* in the command line run:
  * `npm install`
  * `gulp serve`

## Features

This Application customizer illustrates the following concepts on top of the SharePoint Framework:

* Using Microsoft Graph within an application customizer command set

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-command-discuss-now" />

# Links webpart

This web part provides you the ability to add a per instance listing of links with the ability to group sets of links. Links are stored as a collection of links within the web part's properties, removing the need for link storage within SharePoint lists, tenant properties, or other external link storage requirements.

Links and groups are both customizable.

![Links](../../assets/images/components/part-links.gif)

## Configurable Properties

The `Links` webpart can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Useful links | title | string | no | The webpart title, editable inline with the webpart itself |
| Group names for the links | groupData | collection | no | Collection of group names for grouping links into sets |
| Link data | collectionData | collection | no | Collection of links |

### groupData Collection Properties

Configurable properties for each collection row within the `groupData` collection:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Title | title | string | yes | The name of a group |

### collectionData Collection Properties

Configurable properties for each collection row within the `collectionData` collection:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Title | title | string | yes | The text / title of the link |
| URL | url | string | yes | The link url |
| UI Fabric icon name | icon | fabricIcon | no | Optional UI Fabric icon name |
| Group name | group | dropdown | no | Optional name of the group to add this link to |
| Target | target | dropdown | no | Optional target for this link, current or new window |

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.4-green.svg)

* Works also at SharePoint 2019

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)
* [SharePoint 2019](https://docs.microsoft.com/en-us/sharepoint/dev/general-development/sharepoint-2019-development-platform)

## Prerequisites

none

## Solution

Solution|Author(s)
--------|---------
react-links | Fabio Franzini (@fabiofranzini)

## Version history

Version|Date|Comments
-------|----|--------
2.0|January 24, 2020|Initial release (extract web part from Starter Kit v1)

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* Move to solution folder
* in the command line run:
  * `npm install`
  * `gulp serve`

> Include any additional steps as needed.

## Features

Description of the web part with possible additional details than in short summary. 
This Web Part illustrates the following concepts on top of the SharePoint Framework:

* PnP property control usage

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-links" />

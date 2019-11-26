# Followed Sites webpart

This web part provides you the ability to display a list of site administrator defined number of sites that a given user is following, with paging as well as inline filtering of sites by keyword or phrase. Currently the list of followed sites includes classic as well as modern communication sites but does not include group enabled (modern) team sites.

![Bannner](../../assets/images/components/part-followed-sites.gif)


## Configurable Properties

The `Followed Sites` webpart can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Followed Sites | title | string | no | The webpart title, editable inline with the webpart itself |
| Number of followed sites to retrieve | nrOfItems | number | no | The number of sites to show per page, default = 10 |
| Specify the sort order of the retrieved sites | sortOrder | number | no | Preferred site sort order. Default sort order driven by SharePoint, or by site name |

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.9.1-green.svg)

* Works only at SharePoint Online due to dependency on Microsoft Graph APIs

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Prerequisites

none

## Solution

Solution|Author(s)
--------|---------
react-followed-sites | Beau Cameron (@Beau__Cameron)

## Version history

Version|Date|Comments
-------|----|--------
1.0|November 26, 2019|Initial release

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

* Microsoft Graph usage with the web parts

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-followed-sites" />

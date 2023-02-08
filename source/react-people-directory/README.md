# People Directory web part

This web part provides you the ability to add a searchable people directory. A people search box and alphabet list are provided to enable both searching by name as well as selecting a specific letter. This web part requires no configuration and utilizes the people search API to surface people results, i.e. `/_api/search/query`.

![People Directory](../../assets/images/components/part-people-directory.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **People Directory** web part.
3. Configure the webpart to update its properties.

## Configurable Properties

The `People Directory` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Web part title | title | string | no | The web part title, editable inline with the web part itself |

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.16.1-green.svg)

* Supported in SharePoint Online

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

none

## Solution

Solution|Author(s)
--------|---------
react-people-directory | Waldek Mastykarz
react-people-directory | David Warner II
react-people-directory | Don Kirkham
react-people-directory | Chandani Prajapati

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 27, 2018|Initial release
2.0|December 3, 2019|v2.0
2.1|February 7, 2022|Upgrade solution to SPFx v1.13.1
2.2|February 10, 2022|Adjust controls to be responsive
3.0|February 2023|Initial release for SharePoint Starter Kit v3 (Upgraded to SPFx 1.16.1)

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

* SharePoint Search API
* PnP React Controls
* Fluint UI Controls

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-people-directory" />

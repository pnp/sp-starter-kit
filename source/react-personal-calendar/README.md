# Personal Calendar web part

This web part provides you the ability to add a particular user's personal calendar on a web page. The web part may be configured to automatically refresh, as well as display up to seven days of events and a pre-defined number of events at a time. This web part is powered by the Microsoft Graph and currently requires that the Office 365 tenant be configured for targeted release for all users.

![Personal Calendar](../../assets/images/components/part-personal-calendar.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Personal Calendar** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Personal Calendar` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Upcoming Events | title | string | no | The web part title, editable inline with the web part itself |
| How often to check for new upcoming meetings (in minutes) | refreshInterval | number | no | Default: 5 - the interval in minutes between auto refresh |
| How many days in advance to retrieve meetings for? 0 - today only | daysInAdvance | number | no | Default: 0 (Today only) - the interval in minutes between auto refresh |
| How many meetings to show? 0 - show all retrieved meetings | numMeetings | number | no | Default: 0 (all) - the interval in minutes between auto refresh |

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.9.1-green.svg)

* Only supported in SharePoint Online due to dependency on the Microsoft Graph APIs

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)


## Prerequisites

none

## Solution

Solution|Author(s)
--------|---------
folder name | Author details

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 25, 2019|Initial release

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

* Using Microsoft Graph from the web parts
* Hosting SharePoint Framework components as Microsoft Teams tabs
* Using app pages in SharePoint Online

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-personal-calendar" />

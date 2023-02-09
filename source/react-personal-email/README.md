# Personal Email web part

This web part provides you the ability to add a particular user's personal email on a web page. The web part may be configured to display a pre-defined number of emails at a time and includes a link to the user's Outlook to view all email. This web part is powered by the Microsoft Graph and currently requires that the Office 365 tenant be configured for targeted release for all users.

Demostrates the use of **this.context.msGraphClientFactory**, getting the **v3** Graph client, to make Graph calls to **me/messages** and **me/mailFolders/Inbox/messages** Graph endpoints.

![Personal Email](../../assets/images/components/part-personal-email.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Personal Email** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Personal Email` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Personal e-mail | title | string | no | The web part title, editable inline with the web part itself |
| Number of messages to show | nrOfMessages | number | no | Default: 5 - The number of emails to show |

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.16.1-green.svg)

* Supported in SharePoint Online

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

Graph API Persmissions

```json
webApiPermissionRequests": [
  {
      "resource": "Microsoft Graph",
      "scope": "Mail.Read"
  }
]
```

## Solution

Solution|Author(s)
--------|---------
react-personal-email| Waldek Mastykarz
react-personal-email| Beau Cameron
react-personal-email| Chandani Prajapati

## Version history

Version|Date|Comments
-------|----|--------
1.0|May, 2018|Initial release
2.0|November 29, 2019|v2.0
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

* Using Microsoft Graph from the web parts
* Hosting SharePoint Framework components as Microsoft Teams tabs
* Using app pages in SharePoint Online

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-personal-email" />

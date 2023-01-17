# Banner web part

This web part provides you the ability to add a variable height image banner with a linkable title.

![Bannner](../../assets/images/components/part-banner.gif)

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.4-green.svg)

* Supported with SharePoint 2019

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)
* [SharePoint 2019](https://docs.microsoft.com/en-us/sharepoint/dev/general-development/sharepoint-2019-development-platform)

## Prerequisites

none

## Solution

Solution|Author(s)
--------|---------
./src/webparts/banner | Elio Struyf @eliostruyf
./source/react-banner | Eric Overfield @ericoverfield
./source/react-banner | Chandani Prajapati @Chandani_SPD

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 2018|Initial release
2.0|November 30, 2019| SP2019 and SPO compatible
3.0|January 17, 2013|Initial release for SharePoint Starter Kit v3 (Upgraded to SPFx 1.16.1)
## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Banner** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Banner` webpart can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Overlay image text | bannerText | string | no | The text message or title you want displayed on the banner image |
| Image URL | bannerImage | string | no | The url of the banner image |
| Link URL | bannerLink | string | no | The hyperlink url of the bannerText link |
| Banner height | bannerHeight | number | no | Provides the fixed height of the banner image |
| Enable parallax effect | useParallax | toggle | no | Enable if you want to include parallax effect on vertical scrolling |


## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

> Include any additional steps as needed.

## Features

Description of the web part with possible additional details than in short summary. 
This Web Part illustrates the following concepts on top of the SharePoint Framework:

* topic 1
* topic 2
* topic 3

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-banner" />

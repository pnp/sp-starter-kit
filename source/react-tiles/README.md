# Tiles web part

This web part provides you the ability to add a per instance listing of tiled links. Tiles are stored as a collection of tiles within the web part's properties, removing the need for link storage within SharePoint lists, tenant properties, or other external link storage requirements.

Icons are from Fluent UI Icons, those icons that should be available within at least Fluent UI version 7.3.

View [Fluent UI Icons](https://developer.microsoft.com/en-us/fluentui#/styles/web/icons) for icon names.

![Tiles](../../assets/images/components/part-tiles.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Tiles** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Tiles` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Useful Tools | title | string | no | The web part title, editable inline with the web part itself |
| Specify the height of the tiles | tileHeight | number | no | Default: 200, the height in pixels of each tile |
| Tile data | collectionData | collection | no | Collection of tiles |

### collectionData Collection Properties

Configurable properties for each tile row within the `collectionData` collection:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Title | title | string | yes | The text / title of the tile |
| Description | description | string | no | Optional tile description |
| URL | url | string | yes | The tile link url |
| Fluent UI icon name | icon | fabricIcon | no | Optional Fluent UI icon name |
| Target | target | dropdown | no | Optional target for this link, current or new window |

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
react-tiles V1 | Elio Struyf (@estruyf)
react-tiles V2 | Fabio Franzini (@fabiofranzini)
react-tiles V3 | Chandani Prajapati (@Chandani_SPD)

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 13th, 2018|Initial release
2.0|January 24, 2020|Initial release (extract web part from Starter Kit v1)
3.0|February 2023|Upgraded to SPFx 1.16.1

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

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-tiles" />

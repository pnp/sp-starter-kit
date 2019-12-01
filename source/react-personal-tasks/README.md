# Personal Tasks web part

This web part provides you the ability to add a particular user's personal tasks on a web page. The web part may be configured to show tasks from Planner or To Do. This web part is powered by the Microsoft Graph.

v2 web part is modified to use Graph Toolkit to expose the personal tasks, which simplifies the implementation.

![Personal Tasks](./assets/personal-tasks-demo.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Personal Tasks** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Personal Tasks` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| My Tasks | title | string | no | The web part title, editable inline with the web part itself |
| Data source | dataSource | 'planner' \| 'todo' | yes | Web part's data source: Planner or To Do. Default: planner |
| Allow editing | allowEditing | boolean | no | Flag if editing is allowed. Default is false. |
| Hide filter | hideHeader | boolean | no | Flag if the header on MS Graph Toolkit Personal Tasks component should be hidden. The header contains a filter and "Add" button. Default is true. |
| Initially displayed Plan or ToDo Folder id | initialId | string | no | A string id to set the initially displayed planner or folder to the provided ID. |
| Initially displayed bucket id | initialBucketId | string | no | A string id to set the initially displayed bucket (Planner Data-Source Only) to the provided ID. |
| Source Plan or ToDo Folder id | targetId | string | no | A string id to lock the tasks interface to the provided planner or folder ID. |
| Source bucket id | targetBucketId | string | no | A string ID to lock the tasks interface to the provided bucket ID (Planner Data-Source Only). |

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
react-personal-tasks | Waldek Mastykarz, Alex Terentiev

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
  * `gulp bundle`
  * `gulp package-solution`
  * Upload solution to the SharePoint App Catalog
  * Approve needed permissions in SharePoint Admin Center
  * `gulp serve`

## Features

Description of the web part with possible additional details than in short summary. 
This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Using Microsoft Graph Toolkit from the web parts
* Hosting SharePoint Framework components as Microsoft Teams tabs
* Using app pages in SharePoint Online

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-personal-tasks" />

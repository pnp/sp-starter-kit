# Library for shared features for SharePoint Online

## Summary

Used for shared capabilities targeted for SharePoint Online as library component is not supported with SharePoint 2019.

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.9.1-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Prerequisites

Only works in SharePoint Online due to version dependency.

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

1. Clone this repository
2. Within the [library-starter-kit-shared](../library-starter-kit-shared) source, i.e. [./source/library-starter-kit-shared](../library-starter-kit-shared)
3. in the command line run:
  ```powershell
  npm install
  gulp build
  gulp bundle
  npm link
  ```
4. This project may now we consumed by another SPFx project. For an example, refer to the included SPFx webpart, [./source/react-followed-sites](../react-followed-sites)
* Reference library component in other solutions to make things work - https://docs.microsoft.com/en-us/sharepoint/dev/spfx/library-component-tutorial 

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/library-starter-kit-shared" />

# Library for shared features for SharePoint Online

## Summary

A SharePoint Framework shared library that includes an approach to share langauge strings across multiple SharePoint Framework webparts. Currently used by the [Followed Sites webpart](../react-followed-sites/README.md)

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.16.1-green.svg)

* Supported in SharePoint Online

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

Only works in SharePoint Online due to version dependency.

## Solution

Solution|Author(s)
--------|---------
library-starter-kit-shared | Eric Overfield

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 25, 2019|Initial release for SharePoint Starter Kit v2
3.0|February 2023|Update to SPFx 1.16.1 - V3 of Starter Kit

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
* Reference library component in other solutions to make things work - https://learn.microsoft.com/en-us/sharepoint/dev/spfx/library-component-tutorial

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/library-starter-kit-shared" />

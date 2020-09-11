# Redirect Application Customizers

## Summary

Redirect from URL based on mapping from a list on the site. Can be used to automatically redirect from pages to other locations.

Original v1 implementation located at https://github.com/SharePoint/sp-starter-kit/blob/master/solution/src/extensions/redirect/RedirectApplicationCustomizer.ts

In v2 release repackaged as it's own solution to provide more flexibility from deployment perspective.

![Redirection Extension](../../assets/images/components/ext-redirect.gif)

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.4-green.svg)

* Supported with SharePoint 2019

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)
* [SharePoint 2019](https://docs.microsoft.com/en-us/sharepoint/dev/general-development/sharepoint-2019-development-platform)

## Prerequisites

Extension creates the needed list automatically if it's missing and user has sufficient permissions for the creation operation.

## Solution

Solution|Author(s)
--------|---------
solution/src/extensions/redirect | Paolo Pialorsi (@PaoloPia)
js-application-redirect | Sébastien Levert (@sebastienlevert)

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 22, 2018|Initial release
2.0|December 29, 2019|v2.0

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* Move to correct folder where solution exists
* in the command line run:
  * `npm install`
  * `gulp serve`

## Features

Key features demostrated by this solution:

* PnPjs usage in the solution
* Dynamic creation of the list if it's missing

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/js-application-redirect" />

# LOB Integration webpart

This web part allows you to learn how to consume 3rd party APIs, secured with Azure Active Directory, in the context of SharePoint Framework.

It leverages two different back-end REST APIs:

- An ApiController built in Microsoft ASP.NET MVC, which is defined in a .NET solution that you can find [here](../../sample-lob-service/SharePointPnP.LobScenario/SharePointPnP.LobScenario.sln)
- An Azure Function, which is based on the code defined [here](../../sample-lob-service/LIstNorthwindCustomers)

![LOB Integration](../../assets/images/components/part-lob-integration.png)

The purpose of this web part is to show how you can consume LOB (Line of Business) solutions and on-premises data within SharePoint Framework.

In order to leverage this web part, you will need to configure a couple of applications in Azure Active Directory of your target tenant:

- **SPFx-LOB-WebAPI**: for the .NET web application
  - Publish the ASP.NET MVC application on an Azure App Service
  - Register the AAD app providing the URL of the above Azure App Service
  - Choose a valid App ID Uri for the app
  - Configure that App ID Uri in the [LobIntegration.tsx](../../solution/src/webparts/lobIntegration/components/LobIntegration.tsx#L145) React component
  - Update the App manifest of the Azure AD app configuring the **oauth2Permissions** property with a value like the following one:

```json
  "oauth2Permissions": [
    {
      "adminConsentDescription": "Allow the application to read customers through SPFx-LOB-WebAPI on behalf of the signed-in user.",
      "adminConsentDisplayName": "Read customers from SPFx-LOB-WebAPI",
      "id": "7510eb34-4403-44d5-a745-a62d0895351c",
      "isEnabled": true,
      "type": "User",
      "userConsentDescription": "Allow the application to access SPFx-LOB-WebAPI on your behalf.",
      "userConsentDisplayName": "Access SPFx-LOB-WebAPI",
      "value": "Customers.Read"
    }
  ],
```
- **SPFx-LOB-Function**: for the Azure Function
  - Create an Azure Function and configure it with Azure AD Authentication, registering it in your target AAD tenant
  - Register the AAD app providing the URL of the above Azure Function
  - Choose a valid App ID Uri for the app
  - Configure that App ID Uri in the [LobIntegration.tsx](../../solution/src/webparts/lobIntegration/components/LobIntegration.tsx#L99) React component
  
Moreover, in order to make this web part working properly, you need to grant permissions to the SharePoint Service Application Principal to access them. You can do that using the PnP PowerShell command lets (or Office 365 CLI) with the following syntax:

```PowerShell
Connect-PnPOnline "https://[your-tenant].sharepoint.com/"

Grant-PnPTenantServicePrincipalPermission -Resource "SPFx-LOB-WebAPI" -Scope "Customers.Read"
Grant-PnPTenantServicePrincipalPermission -Resource "SPFx-LOB-Function" -Scope "user_impersonation"

```

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **LobIntegration** web part.
3. Configure the webpart to update its properties.

## Configurable Properties

The `LobIntegration` webpart can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Web API URI | webapiUri | string | yes | The URL of the web API. Should be something like https://[your-app-service].azurewebsites.net/api/customers |
| Function URI | functionUri | string | yes | The URL of the Azure Function. Should be something like https://[your-azure-function].azurewebsites.net/api/ListNorthwindCustomers |
| Service Type | serviceType | choice | yes | Defines the service to use. It can be "ASP.NET REST API" or "Azure Function" |

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.9.1-green.svg)

* Does only work at SharePoint Online due to dependency on API permission management

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Prerequisites

WebAPI or Azure Function configuration as secured assets in the same Azure AD instance as where web part is hosted.

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

* Calling securely custom Web APIs in SharePoint Online from SharePoint Framework solutions

<img src="https://telemetry.sharepointpnp.com/sp-starter-kit/source/react-lob-integration" />

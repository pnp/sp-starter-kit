# Alert Application Customizer

This application customizer provides you the ability to show notifications on the pages in the top / header area.

![Alert](../../assets/images/components/ext-alert.gif)




## Alert list details

This extension is dependent on a explicit `Alerts` list to be located in a hub site to which current site collection is associated. If site collection is the actual hub site, alerts list has to exist in the root of that site collection.

| Display Name | Name | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Alert type | PnPAlertType | choice | yes | The text message or title you want displayed on the banner image |
| Alert message | PnPAlertMessage | string | yes | The url of the banner image |
| Start date-time | PnPAlertStartDateTime | date time | yes | The hyperlink url of the bannerText link |
| End date-time | PnPAlertEndDateTime | date time | yes | Provides the fixed height of the banner image |
| More information link | PnPAlertMoreInformation | URL | no | Enable if you want to include parallax effect on vertical scrolling |

> Notice that in default SharePoint Starter Kit installation this list is automatically provisioned on the hub site.

# Installing the extension

See getting started from [SP-Starter-Kit repository readme](https://github.com/SharePoint/sp-starter-kit).

You can also download just the [SharePoint Framework solution package (spppkg) file](https://github.com/SharePoint/sp-starter-kit/blob/master/package/sharepoint-starter-kit.sppkg) and install that to your tenant. This extension does not have external dependencies.

> As this is a SharePoint Framewokr extension, you will need to explicitly enable that in the site using CSOM or REST APIs. 

# Screenshots

![Alert](../../assets/images/components/ext-alert.png)

# Source Code

https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/extensions/alertNotitication

# Minimal Path to Awesome

- Clone this repository
- Move to Solution folder
- in the command line run:
  - `npm install`
  - `gulp serve`

Since this is an extension, debugging requires slightly more advance settings. Please see more from the official SharePoint development documentation around the [debugging options with SharePoint Framework extensions](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/debug-modern-pages).

# Version history

Version|Date|Comments
-------|----|--------
1.0|May 2018|Initial release


![](https://telemetry.sharepointpnp.com/sp-starter-kit/documentation/components/ext-alert)

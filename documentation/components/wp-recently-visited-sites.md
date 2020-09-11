# Recently Visited Sites web part

This web part provides you the ability to display a list of a particular user's recently visited sites on a web page. The web part will display up to the first 30 (thirty) recently visited sites at a time. This web part is powered by the Microsoft Graph and currently requires that the Office 365 tenant be configured for targeted release for all users.

![Recently Visited Sites](../../assets/images/components/part-recently-visited-sites.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Recently Visited Sites** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Recently Visited Sites` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Recent Sites | title | string | no | The web part title, editable inline with the web part itself |

# Installing the web part

See getting started from [SP-Starter-Kit repository readme](https://github.com/SharePoint/sp-starter-kit). 

You can also download just the [SharePoint Framework solution package (sppkg) file](https://github.com/pnp/sp-starter-kit/blob/master/source/react-recently-visited-sites/sharepoint/solution/react-recently-visited-sites.sppkg) and install that to your tenant. This web part requires access to the Microsoft Graph.

# Screenshots

![Recently Visited Sites](../../assets/images/components/part-recently-visited-sites.png)

# Source Code

https://github.com/pnp/sp-starter-kit/tree/master/source/react-recently-visited-sites

# Minimal Path to Awesome

- Clone this repository
- Move to Solution folder
- in the command line run:
  - `npm install`
  - `gulp serve`

# Version history

Version|Date|Comments
-------|----|--------
1.0|May 2018|Initial release


![](https://telemetry.sharepointpnp.com/sp-starter-kit/documentation/components/wp-recently-visited-sites)
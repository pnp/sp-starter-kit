# Collaboration Footer Application Customizer

This application customizer provides you the ability to include a footer designed for group associated teams sites. The footer includes sets of links. One set of links provides company wide links which are configured using a managed metadata / taxonomy term set. A second set of links are personalized links, unqiue to each user, stored within each user's user profile within a user profile property.

By default, this application customizer is associated with group associated team sites created using the custom site design i.e. `{Company name} Team Site`, provided in this project. The custom site design is provisioned as a part of the [deployment process](../../provisioning) while applying the PnP Provisioning template, [hubsite.xml](../../provisioning/hubsite.xml).

![Collaboration Footer](../../assets/images/components/ext-collab-footer.gif)




## Extension details

This extension is dependent on an explicit `source` term set for common links and an explicit `personalItems` user profile property for personal link storage. By default the source term set is created during the Starter Kit deployment process. The User Profile property must be [manually created](../../documentation/tenant-settings.md#create-a-custom-property-in-the-user-profile-service).

| Description | Name | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Source Term Set Name | sourceTermSet | string | yes | Default: PnP-CollabFooter-SharedLinks - The name of the term set within the managed metadata service to obtain common links |
| User Profile Property Name | personalItemsStorageProperty | string | yes | Default: PnP-CollabFooter-MyLinks - The name of the custom user profile property used to store custom footer links |



# Installing the extension

See getting started from the [SP-Starter-Kit repository readme](https://github.com/SharePoint/sp-starter-kit).

You can also download the [SharePoint Framework solution package (sppkg) file](https://github.com/pnp/sp-starter-kit/blob/master/source/react-application-collab-footer/sharepoint/solution/react-application-collab-footer.sppkg) and install the SPFx solution to your tenant. This extension depends on the managed metadata service and the user profile to store common and user specific links.

> As this is a SharePoint Framework extension, you will need to explicitly enable this extension for a specific site using CSOM or REST APIs. You may also auto enable this extension with defined custom properties as a part of a site script using the `associateExtension` verb. See [collabteamsite.json Site Script](../../provisioning/collabteamsite.json) for an example.

# Screenshots

![Collaboration Footer](../../assets/images/components/ext-collab-footer.png)

# Source Code

https://github.com/pnp/sp-starter-kit/tree/master/source/react-application-collab-footer

# Minimal Path to Awesome

- Clone this repository
- Move to Solution folder
- in the command line run:
  - `npm install`
  - `gulp serve`

Since this is an extension, debugging requires slightly more advance configuration. Please learn more from the official SharePoint development documentation on [debugging options with SharePoint Framework extensions](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/debug-modern-pages).

# Version history

Version|Date|Comments
-------|----|--------
1.0|May 2018|Initial release


![](https://telemetry.sharepointpnp.com/sp-starter-kit/documentation/components/ext-collab-footer)
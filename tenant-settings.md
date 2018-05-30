
# Preparing your tenant for the PnP SharePoint Starter Kit

In this document you can find detailed information about preparing your tenant to run the PnP SharePoint Starter Kit. In the main [ReadMe](./README.md) file of this repository you can find general information about the project.

In fact, here is the list of requirements, which need some manual steps, to be accomplished in order to properly run the solution:
* You need to [create a custom property in the User Profile Service](#UPSCustomProperty).
* If you want to use the StockInformation Web Part, you need to [request a custom API key to Alpha Vantage](#APIKeyAlphaVantage), which is the provider for live stocks data.

In the following sections you can find details instructions about the above tasks.

<a name="UPSCustomProperty"></a>
## Create a Custom Property in the User Profile Service

In order to register a custom property in the User Profile Service, you need to browse with your web browser to the SharePoint Admin Center of SharePoint Online, which is available at the URL https://<tenant-name>-admin.sharepoint.com/.
There, you need to select the *User Profiles* menu item on the left and select *Manage User Properties* under the *People* category of links, as you can see in the following figure.

![The User Profiles Admin UI](./assets/images/UPS-Custom-Property-01.png)

In the *Manage User Properties* page, select to     create a *New Property* as it is illustrated in the following figure.

![The add New Property button](./assets/images/UPS-Custom-Property-02.png)

Configure the new property with the following settings:
* Name: PnP-CollabFooter-MyLinks
* Display name: PnP-CollabFooter-MyLinks
* Type: string (Single Value)
* Lenght: 3600 (which is the maximum allowed)
* Policy Setting: Optional
* Allow users to edit values for this property: Checked

Leave all the other properties with their default values.

> Note: We cannot automate this step because there is still not this capability in the Client Side Object Model, and in the REST API of SharePoint Online neither.

<a name="APIKeyAlphaVantage"></a>
## Request a custom API key to Alpha Vantage

The StockInformation Web Part uses the live stocks service provided byt Alpha Advantage. However, to use it you need a software key, that you can ask for free to the API reseller. You will simply need to go to the page to [Claim your API Key](https://www.alphavantage.co/support/#api-key), fill in the form, and you are done.

The obtained key can be provided to the [deploy.ps1](./provisioning/deploy.ps1) PowerShell script through the StockAPIKey paramenter.
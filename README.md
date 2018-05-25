
# PnP SharePoint Starter Kit

This is a solution designed for SharePoint Online which provides numerous web parts, extensions, and other components which you can use as an example and inspiration for your own customizations. 

> Please be aware that **documentation work is still in progress** and there will be updated material for this solution starting in early June. In the meantime, please submit issues and questions using the [issues list](../../issues) to help us provide better documentation and guidance. Thanks for your patience!

![PnP Starter Pack Front Page](./assets/images/default-front-page.png)

## Objectives of this solution

SharePoint Communication Sites have great out-of-the-box capabilities, but the out-of-the-box capabilities may not always be sufficient for your scenarios. This is exactly why you are able to include your own customizations. This solution addresses common scenarios and tasks you may encounter when introducing those customizations, and provides examples and guidance on how you might address them including:

- Automated provisioning of simple demo content within a communication site
- Automated provisioning of the whole solution to any tenant within minutes
- Automated configuration of Site Scripts and Site Designs at the tenant level using the PnP Remote Provisioning engine
- Implementation of different customizations for SharePoint Online
- Usage of Office UI Fabric and reusable PnP SPFx controls within the customizations

> Additional high resolution screenshots are also available: [front page](./assets/images/hihg-res-default-home-page.png) and [front page with extended footer](./assets/images/hihg-res-default-home-page-extended-footer.png).


## Getting started

The following steps will help you get started in any tenant as fast as possible:

> You will need to be a tenant administrator to be able to deploy this solution to your tenant.

- Ensure that you meet the [requirements for SharePoint Framework development](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment) and are using the latest version of [PnP PowerShell](https://docs.microsoft.com/en-us/powershell/sharepoint/sharepoint-pnp/sharepoint-pnp-cmdlets?view=sharepoint-ps)
- Upload and deploy the [`sharepoint-portal-showcase.sppkg`](./package/sharepoint-portal-showcase.sppkg) from the [`/package`](./package) folder to your app catalog
- Use PnP PowerShell to connect to any site in your tenant with the [`Connect-PnPOnline` cmdlet](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/connect-pnponline?view=sharepoint-ps)
- Move to the `provisioning` folder and execute the following command (using your own tenant url and the prefix of your choosing): `.\deploy.ps1 -TenantUrl https://contosodemosk.sharepoint.com -SitePrefix demo`
    - This will provision 3 site collections with urls of `/sites/demoportal`, `/sites/demohr`, and `/sites/demomarketing`. Your urls may vary depending on the SitePrefix you use.

> Notice that this script also adds tenant level settings like themes, site designs, and other adjustments. Therefore, it is recommended to test the script in an isolated test tenant and not immediately execute it within your production environment.


## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

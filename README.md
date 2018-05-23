
# PnP SharePoint Starter Kit

This is a solution designed for the SharePoint Online which will provide numerous web parts, extensions and other components which you can use as an example and innovation for your own customizations. 

> Notice that **documentation work is still in progress** and there will be updated material for this solution starting from early June. We do apology for the delay around detailed setup guidance.

Objectives of this solution
- SharePoint Communication Sites have great out-of-the-box capabilities, but you can absolutely introduce customizations if out-of-the-box capabilities are not sufficient for your scenarios
- Automatic provisioning on simple demo content in communication site
- Automated provisioning of the whole solution to any tenant within minutes
- Automated configuration of Site Scripts and Site Designs to the tenant level using PnP Remove Provisioning engine
- Demonstrate implementation of different customizations for SharePoint Online
- Demonstrate usage of Office UI Fabric and reusable PnP SPFx controls in the customizations

![image](./assets/images/default-front-page.png)

> There is always two high res pictures available: [front page](./assets/images/hihg-res-default-home-page.png) and [front page with extended footer](./assets/images/hihg-res-default-home-page-extended-footer.png).


# Getting started

Here's the steps to get started in any tenant as fast as possible.

> You will need to be a tenant administrator to be able to deploy this solution properly to your tenant.

- Ensure that you have requirements for SharePoint Framework development and latest version of the PnP PowerShell
- Upload `sharepoint-portal-showcase.sppkg` from the `/package` folder to your app catalog
- Use PnP PowerShell to connect to any site in your tenant with ` Connect-PnPOnline` cmdlet
- Move to `provisioning` folder and execute `.\deploy.ps1 -TenantUrl https://contosodemosk.sharepoint.com -SitePrefix demo`
    - This will provision 3 site collection with urls of `/sites/demoportal`, `/sites/demohr` and `/sites/demomarketing`

> Notice that script also adds tenant level settings like themes, site designs and other adjustments. Due this it's recommended to test the script in isolated test tenant and not immediately execute it towards production environment.


# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

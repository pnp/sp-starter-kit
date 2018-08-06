# Term Store Considerations

For a successful deployment of the SP Starter Kit, certain term store considerations exist.

<a name="TermStoreAdmin"></a>
## Term Store Administration

Per the project pre-requirements, the account you use when [provisioning](../provisioning) the SP Starter Kit must be manually set as a term store administrator.

<a name="NonEnglishTenants"></a>
## Non-English tenants

The SP Starter Kit end to end provisioning only works with tenants that are configured with the dafault language set to English, i.e. those with culture code 1033 enabled. It is possible that certain tenants have English available, while the default language is not set to 1033. This can cause issues when the provisioning process adds terms to to the term store.

If you do not have English set as the default language for your tenant, in particular for your term store, the following modification should enable automated provisioning of the included terms found in the SP Starter Kit to your term store.

Before deploying the SP Starter Kit, complete the following tasks. If you have already attempted to deploy the starter kit and wish to remove the language code requirement to the terms, delete the Term Group `PnPTermSets` before continuing.

1. Open [./provisioning/terms.xml](../provisioning/terms.xml) if your code editor, i.e. Visual Studio Code.
2. Around line 5, look for the following:

`<pnp:ProvisioningTemplate ... >`

3. Within the <pnp:ProvisioningTemplate> tag, you should find: `TemplateCultureInfo="1033"`. Remove `TemplateCultureInfo="1033"`.
4. Save terms.xml.
5. Run `./provisioning/deploy.ps1` with your standard paramaters. This should add the PnPTermSets term group to your default language.
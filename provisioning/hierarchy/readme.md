
This one uses non-released PnP PowerShell cmdlets and PnP CSOM assembly. Upcoming capapabilities in the Oct/Nov timeframe for provisioning support.

> If you have previous versions of the Starter Kit solution in your app catalog, make sure that you first delete them as there has been significant changes on the structure of the sppkg solution package.

- Pull down the repository
- Connect to any site in a target tenant using PnP PowerShell
- Execute - `Apply-PnPProvisioningHierarchy .\starterkit.pnp -Parameters @{"SiteUrlPrefix"="Con_"}`


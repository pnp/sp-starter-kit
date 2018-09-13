# Tenant API Management

The SPFx solution included with SP Starter Kit requires access to third party API's. Third party access is controlled via the `Service Principal Permissions Management Page` included as a part of the SharePoint Admin Center Preview.

## Approving pending API requests

When adding the included SPFx [`sharepoint-starter-kit.sppkg`](../package/sharepoint-starter-kit.sppkg) from the [`/package`](../package) folder manually to the tenant app catalog, manually approve the requested permissions.

Navigate to your tenant SharePoint Admin Center

![SharePoint Admin Center](../assets/images/API-Approval-01.png)

Click on Preview to switch to the SharePoint Admin Center Preview

![SharePoint Admin Center Preview](../assets/images/API-Approval-02.png)

Navigate to **API Management**, your Service Principal Permissions Management Page

![API Management](../assets/images/API-Approval-03.png)

**Approve** the `Microsoft Graph` permission requests by selecting each permission request and clicking `Approve`

![API Approval Panel](../assets/images/API-Approval-04.png)

The pending permissions should now be approved.

![APIs Approved](../assets/images/API-Approval-05.png)

**Note** currently the sample LOB service sample is in development and will utilize the SPFx-LOB-*** API permission requests. These requests can be ignored at this time. 

**Note** if you receive an error when approving a Microsoft Graph permission request, try to approve it again. In batch approvals, some requests may fail the first time.

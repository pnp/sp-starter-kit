Open PowerShell, run the following command:

```powershell
.\deploy.ps1 -SiteUrl https://erwinmcm.sharepoint.com/sites/portal2
```

You will be asked for credentials, those need to be tenant admin. 

If the site does not exist, it will create it.
If the sppkg file is not present, the solution will be build and packaged

Any present instances of the solution on the server in the appcatalog and site will be removed before deployment.

The weather webpart defaults to 'Helsinki'. You can override this as follows:

```powershell
.\deploy.ps1 -SiteUrl https://erwinmcm.sharepoint.com/sites/portal2 -WeatherCity "Amsterdam"
```
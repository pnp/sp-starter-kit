
# Helper functions

Function Update-AppIfPresent {
    [CmdletBinding()]

    Param(
        [Parameter(Mandatory = $true)]
        [String] $AppName,

        [Parameter(Mandatory = $true)]
        [SharePointPnP.PowerShell.Commands.Base.SPOnlineConnection] $Connection
    )

    Process {
        $app = Get-PnPApp -Identity $AppName -Connection $Connection -ErrorAction SilentlyContinue
        if($app -ne $null)
        {
            if($app.InstalledVersion)
            {
                Write-Host "Updating solution in site" -ForegroundColor Yellow
                # Uninstall from Site
                Update-PnPApp -Identity $app.Id
                # Wait for the app to be uninstall
                # $installedVersion = Get-PnPApp -Identity $AppName -Connection $Connection | Select-Object -ExpandProperty InstalledVersion
                # while($installedVersion.Major -ne $null)
                # {
                #     Write-Host "." -ForegroundColor Yellow -NoNewLine
                #     Start-Sleep -Seconds 5
                #     $installedVersion = Get-PnPApp -Identity $AppName -Connection $Connection | Select-Object -ExpandProperty InstalledVersion
                # }
                # Write-Host " Done." -ForegroundColor Green
            }
            # Write-Host "Removing solution from appcatalog... " -ForegroundColor Yellow -NoNewline
            # Remove-PnPApp -Identity $app.Id -Connection $Connection
            # Write-Host " Done." -ForegroundColor Green
        }
    }
}
Function Test-Url {
    [CmdletBinding()]
 
    Param (
        [Parameter(Mandatory = $true)]
        [String] $Url
    )
 
    Process {
        if ([system.uri]::IsWellFormedUriString($Url, [System.UriKind]::Absolute)) {
            $true
        }
        else {
            $false
        }
    }
}

Function Set-ThemeIfNotSet {
    [CmdletBinding()]

    Param (
        [Parameter(Mandatory = $true)]
        [string]$ThemeName,

        [Parameter(Mandatory = $true)]
        [string]$ThemePath,

        [Parameter(Mandatory = $true)]
        [SharePointPnP.PowerShell.Commands.Base.SPOnlineConnection]$Connection
    )

    Process {
        $currentTheme = Get-PnPPropertyBag -Key "ThemePrimary" -Connection $Connection

        # deserialize theme in variable
        $theme = Import-CliXml -Path $ThemePath
        if($theme.themePrimary -ne $currentTheme)
        {
            # The theme 'seems' to not be set. This check is flawed and based only on the primary theme color for now
            $existingTheme = Get-PnPTenantTheme -Name $ThemeName -ErrorAction SilentlyContinue
            if($existingTheme -eq $null)
            {
                Add-PnPTenantTheme -Identity $ThemeName -Overwrite -Palette $theme -IsInverted $false -Connection $Connection
            }
            Set-PnPWebTheme -Theme $ThemeName -Connection $Connection
        }
    }
}
Function Test-SiteExists {
    [CmdletBinding()]

    param (
        [Parameter(Mandatory = $true)]
        [String] $Url,
        [Parameter(Mandatory = $true)]
        [PSCredential] $Credentials
    )

    Process {
        try {
            Connect-PnPOnline -Url $Url -Credentials $Credentials -ErrorAction SilentlyContinue
            $site = Get-PnPSite -ErrorAction SilentlyContinue
            if($site -ne $null)
            {
                $true
            } else {
                $false
            }
        } catch {
            $false
        }
    }
}

Function New-SiteHierarchy {
    [CmdletBinding()]

    param (
        [Parameter(Mandatory = $true)]
        [String] $TenantUrl,
        [Parameter(Mandatory = $false)]
        [String] $Prefix = "DEMO_",
        [Parameter(Mandatory = $true)]
        [String] $ConfigurationFilePath,
        [Parameter(Mandatory = $true)]
        [PSCredential] $Credentials
    )

    Process {
        Write-Host "Creating Site Hierarchy from $ConfigurationFilePath" -ForegroundColor Cyan

        $hierarchy = ConvertFrom-Json -InputObject (Get-Content $ConfigurationFilePath -Raw)

        $hubParams = @{
            Type = "CommunicationSite";
            Url = "$TenantUrl/sites/$Prefix$($hierarchy.url)";
            Title = $hierarchy.title;
            Description = $hierarchy.description;
        }
        
        $site = $null
        try {
            $connection = Connect-PnPOnline -Url $hubParams.Url -Credentials $Credentials -ErrorAction SilentlyContinue -ReturnConnection
            $site = Get-PnPSite -ErrorAction SilentlyContinue -Connection $connection
        } catch {}
        if($site -eq $null)
        {
            # Site does not exist
            Write-Host "Creating $($hubParams.Url)" -ForegroundColor Cyan
            $connection = Connect-PnPOnline -Url $TenantUrl -Credentials $Credentials -ReturnConnection
            $hubParams.Connection = $connection
            New-PnPSite @hubParams
        }
        # Check if root site is hubsite
        $hubsites = Get-PnPHubSite -Identity $hubParams.Url -Connection $connection
        if($hubsites[0].Id -eq $null)
        {
            # not a hub site, register it as one
            Register-PnPHubSite -Site $hubParams.Url -Connection $connection
        }

        # Create the other sites
        foreach($child in $hierarchy.children)
        {
            $childParams = @{
                Type = "TeamSite";
                Alias = "$Prefix$($child.url)";
                Title = $child.title;
                Description = $child.description;
                Connection = $connection;
            }
            Write-Host "Creating $($child.url)" -ForegroundColor Cyan
            $siteUrl = New-PnPSite @childParams
            Add-PnPHubSiteAssociation -Site $siteUrl -HubSite $hubParams.Url -Connection $connection
        }

        $rootUrl
    }
}

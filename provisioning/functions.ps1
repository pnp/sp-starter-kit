
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
        [SharePointPnP.PowerShell.Commands.Base.SPOnlineConnection]$Connection
    )

    Process {

        $palette = @{
            "themePrimary" = "#017e9d";
            "themeLighterAlt" = "#f1f9fb";
            "themeLighter" = "#cae8ef";
            "themeLight" = "#9fd5e2";
            "themeTertiary" = "#50adc5";
            "themeSecondary" = "#168caa";
            "themeDarkAlt" = "#01728e";
            "themeDark" = "#016078";
            "themeDarker" = "#014759";
            "neutralLighterAlt" = "#f8f8f8";
            "neutralLighter" = "#f4f4f4";
            "neutralLight" = "#eaeaea";
            "neutralQuaternaryAlt" = "#dadada";
            "neutralQuaternary" = "#d0d0d0";
            "neutralTertiaryAlt" = "#c8c8c8";
            "neutralTertiary" = "#c2c2c2";
            "neutralSecondary" = "#858585";
            "neutralPrimaryAlt" = "#4b4b4b";
            "neutralPrimary" = "#333333";
            "neutralDark" = "#272727";
            "black" = "#1d1d1d";
            "white" = "#ffffff";
            "primaryBackground" = "#eaeaea";
            "primaryText" = "#333333";
            "bodyBackground" = "#ffffff";
            "bodyText" = "#333333";
            "disabledBackground" = "#e1e1e1";
            "disabledText" = "#b8b8b8";
            "error" = "#e93333";
            "accent" = "#864B7A";
            }
        
        $currentTheme = Get-PnPPropertyBag -Key "ThemePrimary" -Connection $Connection

        # deserialize theme in variable
        if($palette.themePrimary -ne $currentTheme)
        {
            # The theme 'seems' to not be set. This check is flawed and based only on the primary theme color for now
            Add-PnPTenantTheme -Identity "Contoso Electronic HR" -Overwrite -Palette $palette -IsInverted $false -Connection $Connection
            Set-PnPWebTheme -Theme "Contoso Electronic HR" -Connection $Connection
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
        [PSCredential] $Credentials,
        [Parameter(Mandatory = $true)]
        [String] $GroupsManagedPath
    )

    Process {
        Write-Host "Reading Site Hierarchy from $ConfigurationFilePath" -ForegroundColor Cyan

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
        } else {
            $connection = Connect-PnPOnline -Url $TenantUrl -Credentials $Credentials -ReturnConnection
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
            $childSite = $null
            try {
                $connection = Connect-PnPOnline -Url "$TenantUrl/$GroupsManagedPath/$Prefix$($child.url)" -Credentials $Credentials -ErrorAction SilentlyContinue -ReturnConnection
                $childSite = Get-PnPSite -ErrorAction SilentlyContinue -Connection $connection
            } catch {}
            if($childSite -eq $null)
            {
                Write-Host "Creating $Prefix$($child.url)" -ForegroundColor Cyan
                $siteUrl = New-PnPSite @childParams
            } else {
                $siteUrl = "$TenantUrl/$GroupsManagedPath/$Prefix$($child.url)";
            }
            Add-PnPHubSiteAssociation -Site $siteUrl -HubSite $hubParams.Url -Connection $connection
        }

        $hubParams.Url
    }
}

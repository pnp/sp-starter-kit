
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
                Write-Host "Updating solution in site... " -ForegroundColor Yellow
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

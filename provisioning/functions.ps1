
# Helper functions

Function Remove-AppIfPresent {
    [CmdletBinding()]

    Param(
        [Parameter(Mandatory = $true)]
        [String] $AppName,

        [Parameter(Mandatory = $true)]
        [SharePointPnP.PowerShell.Commands.Base.SPOnlineConnection] $Connection
    )

    Process {
        $app = Get-PnPApp -Identity $AppName -Connection $Connection
        if($app -ne $null)
        {
            if($app.InstalledVersion)
            {
                Write-Host "Uninstalling solution from site... " -ForegroundColor Yellow -NoNewLine
                # Uninstall from Site
                Uninstall-PnPApp -Identity $app.Id
                # Wait for the app to be uninstall
                $installedVersion = Get-PnPApp -Identity $AppName -Connection $Connection | Select-Object -ExpandProperty InstalledVersion
                while($installedVersion.Major -ne $null)
                {
                    Write-Host "." -ForegroundColor Yellow -NoNewLine
                    Start-Sleep -Seconds 5
                    $installedVersion = Get-PnPApp -Identity $AppName -Connection $Connection | Select-Object -ExpandProperty InstalledVersion
                }
                Write-Host " Done." -ForegroundColor Green
            }
            Write-Host "Removing solution from appcatalog... " -ForegroundColor Yellow -NoNewline
            Remove-PnPApp -Identity $app.Id -Connection $Connection
            Write-Host " Done." -ForegroundColor Green
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

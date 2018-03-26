
# Helper functions
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
            Connect-PnPOnline -Url $Url -Credentials $Credentials
            $true
        } catch {
            $false
        }
    }
}

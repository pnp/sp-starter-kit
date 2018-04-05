Param(
    [Parameter(Mandatory = $true)]
    [String]$ResourceGroupPrefix,

    [Parameter(Mandatory = $false)]
    [PSCredential]$Credentials,

    [Parameter(Mandatory = $false)]
    [String]$SubscriptionId,

    [Parameter(Mandatory = $false)]
    [String]$RepoUrl = "https://github.com/erwinvanhunen/azure-function-app",

    [Parameter(Mandatory = $false)]
    [String]$Location
)

$modules = Get-Module -Name AzureRM -ListAvailable
if ($modules -eq $null) {
    # Not installed.
    Install-Module -Name AzureRM -Scope CurrentUser -AllowClobber -Force
    Import-Module -Name AzureRM
}

Login-AzureRmAccount

if($SubscriptionId)
{
    $selectedSub = Get-AzureRMSubscription -SubscriptionId $SubscriptionId
} else {
    $subscriptions = Get-AzureRmSubscription -WarningAction SilentlyContinue

    $subChoices = @()

    for ($i=0; $i -lt $subscriptions.Count; $i++) {
        $subChoices += [System.Management.Automation.Host.ChoiceDescription]("$($subscriptions[$i].Name) &$($i+1)")
    }

    $userChoice = $host.UI.PromptForChoice('Select Subscription', 'Choose a subscription', $subChoices, 0) + 1

    $selectedSub = $subscriptions[$userChoice]
}

if($Location)
{
    $selectedLocation = Get-AzureRmLocation | Where-Object{$_.Location -eq $Location}
} else {
    $locations = Get-AzureRMLocation -WarningAction SilentlyContinue

    $locationChoices = @()

    for($i=0; $i -lt $locations.Count; $i++) {
        $locationChoices += [System.Management.Automation.Host.ChoiceDescription]("$($locations[$i].DisplayName) &$($i+1)")
    }

    $locationChoice = $host.UI.PromptForChoice("Select Location","",$locationChoices,0) + 1

    $selectedLocation = $locations[$locationChoice]

}
Select-AzureRMSubscription -Subscription $selectedSub

Write-Host "Creating Resource Group $ResourceGroupName" -ForegroundColor Cyan
$resourceGroup = New-AzureRmResourceGroup -Name "$($ResourceGroupPrefix)Group" -Location $selectedLocation.Location

$storageAccount = Get-AzureRmStorageAccount -ResourceGroupName "$($ResourceGroupPrefix)Group" -Name "$($ResourceGroupPrefix.ToLower())storage" -ErrorAction SilentlyContinue
if(!$storageAccount)
{
    Write-Host "Creating Storage Account $ResourceGroupName" -ForegroundColor Cyan
    $storageAccount = New-AzureRmStorageAccount -ResourceGroupName "$($ResourceGroupPrefix)Group" -Name "$($ResourceGroupPrefix.ToLower())storage" -SkuName Standard_LRS -Location $resourceGroup.Location
}

Write-Host "Creating Storage Queue" -ForegroundColor Cyan
$ctx = $storageAccount.Context
New-AzureStorageQueue -Name "$($ResourceGroupPrefix)queue" -Context $ctx

Write-Host "Creating Provisioning Function App" -ForegroundColor Cyan
New-AzureRmResourceGroupDeployment -Name "PnPSPPortalCaseFunctionAppDeployment" -ResourceGroupName "$($ResourceGroupPrefix)Group" -TemplateFile .\Azure\functionapp.json -siteName "$($ResourceGroupPrefix)site" -repoUrl $RepoUrl -branch "master" -storageAccountName "$($ResourceGroupPrefix.ToLower())storage" -storageAccountid $storageAccount.Id  
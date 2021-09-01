[CmdletBinding()]
param (
    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$myAKSCluster,

    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$myResourceGroup,

    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$acrName
)

az aks update -n $myAKSCluster -g $myResourceGroup --attach-acr $acrName
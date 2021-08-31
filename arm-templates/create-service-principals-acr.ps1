#PS: before run it, you must give API permissions to azure ADO user on azure cloud

[CmdletBinding()]
param (
    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$containerRegistryName
)

$ACR_NAME= $containerRegistryName
$SERVICE_PRINCIPAL_NAME='sentia-acr-sp1'
$ROLE = 'acrpull'

#get ACR ID
$ACR_REGISTRY_ID=az acr show --name $ACR_NAME --query id --output tsv

#create service principal with the pull role assigned
$SP_PASSWD= az ad sp create-for-rbac --name http://$SERVICE_PRINCIPAL_NAME --scopes $ACR_REGISTRY_ID --role $ROLE --query password --output tsv
$SP_APP_ID=az ad sp show --id http://$SERVICE_PRINCIPAL_NAME --query appId --output tsv

echo "Server" $ACR_NAME
echo "usernname: $SP_APP_ID"
echo "password: $SP_PASSWD"

Write-Output "##vso[task.setvariable variable=SP_APP_ID;isOutput=true]$SP_APP_ID"
Write-Output "##vso[task.setvariable variable=SP_PASSWD;isOutput=true]$SP_PASSWD"
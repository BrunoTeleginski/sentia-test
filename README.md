# Sentia
## Project Proposal

Check bellow the design for the solution:

![alt text](https://github.com/BrunoTeleginski/sentia-test/blob/master/images/solution.png?raw=true)

# Tools used
- Github
- Azure ADO for pipelines CI/CD
- Azure Cloud (ARM templates)
- Kubernetes

# GitHub
On the GitHub, we have three branch types for the branch strategy propose:
- **master** - Production Code
- **developer** - Code for test with its own database
- **staging** - Code to pre-production using the same master database


# Azure ADO
## Motivations

> It was used ADO on this Project Proposal because with that we can easily create pipelines for CI/CD on code, as well as all the azure cloud deployment obtaining a good integration. In addition to that, the customer can manage all tasks for the application using the Azure ADO dashboard.

## Pipelines for the Code
![alt text](https://github.com/BrunoTeleginski/sentia-test/blob/master/images/code_pipelines.png?raw=true)

It has three pipelines for each of three different environments.

![alt text](https://github.com/BrunoTeleginski/sentia-test/blob/master/images/code_pipeline_tasks.png?raw=true)

It has five tasks for the code, it builds and pushes code into the image repository, also updating the Kubernetes Pod to use the latest image.

## Pipelines for the infrastructure
![alt text](https://github.com/BrunoTeleginski/sentia-test/blob/master/images/structure_pipeline.png?raw=true)

As we can see we have all the resorces creation for the Azure cloud using the ARM template, as well as some powershell scripts to get ARM templates output, and it also has all the kubernetes YAML file applyng on the AKS.

Resources created:
- Virtual Network (for CNI propose)
- Azure Container Registry
- Azure Kubernetes Service
- Storage Account


# Kubernetes solution

## Motivations
> Since the assessement doesn't show what is the current customer usage in terms of machine resources, what kind of system is running or if it's for internal or external customer clients, it was assumed that we need something that handles both usage; high or low. Keeping these informations in mind, it was created the solution based on Kubernetes, since it can also handle an application with potencial growth. 

## How kubernetes solves customer's needs
 - Using ingress controller to forward the trafic to node application with subdomain "node-api"
 - MongoDB is in a statefulset POD with Persistente volume using storage account file share
 - Node application has a volume mounted to storage the document, using storage account file share. That way it's no longer neccessary to use FTP to send the document since we have SAS token of storage account to send it throught application
 - Crons are executed by CronJob from kubernetes service
 - The three environements mentioned by customer were separated on kubernetes as namespaces, but in the same cluster to reduce the cost. The branches manage were also created as three environements

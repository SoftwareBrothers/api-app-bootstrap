# Setting up Kubernetes on gcloud

## Prerequisite

1. install `gcloud` - google cloud cli https://cloud.google.com/sdk/gcloud/
2. install `kubectl` - kubernetes cli https://kubernetes.io/docs/tasks/tools/install-kubectl/
3. create project on google cloud https://console.cloud.google.com/projectcreate
4. login to gcloud and pick this project

```
gcloud auth login
gcloud config set project <projectId>

# https://cloud.google.com/compute/docs/zones#available
gcloud config set compute/zone <computeZone>
gcloud config set compute/region <computeRegion>
```

## Create a kubernetes cluster in gcloud

Documentation of creating cluster via `gcloud cli` can be found here: https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster

But you can also create cluster in the gcloud web console and then authenticate `kubectl` to use this cluster by running:

`gcloud container clusters get-credentials <cluster-name>`

Cluster should have the ending `-STAGE` where stage is one of: master, staging, development - thus it will be easier to configure deployment (see `infrastructure/k8s/deploy.rb` file)

## Setup env variables on your claster

In the kubernetes configuration we use secret object. Template for it can be found in `infrastructure/k8s/.env-example.yml`. Use this as a template and create your own `.env.yml`. Bare in mind that kubernetes accepts only strings in base64 so make sure to convert your values using this method: `echo -n 'secret-value' | base64`

Then:

```
kubectl apply -f ./infrastructure/k8s/.env.yml
```

## Setup CI

This project have a codeship configuration set up which consist of:

* codeship-services.yml
* codeship-steps.yml

For branches: development, staging and master it applies kubernatest config files
placed in `infrastructure/k8s/BRANCH`

In order to authenticate to gcloud from codeship you have to create Service Account in gcloud: https://console.cloud.google.com/iam-admin/serviceaccounts

add role:
- Kubernetes Engine Admin
- Storage Admin

Then download json KEY and encrypt it as it was described in this tutorial: https://documentation.codeship.com/pro/continuous-deployment/google-cloud/

Finally you have to recreate `google-credentials.encrypted` file (read the tutorial above)

Project have one deploy script which is under: `infrastructure/k8s/deploy.sh` - adjust it to your needs.

## TODO for YOU

Project has a setop for development environment. You have to implement staging and production(master) versions.

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

## Setup CI

In order to authenticate to gcloud from codeship you have to create Service Account in gcloud: https://console.cloud.google.com/iam-admin/serviceaccounts

add role:
- Kubernetes Engine Admin
- Storage Admin

Then download json KEY and encrypt it as it was described in this tutorial: https://documentation.codeship.com/pro/continuous-deployment/google-cloud/

Finally you have to recreate `google-credentials.encrypted` file.


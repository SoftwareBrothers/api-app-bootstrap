#!/bin/bash

set -e
PROJECT_ID=hapi-api-243910
KUBERNETES_APP_NAME=hapi-api

IMAGE=gcr.io/$PROJECT_ID/hapi-api:$CI_REPO_NAME.$CI_COMMIT_ID

codeship_google authenticate

gcloud config set compute/zone us-central1-a 
gcloud container clusters get-credentials $KUBERNETES_APP_NAME

echo $PROJECT_ID
echo $IMAGE
echo $KUBERNETES_APP_NAME



ls
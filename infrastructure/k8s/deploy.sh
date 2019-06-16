#!/bin/bash

set -e
PROJECT_ID=hapi-api-243910
IMAGE=gcr.io/$PROJECT_ID/hapi-api:$CI_REPO_NAME.$CI_COMMIT_ID
KUBERNETES_APP_NAME=hapi-api

codeship_google authenticate

gcloud container clusters get-credentials $KUBERNETES_APP_NAME

echo $PROJECT_ID
echo $IMAGE
echo $KUBERNETES_APP_NAME
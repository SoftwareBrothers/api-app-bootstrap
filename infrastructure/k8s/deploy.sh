#!/bin/bash

echo "Setting up env variables"
set -e
PROJECT_ID=$GOOGLE_PROJECT_ID # set by the CI
STAGE=$CI_BRANCH
KUBERNETES_APP_NAME=hapi-api-$STAGE

IMAGE=gcr.io/$PROJECT_ID/hapi-api:$CI_REPO_NAME.$CI_COMMIT_ID

echo "Setting up gcloud client"
codeship_google authenticate

gcloud config set compute/zone us-central1-a 
gcloud container clusters get-credentials $KUBERNETES_APP_NAME

sed -i "s,\$IMAGE_NAME,$IMAGE," ./deploy/infrastructure/k8s/$STAGE/api-deployment.yml

echo "Deploying to Kubernetes..."
kubectl apply -f ./deploy/infrastructure/k8s/$STAGE

echo "Image $IMAGE was deployed"

printenv
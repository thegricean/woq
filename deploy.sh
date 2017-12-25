#!/bin/bash

## Instructions:
# 1. Copy everything in `experiment` folder into `public` folder
# 2. Copy the `_shared` folder, which was originally at root level, into `public`  folder
# 3. Change the name of `norming.html` to `index.html`
# 4. Change all the references to `../../_shared` to `_shared`
# 5. The page should be rebuilt at each push, or at each manual launch of the CI task on Gitlab

set -e

EXPERIMENT_NAME=$1
DEPLOYMENT_PATH=$2

mkdir $DEPLOYMENT_PATH/$EXPERIMENT_NAME
cp -r experiments/$EXPERIMENT_NAME/experiment $DEPLOYMENT_PATH/$EXPERIMENT_NAME/public
cp -r experiments/_shared $DEPLOYMENT_PATH/$EXPERIMENT_NAME/public/_shared
cp gitlab-ci-template.yml $DEPLOYMENT_PATH/$EXPERIMENT_NAME/.gitlab-ci.yml
cd $DEPLOYMENT_PATH/$EXPERIMENT_NAME/public
mv norming.html index.html
sed -e "s/\.\.\/\.\.\/_shared/_shared/g" index.html

echo "All done. You will still need to go to that folder to commit and push to Gitlab for now."

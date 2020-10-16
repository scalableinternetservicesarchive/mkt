#!/bin/bash

##########################################################################
# deploy-local.sh
#
# Usage:
#   ./script/deploy-local.sh [version]
#
##########################################################################

set -e

aws ecr get-login-password | docker login --username AWS --password-stdin 101624687637.dkr.ecr.us-west-2.amazonaws.com

echo "Building local docker image"
docker build --tag 101624687637.dkr.ecr.us-west-2.amazonaws.com/mkt:local .
docker tag 101624687637.dkr.ecr.us-west-2.amazonaws.com/mkt:local 101624687637.dkr.ecr.us-west-2.amazonaws.com/mkt:latest

echo "Pushing local/latest docker image"
docker push 101624687637.dkr.ecr.us-west-2.amazonaws.com/mkt:local
docker push 101624687637.dkr.ecr.us-west-2.amazonaws.com/mkt:latest

echo "Updating app-web"
./script/deploy-ecs.sh mkt-app-web "local"

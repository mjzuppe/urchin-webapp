#!/bin/bash
echo "Start PROD deployment"
set -e
. ~/.nvm/nvm.sh
cd ~/urchin.so
git reset --hard
git pull origin main
rm -rf node_modules
rm -rf .next
yarn install
yarn build
pm2 restart urchin.so
echo "End PROD deployment"

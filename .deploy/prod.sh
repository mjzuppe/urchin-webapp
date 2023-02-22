#!/bin/bash
echo "Start PROD deployment"
. ~/.nvm/nvm.sh
cd ~/playa.co
git reset --hard
git pull origin main
rm -rf node_modules
rm -rf .next
yarn install
yarn build
pm2 restart playa.co
echo "End PROD deployment"

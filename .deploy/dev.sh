#!/bin/bash
echo "Start DEV deployment"
set -e
. ~/.nvm/nvm.sh
cd ~/dev.playa.co
git reset --hard
git pull origin dev
rm -rf node_modules
rm -rf .next
yarn install
yarn build
pm2 restart dev.playa.co
echo "End DEV deployment"

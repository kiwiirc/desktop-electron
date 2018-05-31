#!/bin/bash
set -e
set -x
git submodule init
git submodule update
cd ./kiwiirc/
yarn install && yarn build
mv ./dist ../client
cd ..
cp client-defaults/config.json client/static/config.json
cp client-defaults/package.json client/package.json
cp client-defaults/main.js client/main.js
cp -r client-defaults/plugins client/plugins
cd client/
npm install
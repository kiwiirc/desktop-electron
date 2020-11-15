#!/bin/bash
set -e
set -x
git submodule init
git submodule update
cd ./kiwiirc/
yarn install && yarn build
rm -rf ../client
mv ./dist ../client
cd ..
cp client-defaults/config.json client/static/config.json
cp client-defaults/package.json client/package.json
cp client-defaults/main.js client/main.js
cp client-defaults/kiwiirclogo.png client/kiwiirclogo.png
cp -r icons/ client/icons
cp -r client-defaults/plugins client/plugins
cd client/
npm install
cd ../
npm install electron electron-installer-debian electron-packager
./node_modules/.bin/electron-packager client KiwiIRC-Desktop --platform linux --arch x64 --out dist/ --overwrite
./node_modules/.bin/electron-installer-debian --src dist/KiwiIRC-Desktop-linux-x64/ --dest dist/installers/ --arch amd64 --options.icon icons/kiwiirclogo_256x256.png

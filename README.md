# Before building
Before you can build you will need to [install yarn](https://yarnpkg.com/lang/en/docs/install/) and [nodejs](https://nodejs.org/en/download/package-manager/)

    git clone https://github.com/kiwiirc/kiwiirc-desktop.git
    cd kiwiirc-desktop/

# Building
You should just need to run `./build.sh` but if that fails run the following commands:

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

# Running for development
To run the client you will need to install electron (`sudo npm -g install electron`) then enter the `client/` directory and type `electron .`

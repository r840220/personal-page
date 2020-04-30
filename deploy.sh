#!/usr/bin/env sh

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

git init
git add .
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:r840220/r840220.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
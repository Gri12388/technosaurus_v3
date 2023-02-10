#!/bin/bash

set -e

yarn build

cd dist

git init

git add -A

git commit -m 'deploy'

git push git@github.com:Gri12388/technosaurus_v3.git master:gh-pages

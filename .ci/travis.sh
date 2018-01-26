#!/usr/bin/env bash
set -ex

bundle exec jekyll build

bundle exec htmlproofer --checks-to-ignore LinkCheck --assume-extension --disable-external --check-html ./_site

virtualenv venv
source ./venv/bin/activate
pip install html5validator
html5validator --root ./_site \
  --ignore 'Illegal character in fragment' google \
  --blacklist pub

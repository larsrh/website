#!/usr/bin/env bash
set -ex

bundle exec jekyll build

bundle exec htmlproofer --checks-to-ignore LinkCheck --assume-extension --disable-external --check-html ./_site

python3 -m venv venv
source ./venv/bin/activate
pip3 install -r .ci/requirements.txt
html5validator --root ./_site \
  --ignore 'Illegal character in fragment'

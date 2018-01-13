#!/usr/bin/env bash
set -ex

bundle install
bundle exec jekyll build

bundle exec htmlproofer --checks-to-ignore LinkCheck --assume-extension --disable-external --check-html ./_site

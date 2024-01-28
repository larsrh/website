#!/usr/bin/env bash

set -e

vnu="$(node --no-warnings -e "console.log(require('vnu-jar'))")"

exec java -jar "$vnu" "$@"

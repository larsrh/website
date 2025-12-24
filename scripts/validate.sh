#!/usr/bin/env bash

set -e

vnu="$(node --no-warnings -e "console.log(require.resolve('vnu-jar/build/dist/vnu.jar'))")"

exec java -jar "$vnu" "$@"

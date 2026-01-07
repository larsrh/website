#!/usr/bin/env bash

set -e

exec xmlstarlet ed \
  -N gpx="http://www.topografix.com/GPX/1/1" \
  -d '//gpx:extensions' \
  "$@"
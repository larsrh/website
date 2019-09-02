#!/bin/bash

set -e

make_thumbs()
{
  local file="$1"
  echo "*** $file ***"
  local short="$(basename "$file" ".jpg")"
  local dir="$(dirname "$file")"
  local small="$dir/$short.small.jpg"
  convert "$file" -resize "1600>" "$small"
  local thumb="$dir/$short.thumb.jpg"
  convert "$file" -resize "300^>" -gravity center -extent 300x300 "$thumb"
}

for file in "$@"; do make_thumbs "$file"; done

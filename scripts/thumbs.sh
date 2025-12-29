#!/bin/bash

set -e

make_thumbs()
{
  local file="$1"
  echo "*** $file ***"
  local base
  base="$(basename "$file")" # SC2155
  local short="${base%.*}"
  local dir
  dir="$(dirname "$file")"
  local small="$dir/$short.small.jpg"
  if [ -f "$small" ]; then
    echo "$small exists, skipping"
  else
    magick "$file" -resize "1600>" "$small"
  fi
  local thumb="$dir/$short.thumb.jpg"
  if [ -f "$thumb" ]; then
    echo "$thumb exists, skipping"
  else
    magick "$file" -resize "300^>" -gravity center -extent 300x300 "$thumb"
  fi
}

for file in "$@"; do make_thumbs "$file"; done

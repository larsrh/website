#!/bin/bash

set -e

file="$1"
short="$(basename "$file" ".pdf")"
dir="$(dirname "$file")"

make_images()
{
  local ext="$1"
  echo "*** converting to $ext ***"
  convert -density 300 "$file" +adjoin -resize 1280x720 "$dir/$short.$ext"
}

make_images webp
make_images jpg
make_images avif

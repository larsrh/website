#!/bin/bash

set -e

file="$1"
short="$(basename "$file" ".pdf")"
dir="$(dirname "$file")"

echo "*** converting to png first ***"

temp="$(mktemp -d)"

cleanup()
{
  echo "*** cleaning up ***"
  rm -rf "$temp"
}

trap cleanup EXIT

pdftoppm -png -scale-to 1280 "$file" "$temp/convert"

make_images()
{
  local ext="$1"
  echo "*** converting to $ext ***"
  declare -i count=0
  for file in "$temp/convert-"*; do
    magick -density 300 "$file" "$dir/$short-$count.$ext"
    count=$(( count + 1 ))
  done
}

make_images webp
make_images jpg
make_images avif

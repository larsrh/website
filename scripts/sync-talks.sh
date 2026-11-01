#!/bin/sh
set -eu
cd img_assets
exec aws s3 sync --profile lars-talks ./talks s3://lars-talks/

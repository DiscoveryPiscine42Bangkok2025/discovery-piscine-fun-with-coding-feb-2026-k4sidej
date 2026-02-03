#!/bin/bash

if [ "$#" -eq 0 ]; then
  echo "No arguments supplied"
  exit 1
fi

for folder in "$@"; do
  new_folder="ex$folder"
  mkdir -p "$new_folder"
done
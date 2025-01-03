#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: Need a Commit Message"
    exit 1
fi

git add .
git commit -m "$1"
git push origin master
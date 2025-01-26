#!/bin/bash

# Create necessary directories
mkdir -p public/img/kudas
mkdir -p public/newImgs

# Copy images from source to public directory
cp -r "/Users/Bishoy/Downloads/Anba Paula church/img/"* public/img/
cp -r "/Users/Bishoy/Downloads/Anba Paula church/newImgs/"* public/newImgs/

echo "Images copied successfully!"

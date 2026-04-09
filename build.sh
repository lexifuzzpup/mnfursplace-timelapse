#!/bin/bash

echo "Fetching frames"
node index

echo "Creating video"
ffmpeg -framerate 60 -i output/%04d.png -c:v libx264 -pix_fmt yuv420p -r 60 output/final.mp4
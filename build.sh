#!/bin/bash

echo "Fetching frames"
node index

echo "Creating gif"
convert -delay 5 -loop 0 output/*.png output/unoptimized.gif

echo "Optimizing gif"
gifsicle  -O3 --colors 256 -o output/final.gif output/unoptimized.gif
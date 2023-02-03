#!/usr/bin/env bash

prefix=$1

mv ${prefix}_px.jpg ${prefix}_px_temp.jpg
mv ${prefix}_nx.jpg ${prefix}_px.jpg
mv ${prefix}_px_temp.jpg ${prefix}_nx.jpg

mv ${prefix}_pz.jpg ${prefix}_pz_temp.jpg
mv ${prefix}_nz.jpg ${prefix}_pz.jpg
mv ${prefix}_pz_temp.jpg ${prefix}_nz.jpg

convert ${prefix}_py.jpg -rotate 180 ${prefix}_py.jpg 
convert ${prefix}_ny.jpg -rotate 180 ${prefix}_ny.jpg 

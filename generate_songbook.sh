#!/bin/bash
# wkhtmltopdf --page-size "A4" --outline-depth 2 --username "XXX" --password "XXX" --print-media-type --window-status "rendered" --orientation "portrait" --debug-javascript "http://127.0.0.1:3001/#/songbook" -
wkhtmltopdf --page-size "A4" --outline-depth 2 --debug-javascript --window-status rendered --username "XXX" --password "XXX" --print-media-type toc --xsl-style-sheet /root/uke/backend/assets/toc.xml "http://XXX:XXX@127.0.0.1:3001/#/songbook" /root/uke2/songbook.pdf

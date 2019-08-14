# ukebook
A webapp that provides ukulele chords for ukulele lovers.  

The goal is to provide chords and tabs, that can be printed 
out individually or as a combined pdf.

## installation

download and install a latest version of [wkhtmltopdf](http://wkhtmltopdf.org/downloads.html) - don't use apt-get, because it will install version 0.9.9, which is too old and doesn't support javascriptDelay.

from any folder run:

    sudo apt-get install pdftk
    npm install -g gulp
    
in frontend folder run:

    npm install
    gulp

add a username and password to basicAuth.js

## Develop

npm install
npm run build
npm start

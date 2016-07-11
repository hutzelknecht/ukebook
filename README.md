# ukebook
A webapp that provides ukulele chords for ukulele lovers.  

The goal is to provide chords and tabs, that can be printed 
out individually or as a combined pdf.

## installation

download and install a latest version of [wkhtmltopdf](http://wkhtmltopdf.org/downloads.html) - don't use apt-get, because it will install version 0.9.9, which is too old and doesn't support javascriptDelay.

from any folder run:

	sudo apt-get install pdftk
    npm install -g strongloop
    npm install -g gulp
    
in frontend folder run:

    npm install
    gulp

and in backend folder run    
    
    npm install
    node .   
    
in backend/server folder create a file **datasources.json** such as


    {
      "db": {
        "name": "db",
        "connector": "memory"
      },
      "production": {
        "name": "production",
        "connector": "postgresql",
        "host": "localhost",
        "port": "5432",
        "database": "ukebook",
        "username": "postgres",
        "password": "postgres",
        "debug": false
      }
    }
    


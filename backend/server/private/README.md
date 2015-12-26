This folder contains the files as generated in the following tutorial
https://docs.strongloop.com/display/public/LB/Preparing+for+deployment

    $ openssl genrsa -out privatekey.pem 1024
    $ openssl req -new -key privatekey.pem -out certrequest.csr
    $ openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem

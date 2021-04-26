#!/bin/sh

docker-compose exec php sh -c '
    export HTTP_PROXY='$2'
    export HTTPS_PROXY='$3'
    set -e
    apk add openssl
    mkdir -p config/jwt
    jwt_passphrase='$1'
    ls -al config/jwt 
    echo "$jwt_passphrase" | openssl genpkey -out config/jwt/private.pem -pass stdin -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
    echo "$jwt_passphrase" | openssl pkey -in config/jwt/private.pem -passin stdin -out config/jwt/public.pem -pubout
    setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt
    setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt
'

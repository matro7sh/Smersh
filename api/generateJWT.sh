#!/bin/sh
docker-compose exec -T php sh -c '
    set -e
    apk add openssl
    mkdir -p config/jwt
    jwt_passphrase="$(echo $JWT_PASSPHRASE)"
    [ -z "$jwt_passphrase" ] && echo "Loading JWT_PASSPHRASE from .env file" && jwt_passphrase=${JWT_PASSPHRASE:-$(grep ''^JWT_PASSPHRASE='' .env | cut -f 2 -d ''='')}
    echo "$jwt_passphrase" | openssl genpkey -out config/jwt/private.pem -pass stdin -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
    echo "$jwt_passphrase" | openssl pkey -in config/jwt/private.pem -passin stdin -out config/jwt/public.pem -pubout
    (setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt && setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt) || chmod -R 755 config/jwt
'

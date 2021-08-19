# Installation

First of all, you need to download the Projet `git clone git@github.com:CMEPW/Smersh.git` then move to `api` folder and copy .env-dist to .env.

## With docker

We are using the environment variable called DOMAIN declared in the .env at the root folder of the project.
You can override this variable as your own. Be sure to register the domain in your `/etc/hosts` that point to your local host.

As we use træfik as reverse-proxy, you can refer to their documentation to learn how to customize this instance.

Run `make initialize` then go to [http://smersh.lan](http://smersh.lan) and use `jenaye:jenaye` to log in.


## Manually

### How to run API ? 
 

``` 
docker-compose up  # when build is done do the next command
docker-compose exec php bin/console do:da:cr  # create database
docker-compose exec php bin/console do:sc:up --force # generation of tables
docker-compose exec php bin/console make:entity --overwrite # 
docker-compose exec php bin/console doctrine:fixtures:load # load fake data

```

### How to Generate JWT ?

```
docker-compose exec php sh -c '                
    set -e
    apk add openssl
    mkdir -p config/jwt
    jwt_passphrase=${JWT_PASSPHRASE:-$(grep ''^JWT_PASSPHRASE='' .env | cut -f 2 -d ''='')}
    echo "$jwt_passphrase" | openssl genpkey -out config/jwt/private.pem -pass stdin -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
    echo "$jwt_passphrase" | openssl pkey -in config/jwt/private.pem -passin stdin -out config/jwt/public.pem -pubout
    setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt
    setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt
'
```

### How to run client ? 



## How to access SMERSH from VPS ? 

You have to create a file named `config` into the `.ssh/` folder of you current user (your host).

```
Host smersh
  Hostname <your-ip>
  Port <ssh-port>
  User <your-user>
  LocalForward 127.0.0.1:8000 127.0.0.1:8000
  LocalForward 127.0.0.1:4200 127.0.0.1:4200
  LocalForward 127.0.0.1:3000 127.0.0.1:3000
  LocalForward 127.0.0.1:8888 127.0.0.1:8888
```

Then you can run `ssh smersh` and go to [http://localhost:4200](http://localhost:4200).


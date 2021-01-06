# SMERSH
<img width="100" alt="logo" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/logo.png">

Smersh is a pentest oriented collaborative tool used to track the progress of your company's missions and generate rapport.

# Preview front (Angular):
<img width="1280" alt="showmission" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/showMission.png">
<img width="1280" alt="homepage" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/homepage.png">


# preview API (Symfony + Api Platform) :
<img width="1280" alt="swagger" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/api.png">


# Ports mapping
| Container | Internal port | External port |
| ------ | ----------- | ---- |
| Vulcain | 443 | 8443 |
| Api | 80 | 8000 |
| Db | 5432 | 5432 |
| Mercure | 443, 80, 2019 | 1337 |
| dev-tls | 80 | 80 |
| php | 9000 | / |
| CodiMD | 3000 | 3000 |
| db-codiMD | 5432 | / |

# Preview Report

<img width="1280" alt="homepage" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/rapport-preview.png">
<img width="1280" alt="homepage" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/rapport-preview2.png">

# How to install server


>If you are using windows, please switch to linux </troll>

in `api` folder copy `.env-dist` to `.env` 

Run `docker-compose up -d` then use theses command

```
make install  
make init-db
make load-data # to have exemple data
```

Finaly go to  `http://localhost:8000/api` and use "jenaye:jenaye" to log in.


## You can also do it manualy like this :  

```
docker-compose exec php bin/console do:da:cr  # create database
docker-compose exec php bin/console do:sc:up --force # generation of tables
docker-compose exec php bin/console make:entity --overwrite # 
docker-compose exec php bin/console doctrine:fixtures:load # load fake data
```

>For dummy data, think to edit files locate in `api/src/DataFixtures` and edit object.


## Generate keys ( jwt ) 

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


# How to install front

> requirements : node & npm 

```
cd client && npm i && npm start
```

## Todo
- add conclusion generator
- Progress bar on mission ?
- Externe : host/vuln - interne : account pwned, privilieges ? perimeter
- Better display of credentials info mission view
- Maybe use chips to create new vulns into host ?
- Add color by impact into mission-single-view
- Add possibility to select impact when u're editing vuln
- Fix select vuln by host (add-vulns-to-host-external)

## Contributors 
- Darkweak - https://github.com/orgs/CMEPW/people/Darkweak
- michmich1000 - https://github.com/orgs/CMEPW/people/michmich1000
- SilouFr  - https://github.com/orgs/CMEPW/people/SilouFr

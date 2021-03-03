# SMERSH
<p align="center">
<img width="100" alt="logo" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/logo.png">
</p>

Smersh is a pentest oriented collaborative tool used to track the progress of your company's missions and generate rapport.

# Preview front (Angular):

![demo](img/demo.gif)


## View of single mission
![showMission](img/showMission.png)

![hacktivity](img/hacktivity.png)


# preview API (Symfony + Api Platform) :
![api](img/api.png)

# Ports mapping
| Container | Internal port | External port |
| ------ | ----------- | ---- |
| Vulcain | 443 | 8443 |
| Api | 80 | 8000 |
| Bitwarden | 80 | 8888 |
| Db | 5432 | 5432 |
| Mercure | 443, 80, 2019 | 1337 |
| dev-tls | 80 | 80 |
| php | 9000 | / |
| CodiMD | 3000 | 3000 |
| db-codiMD | 5432 | / |

# Preview Report

![reporthomepage](img/rapport-preview.png)
![template](img/rapport-preview2.png)

# How to install using docker

>requirements 
* Docker && docker-compose


>If you are using windows, please switch to linux </troll>

in `api` folder copy `.env-dist` to `.env` 

Run `make upAll` then go to `http://localhost:4200` and use "jenaye:jenaye" to log in.



# How to install server manualy
## You can also do it manualy like this :  

```
docker-compose up  # when build is done do the next command
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


# How to install front manually

> requirements : node & npm 

```
cd client && npm i && npm start
```


# Variable into report

```
        startDate: # timestamp
        CLIENT_NAME: # String
        creds: # String
        classification: # String
        phone: # String
        version: # String
        by: # String
        to: # String
        authors: # Array
        state: # String
        scope # Array
``` 
### How to use it ? 

just edit function `doc.setData()` into `mission-single` component and define your element, after this update your template to use it like this 
`{VariableName}` and `{#MyArray}{MyUsername}{/MyArray}` if u need to loop on array

>The template are stored in `client/src/assets/Smersh.docx` you can also replace it by your template and use Smersh variable

# How to contribute ? 

Just *fork* repository then create branch, work and push your content + create PR

``` 
git checkout -b MyBranch
git add -p 
git commit -m "xx"
git push origin MyBranch
```

## How to use app localy while she's running on VPS

create file called `config` into `.ssh/` of your current user

then past the following content:

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
then you can run `ssh smersh` and go to `http://localhost:4200`


## How to Make Backup of database

`docker-compose exec db pg_dump -U <User> <db> > smersh.sql`

## Tips for front-dev 

Run API using this command `docker-compose up api` then execute `cd client && npm i && npm start` 


## Todo
- add conclusion generator
- Progress bar on mission ?
- Externe : host/vuln - interne : account pwned, privilieges ? perimeter
- Maybe use chips to create new vulns into host ?
- Add color by impact into mission-single-view
- Add possibility to select impact when u're editing vuln
- add real fixture instead of dummy data
- parser gnmap
- different view for internal test and external
- add register page

## Contributors 
- Darkweak - https://github.com/orgs/CMEPW/people/Darkweak
- michmich1000 - https://michmich.eu
- SilouFr  - https://github.com/orgs/CMEPW/people/SilouFr
- sanchis  - https://github.com/sanchis

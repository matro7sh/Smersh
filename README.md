# SMERSH
<p align="center">
<img width="100" alt="logo" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/logo.png">
</p>

Smersh is a pentest oriented collaborative tool used to track the progress of your company's missions and generate rapport.

# Preview front (Angular):
<img width="1280" alt="showmission" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/showMission.png" style="text-align:center">
<img width="1280" alt="homepage" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/homepage.png" style="text-align:center">


# preview API (Symfony + Api Platform) :
<img width="1280" alt="swagger" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/api.png" style="text-align:center">


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

<img width="1280" alt="homepage" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/rapport-preview.png" style="text-align:center">
<img width="1280" alt="homepage" src="https://raw.githubusercontent.com/CMEPW/Smersh/master/rapport-preview2.png" style="text-align:center">

# How to install server

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
## How to use it ? 

just edit function `doc.setData()` into `mission-single` component and define your element, after this update your template to use it like this 
`{VariableName}` and `{#MyArray}{MyUsername}{/MyArray}` if u need to loop on array

>The template are stored in `client/src/assets/Smersh.docx` you can also replace it by your template and use Smersh variable

# How to contribute ? 

Just fork repository then create branch, work and push your content + create PR

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

``` 
then you can run `ssh smersh` and go to `http://localhost:4200`


## Todo
- add conclusion generator
- Progress bar on mission ?
- Externe : host/vuln - interne : account pwned, privilieges ? perimeter
- Better display of credentials info mission view
- Maybe use chips to create new vulns into host ?
- Add color by impact into mission-single-view
- Add possibility to select impact when u're editing vuln
- add real fixture instead of dummy data
- parser gnmap
- different view for internal test and external
- add possibility to delete impact
- Merge GenerateList component and fixe route, ex : `/missions/show/1` instead of `/missions/details/1`

## Contributors 
- Darkweak - https://github.com/orgs/CMEPW/people/Darkweak
- michmich1000 - https://michmich.eu
- SilouFr  - https://github.com/orgs/CMEPW/people/SilouFr

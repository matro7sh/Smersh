.PHONY: cache composer-install composer-update create-network help install jwt up update upAll

CONFIG_DIR=api/config
include .env

help:
	@grep -E '(^[0-9a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-25s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

cache: ## Clear cache
	docker-compose exec php bin/console cache:clear

composer-install: ## Install composer packages
	cp .env api/.env
	docker-compose exec -e http_proxy=$(HTTP_PROXY_URL) -e https_proxy=$(HTTPS_PROXY_URL) php composer install 

composer-update: ## Update composer
	docker-compose exec -e http_proxy=$(HTTP_PROXY_URL) -e https_proxy=$(HTTPS_PROXY_URL) php composer update 

copy-files-prod: ## Copy prod files to dev
	cp .env.prod .env
	cp docker-compose.prod.yml docker-compose.yml

create-network: ## Create docker network if not exists
	docker network create smersh || true

init-db:
	docker-compose exec php bin/console do:da:dr --force
	docker-compose exec php bin/console do:da:cr
	docker-compose exec php bin/console do:sc:up --force

install: create-network up jwt composer-install cache ## Install and setup project

initialize: install reset-db ## Initialize and setup the project

jwt: ## Generate jwt
	sh api/generateJWT.sh $(JWT_PASSPHRASE) $(HTTP_PROXY_URL) $(HTTPS_PROXY_URL)

load-data:
	docker-compose exec php bin/console do:fi:load --quiet

reset-db: init-db load-data

up: ## Start containers
	docker-compose up -d

up-rebuild: ## Rebuild and launch containers
	docker-compose up --build --force-recreate --remove-orphans -d

update-db-schema: ## Update database schema
	docker-compose exec php bin/console do:sc:up --force

update: ## Update containers composer packages then re-up containers
	docker-compose pull
	$(MAKE) composer-update
	$(MAKE) up

upAll: up install init-db load-data

upAll-rebuild: up-rebuild install init-db load-data

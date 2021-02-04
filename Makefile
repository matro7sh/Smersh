.PHONY: cache composer-install composer-update create-network help install jwt up update upAll

CONFIG_DIR=api/config
DC=docker-compose
DC_UP=$(DC) up -d
DC_EXEC=$(DC) exec php
BIN_CONSOLE=$(DC_EXEC) bin/console

help:
	@grep -E '(^[0-9a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-25s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

cache: ## Clear cache
	$(BIN_CONSOLE) cache:clear

composer-install: ## Install composer packages
	$(DC_EXEC) composer install

composer-update: ## Update composer
	$(DC_EXEC) composer update

copy-files-prod: ## Copy prod files to dev
	cp .env.prod .env
	cp docker-compose.prod.yml docker-compose.yml

create-network: ## Create docker network if not exists
	docker network create smersh || true

init-db:
	$(BIN_CONSOLE) do:da:dr --force
	$(BIN_CONSOLE) do:da:cr
	$(BIN_CONSOLE) do:sc:up --force

install: create-network up jwt composer-install cache ## Install and setup project

jwt: ## Generate jwt
	cd api && sh ./generateJWT.sh

load-data:
	$(BIN_CONSOLE) do:fi:load --quiet

reset-db: init-db load-data

up: ## Start containers
	$(DC_UP)

update-db-schema: ## Update database schema
	$(BIN_CONSOLE) do:sc:up --force

update: ## Update containers composer packages then re-up containers
	$(DC) pull
	$(MAKE) composer-update
	$(MAKE) up


upAll: up install init-db load-data

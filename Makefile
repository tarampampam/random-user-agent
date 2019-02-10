#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

docker_bin := $(shell command -v docker 2> /dev/null)

SHELL = /bin/sh
NODE_IMAGE = tarampampam/node:latest
RUN_ARGS = --rm -v "$(shell pwd):/src:cached" --workdir "/src" -u "$(shell id -u):$(shell id -g)"

.PHONY : help install build update shell clean
.SILENT : help install build update shell
.DEFAULT_GOAL : help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@printf "\033[33m%s:\033[0m\n" 'Available commands'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[32m%-13s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install all dependencies
	$(docker_bin) run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn install

update: install ## Update all dependencies
	$(docker_bin) run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn upgrade --no-progress --non-interactive

build: clean install ## Build application bundle
	$(docker_bin) run $(RUN_ARGS) -e "NODE_ENV=production" -t "$(NODE_IMAGE)" npm run build

shell: ## Start shell into container with node
	$(docker_bin) run $(RUN_ARGS) -ti "$(NODE_IMAGE)" bash

clean: ## Make some clean
	-rm -f "$(shell pwd)/builds/*.zip"

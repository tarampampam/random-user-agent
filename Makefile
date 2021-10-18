#!/usr/bin/make
# Makefile readme: <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

SHELL = /bin/sh
NODE_IMAGE = node:16-alpine
RUN_ARGS = --rm -v "$(shell pwd):/src:rw" --workdir "/src" -u "$(shell id -u):$(shell id -g)" -t $(NODE_IMAGE)

.PHONY : help install shell build watch test clean
.DEFAULT_GOAL : help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@printf "\033[33m%s:\033[0m\n" 'Available commands'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[32m%-13s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install all dependencies
	docker run $(RUN_ARGS) yarn install

shell: ## Start shell into container with node
	docker run -e "PS1=\[\033[1;34m\]\w\[\033[0;35m\] \[\033[1;36m\]# \[\033[0m\]" -i $(RUN_ARGS) sh

build: ## Build the extension (for the production)
	docker run -i $(RUN_ARGS) yarn build

watch: ## Watch for source changes
	docker run -i $(RUN_ARGS) yarn watch

test: ## Run the tests
	docker run -i $(RUN_ARGS) yarn test

clean: ## Make some clean
	rm -R ./dist* ./coverage

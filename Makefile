#!/usr/bin/make
# Makefile readme: <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

.DEFAULT_GOAL := build
.MAIN := build

NODE_IMAGE = node:21-alpine
RUN_ARGS = --rm -v "$(shell pwd):/src:rw" \
	-t --workdir "/src" \
	-u "$(shell id -u):$(shell id -g)" \
	-e "NPM_CONFIG_UPDATE_NOTIFIER=false" \
	-e PATH="$$PATH:/src/node_modules/.bin" $(NODE_IMAGE)

.PHONY: install
install: ## Install all dependencies
	docker run $(RUN_ARGS) npm install

.PHONY: shell
shell: ## Start shell into a container with node
	docker run -e "PS1=\[\033[1;34m\]\w\[\033[0;35m\] \[\033[1;36m\]# \[\033[0m\]" -i $(RUN_ARGS) sh

.PHONY: build
build: install ## Build the extension and pack it into a zip file
	docker run $(RUN_ARGS) npm run build

.PHONY: fmt
fmt: ## Run prettier
	docker run $(RUN_ARGS) npm run fmt

.PHONY: test
test: ## Run lint and tests
	docker run $(RUN_ARGS) npm run lint
	docker run $(RUN_ARGS) npm run test

.PHONY: watch
watch: ## Start watch mode
	docker run $(RUN_ARGS) npm run watch

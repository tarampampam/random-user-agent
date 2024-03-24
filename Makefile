#!/usr/bin/make
# Makefile readme: <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

NODE_IMAGE = node:21-alpine
RUN_ARGS = --rm -v "$(shell pwd):/src:rw" --workdir "/src" -u "$(shell id -u):$(shell id -g)" -e PATH="$$PATH:/src/node_modules/.bin" -t $(NODE_IMAGE)

.PHONY: install
install: ## Install all dependencies
	docker run $(RUN_ARGS) npm install

.PHONY: shell
shell: ## Start shell into a container with node
	docker run -e "PS1=\[\033[1;34m\]\w\[\033[0;35m\] \[\033[1;36m\]# \[\033[0m\]" -i $(RUN_ARGS) sh

.PHONY: watch
watch: ## Start watch mode
	docker run $(RUN_ARGS) npm run watch

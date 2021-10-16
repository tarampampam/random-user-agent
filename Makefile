#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

SHELL = /bin/sh
NODE_IMAGE = tarampampam/node:16-alpine
RUN_ARGS = --rm -v "$(shell pwd):/src:rw" --workdir "/src" -u "$(shell id -u):$(shell id -g)"

.PHONY : help install lint test test-cover update build clean watch
.DEFAULT_GOAL : help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@printf "\033[33m%s:\033[0m\n" 'Available commands'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[32m%-13s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install all dependencies
	docker run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn install --add-python-to-path='true'

lint: ## Execute linters
	echo "Nothing is here"

test: ## Execute tests
	docker run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn test

test-cover: ## Execute tests with code coverage
	docker run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn test:cover
	-sensible-browser ./coverage/index.html

update: ## Update all dependencies
	docker run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn upgrade --no-progress --non-interactive

build: clean ## Build application bundle
	docker run $(RUN_ARGS) -e "NODE_ENV=production" -t "$(NODE_IMAGE)" yarn build
	docker run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn build:zip

watch: ## Start assets watching
	docker run $(RUN_ARGS) -p 9090:9090/tcp -ti "$(NODE_IMAGE)" yarn watch:dev

shell: ## Start shell into container with node
	@docker run -e "PS1=\[\033[1;32m\]\[\033[1;36m\][\u@docker] \[\033[1;34m\]\w\[\033[0;35m\] \[\033[1;36m\]# \[\033[0m\]" \
		$(RUN_ARGS) -ti "$(NODE_IMAGE)" sh

clean: ## Make some clean
	-rm -Rf ./dist ./dist-zip ./coverage ./*.log

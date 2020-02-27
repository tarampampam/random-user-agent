#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

docker_bin := $(shell command -v docker 2> /dev/null)
cwd = $(shell pwd)

SHELL = /bin/sh
NODE_IMAGE = tarampampam/node:12-alpine
RUN_ARGS = --rm -v "$(cwd):/src:cached" --workdir "/src" -u "$(shell id -u):$(shell id -g)"

.PHONY : help install lint test test-cover update build clean watch
.SILENT : help install lint test test-cover update build watch
.DEFAULT_GOAL : help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@printf "\033[33m%s:\033[0m\n" 'Available commands'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[32m%-13s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install all dependencies
	$(docker_bin) run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn install

lint: ## Execute linters
	$(docker_bin) run --rm -v "$(cwd)/CHANGELOG.md:/CHANGELOG.md:ro" avtodev/markdown-lint:v1 \
		--rules /lint/rules/changelog.js --config /lint/config/changelog.yml /CHANGELOG.md
	$(docker_bin) run --rm -v "$(cwd):/rootfs:ro" -w "/rootfs" avtodev/markdown-lint:v1 \
		--ignore CHANGELOG.md --ignore './node_modules/**' --ignore './extension/**' '**/*.md'

test: ## Execute tests
	$(docker_bin) run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn test

test-cover: ## Execute tests with code coverage
	$(docker_bin) run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn test:cover

update: ## Update all dependencies
	$(docker_bin) run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn upgrade --no-progress --non-interactive

build: clean ## Build application bundle
	$(docker_bin) run $(RUN_ARGS) -e "NODE_ENV=production" -t "$(NODE_IMAGE)" yarn build
	$(docker_bin) run $(RUN_ARGS) -t "$(NODE_IMAGE)" yarn build:zip

watch: ## Start attets watching
	$(docker_bin) run $(RUN_ARGS) -p 9090:9090/tcp -ti "$(NODE_IMAGE)" yarn watch:dev

shell: ## Start shell into container with node
	@$(docker_bin) run -e "PS1=\[\033[1;32m\]\[\033[1;36m\][\u@docker] \[\033[1;34m\]\w\[\033[0;35m\] \[\033[1;36m\]# \[\033[0m\]" \
		$(RUN_ARGS) -ti "$(NODE_IMAGE)" sh

clean: ## Make some clean
	-rm -Rf "$(cwd)/dist" "$(cwd)/dist-zip" "$(cwd)/coverage"

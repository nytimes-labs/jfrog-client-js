export NPM_CONFIG_IGNORE_SCRIPTS=true
export CLIENTTESTS_PLATFORM_USERNAME?=$(ARTIFACTORY_CLEANUP_API_USERNAME)
export CLIENTTESTS_PLATFORM_PASSWORD?=$(ARTIFACTORY_CLEANUP_API_API_TOKEN)
export CLIENTTESTS_PLATFORM_URL?=$(ARTIFACTORY_CLEANUP_API_SERVICE_URL)
export NODEBIN:= node_modules/.bin


compile_DEPS = clean
jumpstart_DEPS = blankslate
lint_DEPS = compile
test_DEPS = clean

all: clean format lint build compile pack

node_modules:
	$(info node_modules not found, creating it.)
	npm i

unlink=@test -e $(1) && rm -rfv $(1)

lib:
	npm compile

compile format test lint: node_modules
	$(info "npm run $@")
	$(unlink lib)
	$(unlink package-lock.json)
	$(unlink npm.lock)
	@npm run $@

pack:
	npm pack

clean:
	git clean -Xf

shell:
	$(NODEBIN)/ts-node


.PHONY: test build compile lint format pack shell

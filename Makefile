NAME   := flavioespinoza/drone-react-build
TAG    := $(shell git rev-parse --abbrev-ref HEAD)
IMG    := ${NAME}:${TAG}

build:
	@make build-docker

build-docker:
	@echo "***** Docker Build & Push Image: " ${IMG} "*****"
	yarn docker:prep
	yarn docker:build

build-drone:
	yarn docker:prep

test:
	@echo "** Testing **"
	yarn install
	yarn test

lint:
	@echo "** Linting **"

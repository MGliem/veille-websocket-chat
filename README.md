# Welcome

The purpose is to present a simple application that use websockets for a chat application.

I made this for my school (technology watch).

## Here's how to get started:

1. Clone this repo
2. "npm i" in a terminal at the root of the project
3. In the deployment folder, there is a docker-compose for setting up a webserver (nginx) with apropriate configuration for a reverse proxy. Type "docker compose -f ./deployment/docker-compose.dev.yml up -d" in a terminal at the root of the project

## Run the application locally:

1. Make sure the docker container is up and running. ("docker ps" in a terminal)
2. "npm run d" in a terminal at the root of the project
3. In your web-browser go to localhost:8080 (port can be changed in the docker-compose file)

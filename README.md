## Instructions

To start the docker services

1. run `docker compose up --build` (or `npm run dev` in the project root
   directory) and wait for the docker images to build

2. open http://localhost:32571 in a web browser

To reset the test database

1. run `docker compose up --build --force-recreate --renew-anon-volumes` (or
   `npm run reset` in the project root directory) and wait for the
   containers to restart

If an unexpected issue occurs

1. try running `docker compose down` to shutdown the docker containers before
   starting them using the steps above again

# nodejs-sample
This is an example node js project using typescript, consul, express, mongoose, mocha.
Endpoints with requests:
1. Get("/tasks")
   ```json
   {
      "project_id": 1
   }   
   ```
2. Post("/tasks")
   ```json
   {
      "name": "name",
      "description": "description",
      "project_id": 1,
      "assignee_id": 1,
      "reporter_id": 2
   }
   ```
3. Post("/tasks/_counts")
   ```json
   {
      "projects_ids": [1, 2, 3]
   }
   ```
   

# How to run "for the prod"

Just execute `docker-compose up`

It will run all services in containers (nodejs-sample, mongodb, consul, postgresdb and spring boot app).
Once consul is running, all key-values will be added automatically.
Once consul and mongodb are running, nodejs-sample will be started.
Once protgresdb are running, spring app will be started

All consul kv's and mongoDB data will be stored in docker/data/...
Thus, when the containers are restarted, data will not be lost.

# Configuration

If for some reason consul kv's were not added, and you need to add it manually:

Open consul ui (by default `localhost:8501`)
Add to consul these key-values:

for "prod" version

`config/nodejs-sample/prod/address` : `0.0.0.0`

`config/nodejs-sample/prod/port` : `8888`

`config/nodejs-sample/prod/mongo.address` : `mongodb://db:27017`

`config/profitsoft-unit-2/prod/server.port` : `8080`

`config/profitsoft-unit-2/prod/postgres/url` : `jdbc:postgresql://postgresdb:5432/profitsoft-unit-2`

`config/profitsoft-unit-2/prod/postgres/username` : `postgres`

`config/profitsoft-unit-2/prod/postgres/password` : `postgres`


for "dev" version

`config/nodejs-sample/dev/address` : `localhost`

`config/nodejs-sample/dev/port` : `8888`

`config/nodejs-sample/dev/mongo.address` : `mongodb://127.0.0.1:27018`


run nodejs-sample again

# Setup
Run `npm install` in the terminal

# How to develop

```
npm run devel
```

# How to build

```
npm run build
```

# How to run tests

```
npm run test
```

If everything is fine, you should see the list of passed tests

# How to check coverage

```
npm run coverage
```
If everything is fine, you should see the table with coverage after passed tests

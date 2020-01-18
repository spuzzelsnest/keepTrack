# keepTrack

premises access time

# Pre-Reqs

```bash
brew install postgresql

createuser --pwprompt keeptrack
createdb -p 5432 -O keeptrack api 
npm i -g npx
```

# Setup

```bash
npm i
npm update

```

## Database

Postgres

```bash

# Manually create database "keepTrack"
# Update src/db/config/database.json

export DBURL_dev=postgresql://[user[:password]@][netlocation][:port][/dbname]

# Run migrations

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

# Running The App
```bash
# Start frontend
ng serve

# Start backend
npm start
```


Seeders installed default user with login key '00000000'



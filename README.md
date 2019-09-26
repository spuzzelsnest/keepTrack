# keepTrack

premises access time


# Setup

```bash
npm i

# Start frontend
ng serve

# Start backend
npm start
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

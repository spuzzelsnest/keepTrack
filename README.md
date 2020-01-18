# keepTrack

Premises access time tracker

# Pre-Reqs

```bash
#Postgres

(linux)
apt-get update
apt-get install postgresql

(mac OSX)
brew install postgresql

#Create User and DB

createuser --pwprompt keeptrack
createdb -p 5432 -O keeptrack api 
```

# Setup

```bash
cd keepTrack

#Edit .env.sample
cp .env.sample .env
nano .env

    #Edit
    SPORT= //BACK END Port
    DBURL_dev='postgres://keeptrack:[PASSWORD]@localhost:5432/api'
    DBURL= //DBURL Production

#Install packages 
npm i
npm update

```

## Database

Postgres

```bash
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

Open your browser and visit the page 'http://localhost:4200/'
Seeders installed default user with login key '00000000'

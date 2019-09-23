# keepTrack

premises access time


# Setup

```bash
npm install

# Start frontend
ng serve

# Start backend
npm start
```

## Database

```bash
docker run --name keepTrack -p 6000:5432 -e POSTGRES_PASSWORD=duckTracky -e POSTGRES_DB=keepTrack -d postgres

# Manually create database "keepTrack"
# Update src/db/config/database.json
# Run migrations
npx sequelize-cli db:migrate
```

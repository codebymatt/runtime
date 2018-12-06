## TODO

### Pressing
- Check application/type == JSON
- Always set application/type = JSON
- Validate JWT before every request is handled
- Write error responses (probably ony showing 404's)

### Before production
- Add proper logging (console for dev and test, file for production)
- Write integration tests for handler paths
- Write integration tests for DB queries

## Database Setup

Database config is stored in a YAML file in `api/scripts/database.yaml`.
It's gitignored, so you'll need to specify your own config if you want to run
the app (or the tests) locally.

**Sample layout**
dev:
  db_name:      "dundermifflinsales"
  db_password:  "bestbossintheworld"
  db_user:      "mike_scott"

### Test Database
- Test configurations should be set up in a local (and .gitignored) file
- Test user should *own* the test db
- Test user should have 'create database' permissions
- Test user should have ALL privileges on test db
- Teardown script should NEVER be run on any db except test

### Development Database
- Similar to test setup, except it's not necessary for user to own the db
- The only script run against this db should be `migrate.rb`
- `migrate.rb` will need to be run everytime you add a script to the migrations folder
- To run app properly locally, you'll need to have run migrations

**Note:** To interact with database, the app currently uses environment variables
(see `db` package for actual variabes required). They should be the same as the
ones specified in the config file.
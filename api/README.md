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


## Database Config

Database config is stored in a YAML file in `api/scripts/database.yaml`.
It's gitignored, so you'll need to specify your own config if you want to run
the app (or the tests) locally.

**Sample layout**
dev:
  db_name:      "dundermifflinsales"
  db_password:  "bestbossintheworld"
  db_user:      "mike_scott"

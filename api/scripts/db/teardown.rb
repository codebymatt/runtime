#!/usr/bin/env ruby

require 'pg'
require 'psych'

# This should only be run in a test environment!!
env = 'test'

script_dir = File.dirname(__FILE__)
test_db_owner = ENV['RUNTIME_TEST_USER']

# The test database should be owned by the test_dbB_owner.
# This should be the ONLY thing owned by that user
DROP_TEST_DB_STATEMENT = "DROP OWNED BY #{test_db_owner}".freeze

begin
    db_info = Psych.load_file(File.join(script_dir, 'database.yaml'))
rescue Psych::SyntaxError => e
    puts e
end

config = db_info[env]
db_name = config['db_name']
db_user = config['db_user']
db_password = config['db_password']

connection_string = "dbname=#{db_name} user=#{db_user} password=#{db_password}"
conn = PG.connect(connection_string)

puts 'Attempting to tear down test database...'
begin
    conn.exec(DROP_TEST_DB_STATEMENT)
    puts 'Test database succesfully torn down'
rescue PG::Error => e
    puts e
    puts 'Could not tear down test database'
end

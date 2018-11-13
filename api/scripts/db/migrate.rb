#!/usr/bin/env ruby

require 'pg'

RUNTIME_ENV = ENV['RUNTIME_ENV']
DBNAME      = ENV["RUNTIME_#{RUNTIME_ENV}_DB"]
PASSWORD    = ENV["RUNTIME_DB_#{RUNTIME_ENV}_PASSWORD"]
USER        = ENV["RUNTIME_#{RUNTIME_ENV}_USER"]

CHECK_IF_TABLE_EXISTS = "SELECT EXISTS (
    SELECT 1
    FROM   information_schema.tables
    WHERE  table_name = '#{DBNAME}'
);"

MIGRATIONS_FOLDER = File.join(__dir__, 'migrations')

connection_string = "dbname=#{DBNAME} user=#{USER} password=#{PASSWORD}"
migrations = Dir.entries(MIGRATIONS_FOLDER) - ['.', '..']

def run_migrations(start_index) end

begin
    connection = PG.connect(connection_string)
    if connection.exec(CHECK_IF_TABLE_EXISTS).fields[0] == 'exists'
        # Get most recent migration num
        # run_migrations(migration_rum)
    else
        run_migrations(0)
    end
rescue PG::Error => e
    puts e
ensure
    connection.close if connection
end

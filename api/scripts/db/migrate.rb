#!/usr/bin/env ruby

require 'pg'
require 'psych'

runtime_env = ENV['RUNTIME_ENV'].downcase

begin
    db_info = Psych.load_file('database.yaml')
rescue Psych::SyntaxError => e
    puts e
end

config = db_info[runtime_env]
db_name = config["db_name"]
db_user = config["db_user"]
db_password = config["db_password"]

CHECK_IF_TABLE_EXISTS = "SELECT EXISTS (
    SELECT 1
    FROM   information_schema.tables
    WHERE  table_name = '#{db_name}'
);".freeze

GET_LAST_MIGRATION = 'SELECT index FROM migrations ORDER BY date_applied LIMIT 1;'.freeze

MIGRATIONS_FOLDER = File.join(__dir__, 'migrations')

connection_string = "dbname=#{db_name} user=#{db_user} password=#{db_password}"
migrations = Dir.entries(MIGRATIONS_FOLDER) - ['.', '..']

def run_migrations(start_index, migrations = [])
    if start_index == 0
        puts 'Migrations would all be run here'
        migrations.each { |m| puts "Running #{m}" }
    else
        migrations[start_index..migrations.length].each { |m| puts "Running #{m}" }
    end
end

begin
    connection = PG.connect(connection_string)
    if connection.exec(CHECK_IF_TABLE_EXISTS).fields[0] == 'exists'
        # Check migrations table exists
        if migrations_table != nil
            migration_num = connection.exec(GET_LAST_MIGRATION)
            puts migration_num.to_a
            if migration_num.values != nil
                # run_migrations(migration_num.getvalue(0,0) + 1, migrations)
            else
                puts 'Value was nil'
            end
        end
    else
        run_migrations(0)
    end
rescue PG::Error => e
    puts e
ensure
    connection.close if connection
end

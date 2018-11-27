#!/usr/bin/env ruby

require 'pg'
require 'psych'

runtime_env = ENV['RUNTIME_ENV'].downcase
script_dir = File.dirname(__FILE__)

begin
    db_info = Psych.load_file(File.join(script_dir, 'database.yaml'))
rescue Psych::SyntaxError => e
    puts e
end

config = db_info[runtime_env]
db_name = config['db_name']
db_user = config['db_user']
db_password = config['db_password']

CHECK_IF_TABLE_EXISTS = "SELECT EXISTS (
    SELECT 1
    FROM   information_schema.tables
    WHERE  table_name = '#{db_name}'
);".freeze

GET_LAST_MIGRATION = 'SELECT index FROM migrations ORDER BY date_applied LIMIT 1;'.freeze

UPDATE_MIGRATIONS = 'INSERT '.freeze

$migrations_dir = File.join(script_dir, 'migrations')
migrations = Dir.entries($migrations_dir) - ['.', '..']

connection_string = "dbname=#{db_name} user=#{db_user} password=#{db_password}"

def execute_migration(conn, index, migration_name)
    puts "Running #{migration_name}"
    sql = File.open($migrations_dir + '/' + migration_name, 'rb') { |file| file.read }
    begin
        conn.exec(sql)
        update_migrations = "INSERT INTO migrations (index, date_applied)\
                             VALUES (#{index}, now());"
        conn.exec(update_migrations)
        puts "Finished #{migration_name}"
    rescue PG::Error => e
        puts e
    end
end

def run_migrations(conn, start_index = 1, migrations = [])
    if start_index == 0 || conn.nil?
        puts 'No migrations could be run'
        return
    end
    if migrations.length == start_index
        puts 'Migrations up to date'
        return
    end
    migrations[start_index..migrations.length].each_with_index do |m, i|
        migration_index = start_index + i
        execute_migration(conn, migration_index, m)
    end
    puts 'Migrations finished'
end

begin
    connection = PG.connect(connection_string)
    if connection.exec(CHECK_IF_TABLE_EXISTS).fields[0] == 'exists'
        res = connection.exec(GET_LAST_MIGRATION)
        if res.num_tuples == 0
            run_migrations(connection, 1, migrations)
        else
            next_migration_index = res.num_tuples[0][0] + 1
            run_migrations(connection, next_migration_index, migrations)
        end
    else
        puts 'Migrations table has not been created - please run setup script'
    end
rescue PG::Error => e
    puts e
ensure
    connection.close if connection
end
#!/usr/bin/env ruby

require 'pg'

runtime_env = ENV['RUNTIME_ENV']
db_name     = ENV["RUNTIME_#{runtime_env}_DB"]
db_password = ENV["RUNTIME_DB_#{runtime_env}_PASSWORD"]
db_user     = ENV["RUNTIME_#{runtime_env}_USER"]

connection_String = "dbname=#{db_name} user=#{db_user}"
begin
    connection = PG.connect(connection_string)
    puts connection.server_version
rescue PG::Error => e
    puts e
ensure
    connection.close if connection
end

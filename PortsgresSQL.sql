-- 1. Create the database and user
CREATE DATABASE social_media;
CREATE USER yachii19 WITH PASSWORD 'password';

-- 2. Grant database-level access
GRANT CONNECT ON DATABASE social_media TO yachii19;

-- 3. Switch to the new database (done in psql, or manually if in script)
\c social_media

-- 4. Grant usage and creation privileges on the public schema
GRANT USAGE ON SCHEMA public TO yachii19;
GRANT CREATE ON SCHEMA public TO yachii19;

-- 5. Grant full access to existing tables, sequences, and functions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO yachii19;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO yachii19;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO yachii19;

-- 6. Ensure privileges are granted automatically to future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO yachii19;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO yachii19;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO yachii19;

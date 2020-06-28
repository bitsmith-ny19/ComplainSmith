#REPLACE POSTGRES URL WITH CORRESP. SERVER / DB
psql -f schema.sql postgresql://s5proy1@localhost:5432/s5proy1?sslmode=require

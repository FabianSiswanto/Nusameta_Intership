--
-- File generated with SQLiteStudio v3.4.4 on Tue Aug 8 00:53:44 2023
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: coffee
CREATE TABLE IF NOT EXISTS coffee (coffee_id INTEGER PRIMARY KEY, testing_time TEXT (16), type TEXT, timestamp TEXT (16), origin TEXT, tree_height REAL, gps_id INTEGER REFERENCES gps (gps_id), condition_id INTEGER REFERENCES condition (condition_id), soil_id INTEGER REFERENCES soil (soil_id));

-- Table: condition
CREATE TABLE IF NOT EXISTS condition (condition_id INTEGER PRIMARY KEY, avg_temp REAL, humidity REAL, rainfall REAL, light_intensity REAL);

-- Table: gps
CREATE TABLE IF NOT EXISTS gps (gps_id INTEGER PRIMARY KEY, latitude INTEGER, longitude INTEGER, altitude INTEGER);

-- Table: soil
CREATE TABLE IF NOT EXISTS soil (soil_id INTEGER PRIMARY KEY, nutrition REAL, moisture REAL, conductivity REAL);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

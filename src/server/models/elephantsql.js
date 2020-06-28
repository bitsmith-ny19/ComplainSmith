const { Pool } = require('pg');
//const connectionString = process.env.DB_URL;
const path = require("path");
const fs = require( "fs" );
const app_conf = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../../../.env/app_conf.json"), {encoding: "utf-8"} )
);
config0 = {
  "user": "s5proy1",
  "host": "localhost",
  "database": "s5proy1",
  "port": 5432,
  "ssl": {
    "rejectUnauthorized": false,
    "ca": fs.readFileSync( app_conf.ca_file_loc, {encoding: "utf-8"} ),
    "key": fs.readFileSync( app_conf.key_file_loc, {encoding: "utf-8"} ),
    "cert": fs.readFileSync( app_conf.cert_file_loc, {encoding: "utf-8"} )
  }
};

/*
const pool = new Pool({
  connectionString: connectionString,
});
*/
const pool = new Pool( config0 );

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "milo123",
    host: "localhost",
    port: 5432,
    database: "pern_pomodorro"
});

module.exports = pool;
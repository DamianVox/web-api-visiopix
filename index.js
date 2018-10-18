// server.js 
const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const {Pool} = require('pg');

app.use(bodyParser.json({
    strict: true
}));
const port = 9090;
// Choose between local or production 
// true = Production 
// false = Local 
let production = false;
var config;
if (production) {
    // Production
    config = {
        user: 'postgres',
        database: 'visiopix',
        password: 'postgres',
        host: 'localhost',
        port: 5432,
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000
    };
} else {
    // Local
    config = {
        user: 'postgres',
        database: 'visiopix',
        password: 'postgres',
        host: 'localhost',
        port: 5432,
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000
    };
}
const pool = new Pool(config);
const base_url = '/visiotime';
// GET_ALL_USERS 
app.get(`${base_url}/users`, (req, response) => {
    const client = `http://${req.headers.host}`;
    var url = new URL(client + req.url);
    console.log(`Full URL: ${url}`);

    let stations = [];
    pool.query(`select * from users`, (err, res) => {
        if (err) {
            response.send(err.message);
            console.log(err);
        } else if (res) {
            if (res.rows.length === 0) {
                response.statusCode = 204;
                response.send("est5ryeg6ue6gu73f6uwe56fd");
                console.log("Results empty");
            } else {
                res.rows.forEach(element => {
                    stations.push({
                        element
                    });
                    console.log("Results found");
                });
                stations = JSON.stringify(stations);
                response.send(stations);
            }
        }
    });
})

app.get(`${base_url}/adduser`, (req, response) => {
    const client = `http://${req.headers.host}`;
    var url = new URL(client + req.url);
    console.log(`Full URL: ${url}`);

    const name = url.searchParams.get('name');
    const surname = url.searchParams.get('surname');
    const email = url.searchParams.get('email');
    const user_name = url.searchParams.get('user_name');
    const password = url.searchParams.get('password');
    const account_type = url.searchParams.get('account_type');

    pool.query(`insert into users (name, surname, email, user_name, password, account_type) values ('${name}','${surname}','${email}','${user_name}','${password}','${account_type}')`, (err, res) => {
        if (err) {
            response.send(err.message);
            console.log(err);
        }else{
            response.send("User added!");
        }
    });
})

app.get(`${base_url}/getuser`, (req, response) => {
    const client = `http://${req.headers.host}`;
    var url = new URL(client + req.url);
    console.log(`Full URL: ${url}`);

    const email = url.searchParams.get('email');
    const passwd = url.searchParams.get('password');

    pool.query(`select * from users where email = '${email}' and password = '${passwd}'`, (err, res) => {
        if (err) {
            response.send(err.message);
            console.log(false);
        } else if (res) {
            if (res.rows.length === 0) {
                response.send("false");
            } else {
            response.send("true");
            }
    
        }}
    )}
);
app.listen(port, () => console.log(`VisioPix API listening on port ${port}`));

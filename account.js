let {
    Pool
} = require('pg');
const conf = {
    database: `visiopix`,
    host: 'localhost',
    user: 'postgres',
    password: `postgres`,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}

module.exports = {
    get_Account: async function (email) {
        console.log("get_Account was called");
        const pool = new Pool(conf);

        const client = await pool.connect();
        let res;
        try {
            res = await client.query(`SELECT * FROM accounts where email = '${email}'`);
            client.release()
        } catch (error) {
            console.log(error);
        }

        res.rows.forEach(element => {
            console.log(element);
            return JSON.stringify(element);
        });
    },

    create_Account: async function (name, surname, user_name, password, phone, email, account_type) {

        console.log("create_Account was called");
        const pool = new Pool(conf);

        const client = await pool.connect();
        let res;
        try {
            res = await client.query(`insert into accounts (name, surname, user_name, password, phone, email, account_type) values('${name}', '${surname}', '${user_name}', '${password}', '${phone}', '${email}', ${account_type})`);
            client.release()
        } catch (error) {
            console.log(error);
        }

        console.log(res);

        let found = await validate(email);

        if (found) {
            return "User created";
        } else {
            return "ERROR!!! User not created";
        }
    },

    validate_Account: async function (email, passwd) {

        let found = false;

        console.log("validate_Account was called");

        const pool = new Pool(conf);

        const client = await pool.connect();
        let res;
        try {
            res = await client.query(`SELECT * FROM accounts where email = '${email}' and password = '${passwd}'`);
            client.release()
        } catch (error) {
            console.log(error);
        }

        if (res.rows.length === 0) {
            found = false;
        } else {
            found = true;
        }

        return found;
    },

    update_Account: async function(id, name, surname, email, phone, password, user_name, account_type){
        const pool = new Pool(conf);

        const client = await pool.connect();
        let res;
        try {
            res = await client.query(`update accounts set id = ${id}, name = '${name}', surname = '${surname}', email = '${email}', phone = '${phone}', password = '${password}', user_name = '${user_name}', account_type = ${account_type}  where id = ${id}`);
            client.release()
        } catch (error) {
            console.log(error);
        }
    console.log(res);
    return res;
    }
}

async function validate(email) {
    const pool = new Pool(conf);

    const client = await pool.connect();
    let res;
    try {
        res = await client.query(`SELECT * FROM accounts where email = '${email}'`);
        client.release()
    } catch (error) {
        console.log(error);
    }

    if (res.rows.length === 0) {
        found = false;
    } else {
        found = true;
    }

    return found;
}
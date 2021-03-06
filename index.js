let express = require('express');
let app = express();
const {Pool} = require('pg');

const conf = {
database: `visiopix`,
host: 'localhost',
user: 'postgres',
password: `postgres`,
max: 20,
idleTimeoutMillis: 30000,
connectionTimeoutMillis: 2000,
}

let port = 8080;

// ACCOUNTS //

app.get(`/visiotime/createAccount`, async(request, response) =>{

    let name = request.query.name;
    let surname = request.query.surname;
    let user_name = request.query.user_name;
    let password = request.query.password;
    let phone = request.query.phone;
    let email = request.query.email;
    let account_type = request.query.account_type;

    console.log(email);

    const pool = new Pool(conf);

    const client = await pool.connect();
    let res;
    try {
        await client.query(`insert into accounts (name, surname, user_name, password, phone, email, account_type) values('${name}', '${surname}', '${user_name}', '${password}', '${phone}', '${email}', ${account_type})`);
        client.release()
    } catch (error) {
        console.log(error);
    }

let found = await validate(email);

if(found){
    return response.send("User created");
}else{
    return response.send("ERROR!!! User not created");
}
})

app.get(`/visiotime/validateAccount/:email/:password`, async(request, response) =>{

    console.log(request);

    let email = request.params.email;
	let passwd = request.params.password;

    let found = false;

    console.log(email);
    console.log(passwd);

    const pool = new Pool(conf);

    const client = await pool.connect();
    let res;
    try {
        res = await client.query(`SELECT * FROM accounts where email = '${email}' and password = '${passwd}'`);
        client.release()
    } catch (error) {
        console.log(error);
    }

    if(res.rows.length === 0){
        found = false;
    } else{
        found = true;
    }

    console.log(found);

   return response.send(res.rows);

})

app.get(`/visiotime/updateAccount`, async(request, response) =>{

    let id = request.query.id;
    let name = request.query.name;
    let surname = request.query.surname;
    let email = request.query.email;
    let phone = request.query.phone;
    let password = request.query.password;
    let user_name = request.query.user_name;
	let account_type = request.query.account_type;

    let found = false;

    //console.log(email);

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
return response.send(res);
})

app.get(`/visiotime/getAccount`, async(request, response) =>{

    let email = await request.query.email;

    console.log(email);

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
        return response.send(JSON.stringify(element));
});

   

})

app.get(`/visiotime/getAccounts`, async(request, response) =>{
    const pool = new Pool(conf);

    

    const client = await pool.connect();
    let res;
    try {
        res = await client.query(`SELECT * FROM accounts order by id desc`);
        client.release()
    } catch (error) {
        console.log(error);
    }

        return response.send(JSON.stringify(res.rows));

})

app.get(`/visiotime/deleteAccount`, async(request, response) =>{
    const pool = new Pool(conf);

    let email = await request.query.email;

    const client = await pool.connect();
    let res;
    try {
        await client.query(`delete from accounts where email='${email}'`);
        client.release()
    } catch (error) {
        console.log(error);
    }

    let found = await validate(email);

    if(found){
        return response.send("User created");
    }else{
        return response.send("ERROR!!! User not created");
    }

})

async function validate(email){
    const pool = new Pool(conf);

    const client = await pool.connect();
    let res;
    try {
        res = await client.query(`SELECT * FROM accounts where email = '${email}'`);
        client.release()
    } catch (error) {
        console.log(error);
    }

    if(res.rows.length === 0){
        found = false;
    } else{
        found = true;
    }

    return found;
}

// COMPANIES //

app.get(`/visiotime/getCompanies`, async(request, response) =>{
    const pool = new Pool(conf);

    let company_id = request.query.company_id;

    const client = await pool.connect();
    let res;
    try {
        res = await client.query(`select * from companies where company_id = ${company_id}`);
        client.release()
    } catch (error) {
        console.log(error);
    }
return response.send(JSON.stringify(res.rows));

})

app.listen(port, () => console.log(`VisioTime API listening on port ${port}!`))
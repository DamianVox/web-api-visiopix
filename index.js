let startup = require('./startup');
let accounts = require('./account');

startup.test();

let app = startup.express();
let port = startup.port();

//console.log(startup.start());

app.get(`/visiotime/createAccount`, async(request, response) =>{

    let name = await request.query.name;
    let surname = await request.query.surname;
    let user_name = await request.query.user_name;
    let password = await request.query.password;
    let phone = await request.query.phone;
    let email = await request.query.email;
    let account_type = await request.query.account_type;

    const res = await accounts.create_Account(name, surname,user_name, password, phone, email, account_type);

    return response.send(res);

})

app.get(`/visiotime/validateAccount`, async(request, response) =>{

    let email = request.query.email;
	let passwd = request.query.password;

    const res = await accounts.validate_Account(email, passwd);

    return response.send(res);
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

    

    const res = await accounts.update_Account(id, name, surname, email, phone, password, user_name, account_type);

    return response.send(res);
})

app.get(`/visiotime/getAccount`, async(request, response) =>{
    const email = await request.query.email;

    const res = await accounts.get_Account(email);

    return response.send(res);

})



app.listen(port, () => console.log(`VisioTime API listening on port ${port}!`))
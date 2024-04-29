#!/us/bin/env node
const express = require ('express');
const bodyParser = require ('body-parser');
const cookieSession = require ('cookie-session');
const path = require ('path');
const usersRepo = require ('./repositories/users.js');

const app = express ();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    //importante para criar a criptografia dos cookies
    keys: ['tretasuperlegal37']
}));






app.get ('/',(req, res) =>{

    // Use path.join() to construct the absolute path to your HTML file
    const filePath = path.join(__dirname, 'loging.html');
    // Send the HTML file as the response
    // res.send(`${req.session.userId}`)
    res.sendFile(filePath);
    
    

  

//***** abaixo e o modelo aonde inlcui um html direto dentro do arquivo acima eh utilizando um html externo */
    // res.send(`
    // <div>
    //     <form method="POST">
    //         <input name="email" placeholder="email" />
    //         <input name="password" placeholder="password" />
    //         <input name="passwordConfirmation" placeholder="passwordConfirmation" />
    //         <button>Sign Up</button>
    //     </form>
    // </div>
    // `);
//****************** */
});

app.post('/', async (req,res)=>{
    const{ email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email});
    if (existingUser) {
        return res.alert('Email ja em uso');
    }

    if (password !== passwordConfirmation){
        return res.send('Senha tem que ser igual');
    }
    
    const user = await usersRepo.create({email, password});

    req.session.userId = user.id;
    res.send('Conta criada com sucesso');
});

app.listen(3000, () =>{
    console.log('listening');
});


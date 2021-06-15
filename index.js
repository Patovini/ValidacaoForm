const express = require('express');
var app  = express();
var session = require('express-session');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false })) // para leitura simples
app.use(express.json()) // para ser apenas json

app.use(cookieParser("blablabla")); 

//expresss sesssion
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

//express flash
app.use(flash());

app.get('/', (req, res) => {

    var emailError = req.flash("EmailError");
    var nomeError = req.flash("NomeError");
    var pontosError = req.flash("PontosError");

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    // isso e a mesma coisa que o if abaixo

    // if (emailError == undefined ) {
    //     if ( emailError.length == 0){
            
    //         emailError = undefined;
    //     }
    // }
    res.render('index.ejs', {emailError,nomeError,pontosError});
})

//rota para formulario
app.post('/form', (req,res) =>{
    var { email, nome, pontos} = req.body;

    var emailError;
    var nomeError;
    var pontosError;


    if(email == undefined || email == ""){
        emailError = "O email não pode estar vazio"
    }
    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode estar vazio"
    }
    if(pontos == undefined || pontos < 10){
        pontosError = "Você precisa ter mais que 10 pontos"
    }

    //Caso algum dos erros estiver vazio 
    if(emailError != undefined || nomeError != undefined || pontosError != undefined){
        req.flash("EmailError", emailError);
        req.flash("NomeError", nomeError);
        req.flash("PontosError", pontosError);
        res.redirect('/');
    }else{

        res.send("Tudo certo!!!!");
    }   

});

app.listen(8080, (req, res) => {
    console.log("servidor rotando");
});
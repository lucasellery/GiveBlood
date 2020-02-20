// Configurando o servidor
const express = require("express"); //pega o express do node_modules e coloca na variável express
const server = express();

// configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'));

//habilitar body do formulário
server.use(express.urlencoded({ extended: true }));

// configurar a conexão com o banco de dados
const Pool = require('pg').Pool; //mantém a conexão ativa
const db = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});

// configurando a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server, //diz-se pro nunjucks que a config do express se chama server
    noCache: true,
});


// // Agrupamento de dados
// // Lista de doadores: Array (Vetor);
// const donors = [
//     {
//         name: "Saitama",
//         blood: "AB+"
//     },
//     {
//         name: "Goku",
//         blood: "B-"
//     },
//     {
//         name: "Naruto",
//         blood: "A+"
//     },
//     {
//         name: "Kirito",
//         blood: "O-"
//     }
// ];

// Servidor, pegue a barra para mim
// o get espera o caminho e o que ele vai fazer
// configurar a apresentação da página
server.get("/", function (req, res) {

    db.query("SELECT * FROM donors", function (err, result) {
        if (err) return res.send("Erro de banco de dados.");

        const donors = result.rows;
        return res.render("index.html", { donors });

    })

});

server.post("/", function (req, res) {
    //pegar dados do formulário
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios.");
    }

    // Põe valores dentro do banco de dados
    const query = `INSERT INTO donors ("name", "email", "blood") 
    VALUES($1, $2, $3)`;

    const values = [name, email, blood];

    db.query(query, values, function (err) {
        //fluxo de erro
        if (err) return res.send("Erro no banco de dados.");

        //fluxo ideal
        return res.redirect("/");
    });
});


server.listen(3000, function () {
    console.log("Servidor iniciado");
}); //iniciando um servidor

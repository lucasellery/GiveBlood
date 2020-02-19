// Configurando o servidor
const express = require("express"); //pega o express do node_modules e coloca na variável express
const server = express();

// configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'));

//habilitar body do formulário
server.use(express.urlencoded({ extended: true }));

// configurando a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server, //diz-se pro nunjucks que a config do express se chama server
    noCache: true,
});


// Agrupamento de dados
// Lista de doadores: Array (Vetor);
const donors = [
    {
        name: "Saitama",
        blood: "AB+"
    },
    {
        name: "Goku",
        blood: "B-"
    },
    {
        name: "Naruto",
        blood: "A+"
    },
    {
        name: "Kirito",
        blood: "O-"
    }
];

// Servidor, pegue a barra para mim
// o get espera o caminho e o que ele vai fazer
// configurar a apresentação da página
server.get("/", function (req, res) {
    return res.render("index.html", { donors });
});

server.post("/", function (req, res) {
    //pegar dados do formulário
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    // Põe valores no array
    donors.push({
        name: name,
        blood: blood,
    });

    return res.redirect("/");

});


server.listen(3000, function () {
    console.log("Servidor iniciado");
}); //iniciando um servidor

//1º Require = estamos chamando as bibliotecas que serão usadas pela aplicação
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
// Instalamos e usamos o dotenv para proteger dados sensíveis das variáveis de ambiente, ex.: senha do banco de dados. No arquivo .env temos que escrever tudo com letras maiúsculas e não podemos usar espaços, também não é recomendado fazer comentários
require('dotenv').config()
// Path é um módulo nativo do node para lidar com caminho de arquivos ou pastas
const path = require('path')
// Porta (vem do JS)
const porta = 3003 

//2º Estamos executando o servidor, através da variável server (vem do Express)
const server = express()

// server.get('/', (req, res)=>{
//     // Resposta que aparecerá no localhost
//     res.send('Minha 1ª rota')
// })

// Conexão ao banco de dados | connect (vem do Mongoose)
// Para acessar uma variável de ambiente precisamos usar process.env.(+ o nome da variável usada no arquivo .env)
mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    //.then(vem do JS) - forma assíncrona, nesse caso, a resposta não é obrigatória, usamos para chamar a mensagem
}).then(()=> console.log("Estamos conectados ao banco de dados")) 

// Configuração extra no Express para tratar requisições e respostas de clientes (navagadores)
// static - serve para criar uma rota para cada arquivo estático (img, css, js)
// __dirname - variável global do node que possui o valor do caminho absoluto do arquivo onde está sendo chamada 
// Usamos o path para juntar caminhos e evitar falhas
server.use(express.static(path.join(__dirname, "/public")))

//Configuração para receber requisições do heder, body (extrai dados comprimidos) 
server.use(express.urlencoded({extended:true}))

// Tranforma os dados de string json para objeto
server.use(express.json())

// Configurações para usar o handlebars (instanciando/executando a biblioteca do handlebars e passando um objeto de configuração de caminhos das pastas)
const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/app/views/layouts"),
    partialsDir: path.join(__dirname, "/app/views/partials")
})

// Serve para o express entender o motor de renderização
server.engine('handlebars', hbs.engine)
// Acessa a pasta views
server.set('views', __dirname + '/app/views/pages')
// Confirmação do motor de renderização
server.set('view engine', 'handlebars')

//3º Escutando a porta e testando a execução do servidor | listen (vem do Express)
server.listen(porta, ()=>{
    console.log('Servidor está liso!')
})

// Observações importantes:
// Métodos http executam uma função, são ações que conectam o servidor ao cliente. Os 4 métodos principais são: Get(recebe algo do servidor / pode enviar de uma maneira "diferente", ex.: pesquisa youtube, termo buscado é exibido no browser), Post(envia algo para o servidor, ex.: usado para enviar informações de formulários), Put(envia algo para o servidor com intenção de que seja atualizado), Delete(envia algo para o servidor com a intenção que seja deletado)
// Colocamos as pastas controllers, models e views dentro da pasta app, para uma melhor organização da estrutura do projeto
// Não podemos subir para o git projeto com pastas vazias, pois serão deletadas. Assim, podemos usar .gitKeep como se fosse um arquivo.
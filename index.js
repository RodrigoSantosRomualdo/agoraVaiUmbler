const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const SpeedAPI = require("./service/SpeedAPI")
const TesteApi = require("./service/TesteApi")
const path = require("path")
//import {promises} from "fs";
//const {Post} = promises('./models/Post');
//const Post = require('./models/Post')
//const Post = promises;
//Post = require('./models/Post');

//Post.Promise()

// Config
  // Template Engine"
  app.engine('handlebars', handlebars({defaultLayout: 'main'}))
  app.set('view engine', 'handlebars')

  // Body Parser
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

  //Public
  app.use(express.static(path.join(__dirname,"public")))

// ROTAS

app.get("/", function(req, res) {
  //Post.all().then(function(posts){ })
  download = 0, ping = 0, upload = 0;
  download = download.toFixed(2)
  ping = ping.toFixed(2)
  upload = upload.toFixed(2)
  var objeto = {
    download: download,
    ping: ping,
    upload: upload
  
  }

    res.render('index', {download: objeto.download,upload: objeto.upload, ping: objeto.ping})
    
    
})

/*
app.get("/", function(req, res) {
  //Post.all().then(function(posts){ })
    res.render('formulario')
    
})  */

app.post('/', function(req, res) {
  
  var dados = TesteApi()
  dados.then(dadorecebido => {
    console.log(dadorecebido)
    dadosApi = JSON.stringify(dadorecebido);
    isp = dadosApi;
    //download = parseFloat(download.toFixed(2))
    //download = JSON.stringify(dadorecebido.download.bandwidth / 125000);
    //Upload = JSON.stringify(dadorecebido.upload.bandwidth / 125000);
    //download = parseFloat(download.toFixed(2))
    //Upload = parseFloat(Upload.toFixed(2))
    var objeto = {
      nome: "DADO DA VELOCIDADE DA SUA INTERNET",
      ping: (parseFloat(dadorecebido.ping.latency).toFixed(2)),
      download: (parseFloat(dadorecebido.download.bandwidth / 125000).toFixed(2)),
      //upload: (JSON.stringify(parseFloat(dadorecebido.upload.bandwidth / 125000).toFixed(2)))
      upload: (parseFloat(dadorecebido.upload.bandwidth / 125000).toFixed(2)),
      ip :  dadorecebido.interface.externalIp,
      operadora: dadorecebido.isp
    }

    //res.render('dadosnet', {nome: dados})
    res.render('index', {dadosApi: objeto.nome, download: objeto.download, upload: objeto.upload, 
      ping: objeto.ping, ip: objeto.ip, operadora: objeto.operadora   })
    //res.render('dadosnet', {nome: JSON.stringify(dadorecebido.download.bandwidth)})

   

    /*
    var download = (dadorecebido.download.bandwidth / 125000);
    var Upload = (dadorecebido.upload.bandwidth / 125000);
    download = parseFloat(download.toFixed(2))
    Upload = parseFloat(Upload.toFixed(2))
    
    var myJSON = JSON.stringify("ISP: " + dadorecebido.isp + 
    " LATENCIA: " + dadorecebido.ping.latency +
    " download: " + download + "  " + dadorecebido.download.bandwidth +
    " Upload: " + Upload +"  " + dadorecebido.upload.bandwidth);

    res.send(myJSON); */

  })
});



/* // FUNCIONANDO ULTIMA ATUALIZAÇÂO
app.post('/add', function(req, res) {
  var dados = TesteApi()
  dados.then(dadorecebido => {
    console.log(dadorecebido)

    var download = (dadorecebido.download.bandwidth / 125000);
    var Upload = (dadorecebido.upload.bandwidth / 125000);
    download = parseFloat(download.toFixed(2))
    Upload = parseFloat(Upload.toFixed(2))
    
    var myJSON = JSON.stringify("ISP: " + dadorecebido.isp + 
    " LATENCIA: " + dadorecebido.ping.latency +
    " download: " + download + "  " + dadorecebido.download.bandwidth +
    " Upload: " + Upload +"  " + dadorecebido.upload.bandwidth);

    res.send(myJSON);

  })
});
*/

/*
app.post('/add', function(req, res) {
  var dados = SpeedAPI()
  dados.then(dadorecebido => {
    console.log(dadorecebido.download)
    var myJSON = JSON.stringify(dadorecebido);
    res.send(myJSON);
    //res.send("CHEGOU ALGO "+dadorecebido);
    //res.send(dadorecebido);
    //res.send("Texto " + req.body.titulo+ " Conteudo: "+ req.body.conteudo + dadorecebido)
  })

  

  
  
  
  //res.render("Texto " + req.body.titulo+ " Conteudo: "+ req.body.conteudo)
});*/


app.listen(3000, function() {
  console.log("Server Rodando na URL http://localhost:3000");
});

const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const SpeedAPI = require("./service/SpeedAPI")
const TesteApi = require("./service/TesteApi")
const path = require("path")




// importando a biblioteca de api do telegram 
const TelegramBot = require('node-telegram-bot-api');
// importando nosso arquivo que faz a chamada para o dialogflow
const dialogflow = require('./dialogflow');
// Importando a biblioteca de e-mail
const nodemailer = require('nodemailer');
// token recebido pelo bot father
const token = '1075673220:AAETXV8pVvu0l6Zwizb2MFJy4MFIZ-G9pyw';
// nova instância do telegram
const bot = new TelegramBot(token, { polling: true });

// escuta mensagens enviadas pelos usuários
bot.on('message', async (msg) => {
    
    // id do chat do usuário
    const chatId = msg.chat.id;
    // resposta do dialogflow
    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);
    // texto a partir da resposta do dialogflow
    let textResponse = dfResponse.text;
    
    // -------------------- INICIO funcaoAnonima --------------------------------------------------
    if (dfResponse.intent === 'funcaoAnonima' && dfResponse.fields.navegadores.stringValue != '') {
 
        if (dfResponse.fields.navegadores.stringValue === 'Internet Explorer') {
            textResponse = 
`No Internet Explorer (ou Microsoft Edge), para acessar a navegação privada, clique no ícone ... no canto superior direito e em seguida cliquem em Nova janela InPrivate.
Se preferir use as teclas de atalho Ctrl+Shift+N.
Ao habilitar a navegação privada, a janela do navegador terá o aspecto escuro. Verifique se a informação InPrivate é exibida no canto superior direito da tela.`
        }

        if (dfResponse.fields.navegadores.stringValue === 'Google Chrome') {
            textResponse = 
`No Google Chrome, para acessar a navegação privada, clique no ícone ... (na vertical_ no canto superior direito e em seguida cliquem em Nova janela anônima.
Se preferir use as teclas de atalho Ctrl+Shift+N.
Ao habilitar a navegação privada, a janela do navegador terá o aspecto escuro. Verifique se a informação Anônima é exibida no canto superior direito da tela e no centro da tela também.`
        }

        if (dfResponse.fields.navegadores.stringValue === 'Mozilla Firefox') {
            textResponse = 
`No Mozilla Firefox, para acessar a navegação privada, clique no ícone no canto superior direito e em seguida cliquem em Nova janela privativa. Se preferir use as teclas de atalho Ctrl+Shift+P.
Ao habilitar a navegação privada, a janela do navegador terá o aspecto escuro. Verifique se a informação Navegação privativa é exibida no canto superior direito e esquerdo da tela, e também na parte central da tela.
`
        }

        if (dfResponse.fields.navegadores.stringValue === 'Opera') {
            textResponse = 
`No Opera, para acessar a navegação privada, clique no ícone O no canto superior esquerdo e em seguida cliquem em Nova janela privada. Se preferir use as teclas de atalho Ctrl+Shift+N.
Ao habilitar a navegação privada, a janela do navegador terá o aspecto cinza com barra na cor roxo.
Verifique se a informação Navegação privada é exibida no canto superior esquerdo da tela e também na parte central da tela.
`
        }

        if (dfResponse.fields.navegadores.stringValue === 'safari') {
            textResponse = 
`No Safari, para acessar a navegação privada, clique no ícone da engrenagem no canto superior direito e em seguida cliquem em Navegação Privada.
Ao habilitar a navegação privada, a janela do navegador terá o aspecto cinza com uma barra escura.
Verifique se a informação Privado é exibida na barra onde se digita o endereço do site e também ao clicar na engrenagem no canto superior direito da tela.
`
        }
 
 
         console.log(' 1 '+dfResponse.intent)
         console.log(' 2 '+dfResponse.fields.navegadores.stringValue)  
        
     }  //--------------  FIM funcaoAnonima ----------------------------------------

      // -------------------- INICIO funcaoAnonima --------------------------------------------------
    if (dfResponse.intent === 'abrirChamado') {

       var nome =  dfResponse.fields.nome.stringValue;
       var setorAtendimento = dfResponse.fields.setorAtendimento.stringValue;
       var problema = dfResponse.fields.problema.stringValue;

       console.log('Nome: '+ nome);
       if (nome != '') {
        console.log(msg.text)
        var MessagemUserNome = msg.text;
       }
       
       console.log('setorAtendimento: '+ setorAtendimento);
       if (setorAtendimento != '') {
        console.log(msg.text)
        var MessagemUsersetorAtendimento = msg.text;
       }
       
       console.log('problema: '+ problema);
       if (problema != '') {
        console.log(msg.text)
        var MessagemUserproblema = msg.text;
       }
      
        if(problema != '' && msg.text != '') {
            var transporte = nodemailer.createTransport({
                service: 'Outlook',
                secure: false,
                auth: {
                    user:'servicedeskunisales@outlook.com',
                    pass:'@ServiceDesk'
                }
            });
    
            let mailOptions = {
                from:'servicedeskunisales@outlook.com',  // ENVIO DE MENSAGEM
                to: 'servicedeskunisales@outlook.com',                   // QUEM RECEBE
                subject: "Chamado Aberto",            // ASSUNTO
                text : `Chamado aberto 
                Nome: ${MessagemUserNome}

                Entidade Setor ${setorAtendimento}
                Setor do atendimento completo: ${MessagemUsersetorAtendimento}

                Entidade Problema ${problema}
                Mensagem do problema completo: ${MessagemUserproblema}`,
                //html: '<b>This is bold text SERA QUE CHEGOU</b>',                // CONTEUDO E-MAIL
            }
    
            transporte.sendMail(mailOptions, function(err, data) {
                if(err) {
                    console.log('ERRO ', err);
                } else {
                    console.log('Email Enviado')
                }     
            });
        }  
    }
    // envio da mensagem para o usuário do telegram
    bot.sendMessage(chatId, textResponse);

});












































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

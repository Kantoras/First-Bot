require('dotenv').config()
const Telebot = require('telebot')
//Bot Installieren
/*
npm i
node ./Index.js

Alternative 
npm install -g nodemon
nodemon ./Index.js
*/

//DEFINIERUNG DES BOTS
const bot = new Telebot({
    token: process.env.bottoken,
    limit: 1000,
        usePlugins: ['commandButton']
});

//FUNKTION
bot.on('text', (msg) => {
    console.log(msg)
   if(msg.text.toLowerCase() ==='hallo'|| msg.text === 'hey'){
       msg.reply.text('Hi!')
   }
   if(msg.text.toLowerCase() ==='wie geht es dir'){
       let Zufall = getRandomInt(2)
       if(Zufall === 1){
        //Wenn Zufall = 0
        msg.reply.text(`Mir geht es gut, wie geht es ${msg.from.first_name}`)
       }else{
        //Wenn Zufall NICHT = 0
        msg.reply.text(`Ich liege im Sterben!, wie geht es ${msg.from.first_name}`)
       }
       
   }

});

//STARTBEFEHL (IMMER GANZ UNTEN)
bot.start()

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
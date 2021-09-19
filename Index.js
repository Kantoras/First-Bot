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
        usePlugins: ['commandButton', 'askUser']
});

let ZahlenStore = 'Leer';
let ZahlenCountStore = 0;
let Player1 = 0;
let Player2 = 0;

//FUNKTION
bot.on('text', (msg) => {
    console.log(msg)
   
    //Konversation mit dem Bot
   if(msg.text.toLowerCase() ==='help'){
       msg.reply.text('These Commands are ready to use!\n\nHey / Hi / Hallo    - - >    I reply with Hi!\nHow are you?    - - >    I reply how i am today.\nWhich time is it    - - >    I show you the time in realtime.\nmessage counter    - - >    Shows the total of messages that were send to / from this Bot')
    }
    
   if(msg.text.toLowerCase() ==='hallo'|| msg.text.toLowerCase() === 'hey'){
       msg.reply.text('Hi!')
   }
   if(msg.text.toLowerCase() ==='how are you?'){
       let random = getRandomInt(2)
       if(random === 1){
        //Wenn Zufall = 0
        msg.reply.text(`I´m good, how are you ${msg.from.first_name}?`)
       }else{
        //Wenn Zufall NICHT = 0
        msg.reply.text(`I´m near to dead, how are you ${msg.from.first_name}?`)
       }      
   }

   //Zeitabfrage
   const VarDate = new Date()
   if(msg.text.toLowerCase() === 'which time is it?'){
       msg.reply.text(`${VarDate.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}`)
   }
   
   //Message Counter
   if(msg.text.toLowerCase() === ('message counter')){
       msg.reply.text(`${msg.message_id}`)
   }

   //Minispiele
   if(msg.text.toLowerCase() === ('features')){
    let replyMarkup = bot.inlineKeyboard([                                                                                  //-----Button Function 
        [                                                                                 
            bot.inlineButton("Zahl erraten", {callback: '/ZahlErraten'})
        ],[                                                                                 
            bot.inlineButton("Batman Cosplay", {callback: '/BatmanPicture'}),
        ],[    //Wenn Knöpfe nebeneinander dann diese Zeile löschen
            bot.inlineButton("Tic Tac Toe", {callback: '/TicTacToe'})
        ],[
            bot.inlineButton("Test 3",{callback: '/Test 3'})
        ]
    ])                                                                                    
       bot.sendMessage(msg.chat.id, 'Was möchtest du machen?', { replyMarkup }) 
   }                                                                                      
});

//Zahlen erraten Code

bot.on(/^\/ZahlErraten/i, (msg) => {
    console.log("Knopf wurde gedrückt")
    console.log(msg)
    const x = getRandomInt(101)
    if(ZahlenStore !== 'Leer'){
        bot.sendMessage(msg.message.chat.id, 'Leider sucht ein anderer Spieler aktuell eine Zahl, bitte warte.')
    }else{
        ZahlenStore = x                                                                                                     //Zahl wird in Globaler Variable bis zum Ende der Runde gespeichert
        bot.sendMessage(msg.message.chat.id, 'Schreibe deine Vermutung?', {ask:'ZahlErraten'});
    }
});

bot.on('ask.ZahlErraten', msg => {
    if(isNaN(msg.text)) {                                                                                                   //Is Not A Number (isNaN)
        bot.sendMessage(msg.chat.id, 'Deine Eingabe ist keine Zahl.', {ask:'ZahlErraten'});
    }else{
        let ZahlErraten = Number(msg.text)
        if(ZahlErraten > 100 || ZahlErraten < 0){
            ZahlenCountStore++
            msg.reply.text('Die Zahl ist größer/kleiner als das Limit!\nVersuche Zahlen im Berich von 0-100.', {ask: 'ZahlErraten'})

        }else if(ZahlErraten < ZahlenStore){
            ZahlenCountStore++
            bot.sendMessage(msg.chat.id, 'Die gesuchte Zahl ist größer.', {ask:'ZahlErraten'});

        }else if(ZahlErraten === ZahlenStore){
            msg.reply.text(`Du hast die gesuchte Zahl erraten.\nDu hast ${ZahlenCountStore} Versuche gebraucht`)
            ZahlenStore = 'Leer'
            ZahlenCountStore = 0
        }else if(ZahlErraten > ZahlenStore){
            ZahlenCountStore++
            bot.sendMessage(msg.chat.id, 'Die gesuchte Zahl ist kleiner.', {ask:'ZahlErraten'});
        }
    }
});

//Batman Picture Code

bot.on(/^\/BatmanPicture/i, (msg) => {
    console.log("Testknopf was pressed")
    console.log(msg)
        bot.sendPhoto(msg.message.chat.id, 'https://i.pinimg.com/originals/d6/d1/d1/d6d1d15676bd93708792180be99256f9.jpg')
});

//TicTacToe Code
bot.on(/^\/TicTacToe/i, (msg) => {
    console.log("Tic Tac Toe was pressed")
    console.log(msg)        
    let replyMarkup = bot.inlineKeyboard([
        [                                                                                 
            bot.inlineButton("Player 1  =  X", {callback: '/Player 1'})
        ],[                                                                                 
            bot.inlineButton("Player 2  =  O", {callback: '/Player 2'}),
        ]
    ])
    bot.sendMessage(msg.message.chat.id, 'Which Player you want to play', {replyMarkup})
});


bot.on(/^\/Player 1/i, (msg) => {          //(Checken ob ID für jeweilige rolle vergeben ist)
    console.log("Player 1 was pressed")
    console.log(msg)
    if(Player1 === 0){
        Player1 = msg.from.id
        let PlayerName = msg.from.username || `${msg.from.first_name} ${msg.from.last_name}`
        bot.sendMessage(msg.message.chat.id, `${PlayerName} is Player 1`)
    }else{
        bot.sendMessage(msg.message.chat.id, `Player 1 is already taken!`)
    }
    
    if(Players_Ready){
        
    }
});

bot.on(/^\/Player 2/i, (msg) => {
    console.log("Player 2 was pressed")
    console.log(msg)
    if(Player2 === 0){
        Player2 = msg.from.id
        let PlayerName = msg.from.username || `${msg.from.first_name} ${msg.from.last_name}`
        bot.sendMessage(msg.message.chat.id, `${PlayerName} is Player 2`)
    }else{
        bot.sendMessage(msg.message.chat.id, `Player 2 is already taken!`)
    }
    
    if(Players_Ready){
        
    }
});

//PC Specs Code
bot.on(/^\/Test 3/i, (msg) => {
    console.log("PC Specs wurde gedückt")
    console.log(msg)
        bot.sendMessage(msg.message.chat.id, 'Test 3')
});

bot.on('callbackQuery', (msg) => {
	if ('inline_message_id' in msg) {	
		var inlineId = msg.inline_message_id;
	}else{
		var chatId = msg.message.chat.id;
		var messageId = msg.message.message_id;
	}

	var data = msg.data.split("_")
    
    if(data[0]) === "TTT"){
    //Run code for TicTacToe here
    }
});

//STARTBEFEHL (IMMER GANZ UNTEN)
bot.start()

function Players_Ready() {
    if(Player1 !== 0 && Player2 !== 0) return true
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

function create_playboard(msg) {
    //Get the random starting Player
    let StartPlayer = getRandomInt(1)

    //Generate Playboard
    let replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton("‎" , {callback: `TTT_P_1_1_${StartPlayer}_${Player1}_${Player2}`}),
            bot.inlineButton("‎" , {callback: `TTT_P_1_2_${StartPlayer}_${Player1}_${Player2}`}),
            bot.inlineButton("‎" , {callback: `TTT_P_1_3_${StartPlayer}_${Player1}_${Player2}`})
        ],
        [
            bot.inlineButton("‎" , {callback: `TTT_P_2_1}_${StartPlayer}_${Player1}_${Player2}`}),
            bot.inlineButton("‎" , {callback: `TTT_P_2_2}_${StartPlayer}_${Player1}_${Player2}`}),
            bot.inlineButton("‎" , {callback: `TTT_P_2_3}_${StartPlayer}_${Player1}_${Player2}`})
        ],
        [
            bot.inlineButton("‎" , {callback: `TTT_P_3_1_${StartPlayer}_${Player1}_${Player2}`}),
            bot.inlineButton("‎" , {callback: `TTT_P_3_2_${StartPlayer}_${Player1}_${Player2}`}),
            bot.inlineButton("‎" , {callback: `TTT_P_3_3_${StartPlayer}_${Player1}_${Player2}`})
        ]
    ]);
    //Reset Players
    Player1 = 0;
    Player2 = 0;
    
    //Send Message with Playboard
    bot.sendMessage(msg.chat.id, `Spielfläche:\nEs beginnt Spieler${StartPlayer}`, { replyMarkup }) 
}

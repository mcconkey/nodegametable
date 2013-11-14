var express = require('express');
var sio = require('socket.io');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var logger = require('./logger.js');
var player = require('./player.js');
var cardDeckLib = require('./static/cards/card.js');

var playerCol = [];
var seatCol = [];
var cardDeck = new require('./static/cards/card.js').CardDeck();
var deck = cardDeck.BuildDeck();

function testDeck(deck){

    console.log('========================');
    console.log("Here's what's in the deck:");
    console.log('========================');
    console.log(deck);
    var count;
    //for(var i; deck.CardsInDeck[i]; i++){
    //    console.log('card');
    //}
    //console.log(count);

}
testDeck(deck);


var cardCol = cardDeck.CardsInPlay;
var cardsOnTableCol = [];

server.listen(8080);

app.use(express.static('./static'));
app.use(express.bodyParser());

io.sockets.on('connection', function (socket) {

    logger.log('New Client ' + socket.id + ' has connected');
    socket.emit('syncSession', { message: 'Welcome to the game.', players: playerCol });

    socket.on('sitDown', function (data) {
        var newPlayer = new require('./player.js').Player(this.id, data.playerName, ReturnRandomColor());
        seatCol = newPlayer.SeatPlayer(seatCol);
        playerCol.push({ playerId: newPlayer.playerId, playerName: newPlayer.playerName, playerColor: newPlayer.playerColor, playerSeat: newPlayer.playerSeat });
        logger.log('NEW SEATED PLAYER', playerCol[playerCol.length - 1].playerName + ' sat down in seat ' + newPlayer.playerSeat + '(' + seatCol.length + ')');
        //io.sockets.emit('syncSession', { message: 'Player' + newPlayer.playerName + ' connected.', players: playerCol });
        io.sockets.emit('newPlayer', { player: newPlayer });
        newPlayer = {};
        //io.sockets.emit('newPlayer', { player: playerCol[playerCol.length - 1] });

        var cardObj = {};
        if (cardCol.length > 0) {
            logger.log('Drawing a card...');
            cardObj = cardDeck.GetCard();
            cardsOnTableCol.push(cardObj);
            logger.log('Drew a ' + cardObj.face + ' of ' + cardObj.suite.name + '!');
        }
        //io.sockets.emit('newCardPlayedOnTable', { cardCol: cardCol, cardsOnTableCol: cardsOnTableCol, newCard: cardObj });

    });

    socket.on('spawnCardRequest', function (data) {
        var cardObj = {};
        logger.log('Cards In Play: ' + cardDeck.CardsInPlay.length + ', max cards playable: ' + cardDeck.maxCardsPlayable + '...Drawing a card...');
        if (cardDeck.CardsInPlay.length != cardDeck.maxCardsPlayable) {
            cardObj = cardDeck.GetCard();
            cardsOnTableCol.push(cardObj);
            logger.log('Drew a ' + cardObj.face + ' of ' + cardObj.suite.name + '!');
            io.sockets.emit('newCardPlayedOnTable', { cardCol: cardCol, cardsOnTableCol: cardsOnTableCol, newCard: cardObj });
        } else {
            logger.log('No cards left to play!...');
        }
    });

    socket.on('getUp', function (data) {
        for (var x = playerCol.length - 1; x >= 0; x--) {
            if (playerCol[x].playerId == this.id) {
                var dropId = this.id;
                playerCol.splice(x, 1);
            }
        }
        io.sockets.emit('dropPlayer', { message: data.playerName + ' has left the Session.', dropId: dropId });
        //io.sockets.emit('syncSession', { message: data.playerName + ' has left the Session.', players: playerCol });
    });
});

function SitPlayer(playerId) {

    SeatCol.push(playerId);
    return SeatCol.length;

}


function SendCardsToPlayer(){

    var cardCol = [];

    return cardCol;
}

function ReturnRandomColor() {
    var colors = [{
        "hex": "#B4674D",
        "name": "Brown",
        "rgb": "(180, 103, 77)"
    },
    {
        "hex": "#FF7F49",
        "name": "Burnt Orange",
        "rgb": "(255, 127, 73)"
    },
{
    "hex": "#EA7E5D",
    "name": "Burnt Sienna",
    "rgb": "(234, 126, 93)"
},
{
    "hex": "#B0B7C6",
    "name": "Cadet Blue",
    "rgb": "(176, 183, 198)"
},
{
    "hex": "#FFFF99",
    "name": "Canary",
    "rgb": "(255, 255, 153)"
},
{
    "hex": "#1CD3A2",
    "name": "Caribbean Green",
    "rgb": "(28, 211, 162)"
},
{
    "hex": "#FFAACC",
    "name": "Carnation Pink",
    "rgb": "(255, 170, 204)"
},
{
    "hex": "#DD4492",
    "name": "Cerise",
    "rgb": "(221, 68, 146)"
},
{
    "hex": "#1DACD6",
    "name": "Cerulean",
    "rgb": "(29, 172, 214)"
}];
    return colors[Math.floor(Math.random() * colors.length)].hex;
}


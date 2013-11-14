//var Kinetic = require('../kinetic-v4.7.4.min.js');

var CardDeck = function (){
    this.CardsInDeck = [];

    return this;
};

CardDeck.prototype.PutCardInDeck = function (cardObj) {
    //code to put a card at the bottom of the deck
    this.CardsInDeck.push(cardObj);
};

CardDeck.prototype.RemoveCardFromDeck = function (cardSuite, cardFace) {
    var cardInd = this.CardsInDeck.indexOf({ suite: cardSuite, face: cardFace });
    this.CardsInDeck.push(cardInd, 1);
};

CardDeck.prototype.DrawTopCard = function(){
    //take a card from the top of the deck and then remove it from the deck
   return this.CardsInDeck.pop();
};

CardDeck.prototype.PutCardInDeck = function (cardSuite, cardFace) {
    this.CardsInPlay.push({ suite: cardSuite, face: cardFace });
};

CardDeck.prototype.RemoveCardInPlay = function (cardSuite, cardFace) {
    if (this.CardsInPlay.length > 0) {
        for (var x in this.CardsInPlay) {
            if (this.CardsInPlay[x].suite == cardSuite &&
                this.CardsInPlay[x].face == cardFace) {
                this.CardsInPlay.splice(x, 1);
            }
        }
    }
    this.CardsInPlay.push({ suite: cardSuite, face: cardFace });
};

CardDeck.prototype.GetCard = function () {

    var theCard = {};
    var cardFace = CardFaceValue[Math.floor((Math.random() * 9))];
    var cardSuite = CardSuiteCol[Math.floor((Math.random() * 4))];
    var cardInPlay = false;

    for (var x in this.CardsInPlay) {
        if (this.CardsInPlay[x].suite == cardSuite &&
            this.CardsInPlay[x].face == cardFace) {
            cardInPlay = true;
            continue;
        }
    }

    if (!cardInPlay) {
        //theCard = this.Deck[0];
        theCard = { suite: cardSuite, face: cardFace };
        this.PutCardInPlay(cardSuite, cardFace);
        //this.RemoveCardFromDeck(this.Deck[0].suite, this.Deck[0].face);
    }

    return theCard;

};


 CardSuiteCol = [
    {
        name: 'Hearts',
        color: 'Red'
    },
    {
        name: 'Diamonds',
        color: 'Red'
    },
    {
        name: 'Clubs',
        color: 'black'
    },
    {
        name: 'Spades',
        color: 'black'
    }
];

 CardFaceValue = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];


CardDeck.prototype.BuildDeck = function () {

    for(var i =  0; i < CardFaceValue.length; i++){
        for(var j= 0; j < CardSuiteCol.length; j++){
            var objCard =  new Card();
            objCard.init(CardFaceValue[i], CardSuiteCol[j]);
            this.CardsInDeck.push(objCard);
       }
    }

    return this;
};

CardDeck.prototype.Shuffle = function (){
    if(this.CardsInDeck.length > 0){
         this.CardsInDeck = shuffle(this.CardsInDeck);
    }else{
      console.log(this);
    }
    return this;
};

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var Card = function () {
    //card stuff
    this.suite = '';
    this.face = '';
    return this;

};

Card.prototype.init = function (face, suite){
    this.suite = suite;
    this.face = face;
    return this;
};

Card.prototype.flipCard = function(){

};


exports.CardDeck = CardDeck;
exports.BuildDeck = CardDeck.prototype.BuildDeck;
exports.Shuffle = CardDeck.prototype.Shuffle;
exports.CardsInDeck = CardDeck.CardsInDeck;
exports.DrawTopCard = CardDeck.prototype.DrawTopCard;

exports.RemoveCardFromDeck = CardDeck.prototype.RemoveCardFromDeck;
exports.GetCard = CardDeck.prototype.GetCard;
exports.PutCardInPlay = CardDeck.prototype.PutCardInPlay;
exports.RemoveCardInPlay = CardDeck.prototype.RemoveCardInPlay;


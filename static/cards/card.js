//var Kinetic = require('../kinetic-v4.7.4.min.js');

var CardDeck = function (){
    this.CardsInDeck = [];

    return this;
};

CardDeck.prototype.PutCardInDeck = function (cardSuite, cardFace) {
    //code to put a card at the bottom of the deck
    this.CardsInDeck.push({ suite: cardSuite, face: cardFace });
};

CardDeck.prototype.RemoveCardFromDeck = function (cardSuite, cardFace) {
    var cardInd = this.CardsInDeck.indexOf({ suite: cardSuite, face: cardFace });
    this.CardsInDeck.push(cardInd, 1);
};

CardDeck.prototype.TakeTopCard = function(){
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
        name: 'Hearts'
    },
    {
        name: 'Diamonds'
    },
    {
        name: 'Clubs'
    },
    {
        name: 'Spades'
    }
];

 CardFaceValue = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];


CardDeck.prototype.BuildDeck = function () {
    var some_r;


    for(var i =  0; i < CardFaceValue.length; i++){
        for(var j= 0; j < CardSuiteCol.length; j++){
            var objCard =  new Card();
            objCard.init(CardFaceValue[i], CardSuiteCol[j].name);
            this.CardsInDeck.push(objCard);
       }
    }
  // this.CardsInDeck = CardFaceValue.length;
    return this;
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

exports.RemoveCardFromDeck = CardDeck.prototype.RemoveCardFromDeck;
exports.GetCard = CardDeck.prototype.GetCard;
exports.PutCardInPlay = CardDeck.prototype.PutCardInPlay;
exports.RemoveCardInPlay = CardDeck.prototype.RemoveCardInPlay;


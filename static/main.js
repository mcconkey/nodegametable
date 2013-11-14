var socket = io.connect();
var playerCol = [];
var gameBoardLayerCol = [];
var gameBoard = {};
var imageCol = [];
var cardCol = [];
var cardsOnTableCol = [];
var cardsInHandCol = [];

//images
var imgHeart = new Image();
imgHeart.src = './cards/heart.PNG';
var imgDiamond = new Image();
imgDiamond.src = './cards/diamond.PNG';
var imgClub = new Image();
imgClub.src = './cards/club.PNG';
var imgSpade = new Image();
imgSpade.src = './cards/spade.PNG';

socket.on('syncSession', function (data) {
    //alert(data.player.playerName + ' Connected!');
    playerCol = [];
    playerCol = data.players;

    //UpdateGameBoard();

    EstablishExistingData();
    for (var x in playerCol) {
        if (playerCol[x].playerId == this.socket.sessionid) {
            $('#playerBoard').css('background-color', playerCol[x].playerColor);
        }
    }
});

socket.on('newCardPlayedOnTable', function (data) {

    cardCol = data.cardCol;
    cardsOnTableCol = data.cardsOnTableCol;

    DrawCardOnTable(data.newCard);
});

socket.on('dropPlayer', function (data) {
    var dropId = data.dropId;

    for (var x in playerCol) {
        if (playerCol[x].playerId == dropId) {
            playerCol.splice(x, 1);
            RemovePlayerCard(dropId);
        }
    }
});

socket.on('newPlayer', function (data) {
    playerCol.push(data.player);
    CreatePlayerCard(data.player);
});
function RemovePlayerCard(dropId) {
    for(var x in gameBoardLayerCol){
        if (gameBoardLayerCol[x].attrs.id == 'pl_' + dropId + '_card') {
            gameBoardLayerCol.splice(x, 1);
            gameBoard.find('#' + 'pl_' + dropId + '_card').destroy();
        }
    }
}

function CreatePlayerCard(player) {

    var layer = new Kinetic.Layer({
        draggable: true,
        id: 'pl_'+player.playerId+'_card'
    });

    var rect = new Kinetic.Rect({
        x: 300,
        y: 200,
        width: 100,
        height: 50,
        fill: player.playerColor,
        stroke: 'black',
        strokeWidth: 2
    });

    var nameText = new Kinetic.Text({
        x: 320,
        y: (200) + 10,
        text: player.playerName,
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'black'
    });
    layer.add(rect);
    layer.add(nameText);

    //layer.on('mouseup touchend', function () {
    //});

    gameBoardLayerCol.push(layer);
    gameBoard.add(layer);
}

$(document).ready(function () {

    $('#btnSpawnCards').on('click', function () {
        socket.emit('spawnCardRequest', { playerId: socket.sessionid });
    });

    $('#btnPlayerConnect').on('click', function () {
        socket.emit('sitDown', { playerName: $('#txtPlayerName').val() });
        $('#btnPlayerConnect').attr('disabled', 'disabled');
        $('#btnDisconnect').attr('disabled', false);
    });
    $('#btnDisconnect').on('click', function () {
        socket.emit('getUp', { playerId: socket.sessionid });
        $('#btnPlayerConnect').attr('enabled', true);
        $(this).attr('disabled', 'disabled');
        $('#btnPlayerConnect').attr('disabled', false);
    });

    $(window).unload(function () {
        socket.emit('getUp', { playerId: socket.sessionid });
    });

    $('#playerBoard').hide();

    $('#btnToggleScreen').click(function () {
        if ($('#ViewMode').text() == 'Viewing Game Board') {
            $('#gameBoard').hide();
            $('#playerBoard').show();
            $('#ViewMode').text('Viewing Player Board');
        }else{
            $('#playerBoard').hide();
            $('#gameBoard').show();
            $('#ViewMode').text('Viewing Game Board');
        }
    });

    gameBoard = new Kinetic.Stage({
        container: 'gameBoard',
        width: screen.width,
        height: screen.height
    });
});

function EstablishExistingData() {

    for (var x in playerCol) {
        CreatePlayerCard(playerCol[x]);
    }
}

function DrawCardOnTable(obj) {

    var imgSrc = '';
    var cardColor = '';
    switch (obj.suite.name) {
        case 'Hearts':
            imgSrc = imgHeart;
            cardColor = 'red';
            break;
        case 'Diamonds':
            imgSrc = imgDiamond;
            cardColor = 'red';
            break;
        case 'Clubs':
            imgSrc = imgClub;
            cardColor = 'black';
            break;
        case 'Spades': imgSpade;
            cardColor = 'black';
            break;
    }

    var cardLayer = new Kinetic.Layer({
        draggable: true,
        id: 'card_' + obj.suite.name + '_' + obj.face + '_card'
    });

    var cardRect = new Kinetic.Rect({
        x: 350,
        y: 350,
        width: 150,
        height: 220,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 5
    });

    var cardImage = new Kinetic.Image({
        x: cardRect.attrs.x + 10,
        y: cardRect.attrs.y + 10,
        image: imgSrc,
        width: 64,
        height: 64
    });

    var cardText = new Kinetic.Text({
        x: cardRect.attrs.x + (cardRect.attrs.width / 2),
        y: cardRect.attrs.y + (cardRect.attrs.height / 2),
        text: obj.face,
        fontSize: 80,
        fontFamily: 'Calibri',
        fill: 'black'
    });

    cardLayer.add(cardRect);
    cardLayer.add(cardImage);
    cardLayer.add(cardText);

    gameBoard.add(cardLayer);

}
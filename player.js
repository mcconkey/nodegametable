var Player = function (sId, sName, sColor) {
    this.playerId = sId;
    this.playerName = sName;
    this.playerColor = sColor;
    this.playerSeat = -1;

    return this;
}

Player.prototype.SeatPlayer = function (seatCol){
    seatCol.push(this.playerId);
    this.playerSeat = seatCol.length;
    return seatCol;
}

exports.Player = Player;
exports.SeatPlayer = Player.prototype.SeatPlayer;
function ChutesNLadderAutoplayer(settings) {
  var defaults = { players: 1 };
  var settings = settings || defaults;
  var self = this;
  var board = [];
  createBoard();
  var players = settings.players;
  
  this.reset = function() { 
    self.state = {
      turn: 0,
      players: []
    };

    for(var i = 0; i<players; i++) {
      self.state.players[i] = { space: 0, rolls: [] };
    }
  };
  this.reset();

  this.turn = function(times) {
    self.state.turn++;
    for(var i = 0; i<players; i++) {
      var finished = self.advance(i);
      if(finished) {
        return false;
      }
    }
    return true;
  };

  this.advance = function(player) {
    var state = self.state.players[player];
    var currentSpace = state.space;
    var roll = self.roll();
    state.rolls.push(roll);
    var newSpace = currentSpace + roll;
    var finalSpace = board[newSpace] || newSpace;
    self.state.players[player].space = finalSpace;

    if(finalSpace >= 100) {
      self.win(player);
      return true;
    }

    return false;
  };

  this.roll = function() {
    return Math.ceil(Math.random() * 6);
  };

  this.win = function(player) {
    self.state.winner = player;
  }

  this.playToWin = function() {
    while(self.turn());
    //console.log("Player " + self.state.winner + " won in " + self.state.turn + " turns.");
    return self.state;
  }

  this.findFastestWayToWin = function(times) {
    var lowest = {turn: Infinity};
    for(var i = 0; i < times; i++) {
      self.reset();
      var state = this.playToWin();
      if(state.turn < lowest.turn) {
        lowest = state;
      }
    }
    return lowest;
  };

  function createBoard() {
    board = new Array(101);
    board[1] = 38;
    board[4] = 14;
    board[9] = 31;
    board[16] = 6;
    board[21] = 42;
    board[28] = 84;
    board[36] = 44;
    board[48] = 26;
    board[49] = 11;
    board[51] = 67;
    board[56] = 53;
    board[62] = 19;
    board[64] = 60;
    board[71] = 91;
    board[80] = 100;
    board[87] = 24;
    board[93] = 73;
    board[95] = 75;
    board[98] = 78;
  };

};

module.exports = ChutesNLadderAutoplayer;

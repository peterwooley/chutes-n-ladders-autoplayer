var ChutesNLaddersAutoplayer = require('../lib/ChutesNLaddersAutoplayer');

describe('Chutes n\' Ladders Autoplayer', function() {
  var autoplayer = null;

  beforeEach(function() {
    autoplayer = new ChutesNLaddersAutoplayer();
  });

  it('exists', function () {
    expect(ChutesNLaddersAutoplayer).not.toBe(undefined);
  });

  it('can be reset', function() {
    var autoplayer = new ChutesNLaddersAutoplayer();
    autoplayer.reset();
    expect(autoplayer.state.turn).toEqual(0);
  });

  it('can roll between 1 and 6', function() {
    var autoplayer = new ChutesNLaddersAutoplayer();
    var roll =  autoplayer.roll();
    expect(roll).toBeGreaterThan(0);
    expect(roll).toBeLessThan(7);
    expect(roll).toEqual(parseInt(roll));
  });

  it('can advance a player', function() {
    autoplayer.advance(0);
    expect(autoplayer.state.players[0].space).toBeGreaterThan(0);
    expect(autoplayer.state.players[0].space).toBeLessThan(39);
  });

  it('can advance a turn', function() {
    autoplayer.turn();
    expect(autoplayer.state.turn).toEqual(1);
    expect(autoplayer.state.players[0].space).toBeGreaterThan(0);
  });

  it('can play to win', function() {
    autoplayer.playToWin();
  });

  it('can play to win with 4 players', function() {
    var autoplayer = new ChutesNLaddersAutoplayer({players: 4});
    autoplayer.playToWin();
  });

  it('can play a game thousands of times and tell you the fastest win', function() {
    var fastest = autoplayer.findFastestWayToWin(1000000);
    expect(fastest.turn).toBeGreaterThan(1);
    expect(fastest.turn).toBeLessThan(100);
    console.log(fastest.turn, fastest.players[0].rolls);
  });

});

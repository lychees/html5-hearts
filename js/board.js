define(["Card", "jquery", "layout"],
function(Card,  $,         layout){

    var cards = [];

    for (var i=0;i<4;++i) {
        var c = String.fromCharCode(65+i);
        for (var j=1;j<=4;++j) {
            cards.push(new Card(c+j));
            cards.push(new Card(c+j));
        }
    }


    for(var i = 1; i <= 6; i++){
        cards.push(new Card('+'+i));
        cards.push(new Card('+'+i));
        cards.push(new Card('-'+i));
    }
    cards.push(new Card('#'));
    cards.push(new Card('#'));
    
    var carddeck = [];
    for(i = 0; i < cards.length; i++) {
        carddeck.push(i);
    }

    return {
        cards: cards,
        init: function(){
            this.desk.cards.length = 0;
            this.desk.players.length = 0;
            var self = this;
            this.cards.forEach(function(c){
                c.parent = self;
                c.display.setSelectable(false);
            });
        },
        shuffleDeck: function(){
            var n = cards.length, i;
            
            for(i = 0; i < n; i++){
                var ran = Math.floor(Math.random() * (n - i));
                var tmp = carddeck[ran];
                carddeck[ran] = carddeck[n-1-i];
                carddeck[n-1-i] = tmp;
            }

            for(i = n-1; i >= 0; i--){
                this.cards[carddeck[i]].ind = carddeck[i];
                //this.cards[carddeck[i]].adjustPos();
                //console.log($('div.heap').offset().top);
                this.cards[carddeck[i]].display.adjustPos({
                    x: $('div.heap').offset().left - 100,
                    y: $('div.heap').offset().top - 50,
                    rotation: 0,
                    rotateY: 0,
                    z:-i
                });
                this.cards[carddeck[i]].display.dom.addClass('heap');
            }
        },
        distribute: function(players){
          //  return;
            var curI = 0, curO = 0;
            var d = $.Deferred();
            function move(){
                if(curI === cards.length){
                    setTimeout(function(){
                        d.resolve();
                    }, 200);
                    return;
                }
                //var t =
                //cards[carddeck[curI]].display.dom;
                //this.cards[carddeck[i]].display.dom.removeClass('heap');
                //console.log(cards[carddeck[curI]].display.dom.remove);
                //t.parentNode.removeChild(t);


                //console.log(cards[carddeck[curI]]);

                var t = cards[carddeck[curI]], o = -1;
                if (t.num[0] == 'A') o = 0;
                if (t.num[0] == 'B') o = 1;
                if (t.num[0] == 'C') o = 2;
                if (t.num[0] == 'D') o = 3;

                if (o == -1 && curO != 4){
                    o = curO++;
                }

                if (o != -1) {
                    //console.log(players[o]);
                    players[o].row.addCard(t);
                    players[o].row.adjustPos();
                }
                curI++;
                setTimeout(move, 10);
            }
            setTimeout(function(){move();}, 300);
            return d;
        },
        getPosFor: function(ind){
            return {
                x: (52 - ind) / 4,
                y: (52 - ind) / 4,
                z: -i,
                rotateY: 180
            };
        },
        desk: {
            cards: [],
            players: [],
            curScore: 0,
            getPosFor: function(ind){
                var pos = {
                    x: 0,
                    y: layout.cardHeight / 2 + layout.cardWidth / 2,
                    z: ind + 52,
                    rotateY: 0
                };
                pos.rotation = this.cards[ind].pos.rotation;
                return pos;
            },
            addCard: function(card, player){
                card.ind = this.cards.length;
                this.cards.push(card);
                this.players.push(player);
                card.parent = this;
            },
            adjustPos: function(){
                this.cards.forEach(function(c){
                    c.adjustPos();
                });
            },
            score: function(){
                var max = 0;
                for(var i = 1; i < 4; i++){
                    if(this.cards[i].suit === this.cards[max].suit && (this.cards[i].num > this.cards[max].num)){
                        max = i;
                    }
                }
                var p = this.players[max],
                    self = this;
                var nextTime = 600,
                    time = 800;
                if(window.isDebug){
                    nextTime = 0;
                    time = 0;
                }
                var info = [this.players[max], [].concat(this.cards)];
                this.players.length = 0;
                this.cards.length = 0;

                return info;
            }
        }
    };
});

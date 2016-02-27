define(["domBinding"],
function(domBinding){
    "use strict";

    var suits = ['spade', 'heart', 'club', 'diamond'];

    var Card = function(id){

        if (id[0] == '+'){
            this.suit = 0;
            this.num = id;
        }
        else if (id[0] == '-'){
            this.suit = 0;
            this.num = id;
        }
        else if (id == '#'){
            this.suit = 0;
            this.num = '▲';
        }
        else if (id[0] == 'A'){
            this.suit = 1;
            this.num = id;
        }
        else if (id[0] == 'B'){
            this.suit = 2;
            this.num = id;
        }
        else if (id[0] == 'C'){
            this.suit = 3;
            this.num = id;
        }
        else if (id[0] == 'D'){
            this.suit = 4;
            this.num = id;
        }


//        this.id = id;
  //      this.num = id % 13 + 1;
    //    this.suit = id % 4;
        this.flipped = true;

        var acutualNum = this.num;
        var numtext = acutualNum + '';
        /*if(acutualNum > 10){
            numtext = ({
                11: 'J',
                12: 'Q',
                13: 'K',
                14: 'A'
            })[acutualNum];
        }*/
        this.display = domBinding.createCardDisplay(numtext, this.suit);
        this.display.onClick = this.shift.bind(this);
     };

    Card.suits = suits;

    Card.prototype.adjustPos = function(noUpdate){
        if(!noUpdate) this.pos = this.parent.getPosFor(this.ind);
        this.display.adjustPos(this.pos);
    };

    Card.prototype.shift = function(){
        if(!this.display.isSelectable()) return;
        if(!this.parent.curShifted) return;
        if(this.parent.curShifted.indexOf(this) !== -1){
            this.parent.removeShift(this);
        }else{
            this.parent.addShift(this);
        }
    };

    Card.prototype.out = function(){
        this.display.out();
    };

    return Card;
});

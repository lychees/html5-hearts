define(function(){

    //var suits = ['spade', 'heart', 'club', 'diamond'];

    var suits = ['black', 'red', 'yellow', 'green', 'blue'];

    var frag, heap, board;


    var CardDisplay = function(dom){
        this.dom = $(dom);
        this.dom.on("click", function(){
            this.onClick && this.onClick();
        }.bind(this));
    };

    CardDisplay.prototype.adjustPos = function(pos){
        console.log(pos);
        this.dom.css({
            zIndex: 10 + pos.z,
            //positionX: pos.x,
            //positionY: pos.y,
            //transform: 'rotate(' + pos.rotation + 'deg) translate3d(' + pos.x + 'px, ' + pos.y + 'px, ' + pos.z + 'px) rotateY(' + pos.rotateY + 'deg)'
            transform: 'rotate(' + pos.rotation + 'deg) translate3d(' + pos.x + 'px, ' + pos.y + 'px, ' + pos.z + 'px)'
        });
    };

    CardDisplay.prototype.setSelectable = function(yes){
        if(yes){
            this.dom.addClass("movable");
        } else {
            this.dom.removeClass("movable");
        }
    };

    CardDisplay.prototype.isSelectable = function(){
        return this.dom.is(".movable");
    };


    var PlayerDisplay = function(id, name, human){

        this.id = id;
        this.display = document.createElement('div');
        this.display.className = 'info-board board-' + id;
        this.nametext = document.createElement('div');
        this.nametext.className = 'player-name';
        this.nametext.innerHTML = name;
        this.scoretext = document.createElement('div');
        this.scoretext.className = 'player-score';
        this.scoretext.innerHTML = 0;
        this.finaltext = document.createElement('div');
        this.finaltext.className = 'final-score';
        this.finaltext.innerHTML = 0;

        this.display.appendChild(this.nametext);
        this.display.appendChild(this.scoretext);
        this.display.appendChild(this.finaltext);

        frag.appendChild(this.display);

        this.rank = null;
    };

    PlayerDisplay.prototype.setName = function(name){
        this.nametext.innerHTML = name;
    };


    PlayerDisplay.prototype.setHuman = function(yes){
        if(yes){
            this.display.className += " human";
        }
    };

    PlayerDisplay.prototype.setHighlight = function(yes){
        if(yes){
            $(this.display).addClass("highlight");
        } else {
            $(this.display).removeClass("highlight");
        }
    };

    PlayerDisplay.prototype.adjustPos = function(){
        var d = $(this.display);
        if(this.rank === null){
            var adjust = this.finaltext.classList.contains("show") ? 55 : 0;
            this.finaltext.classList.remove('show');
            d.css({
                marginLeft: -d.width() / 2 + adjust,
                marginTop: -d.height() / 2,
                transform: "",
                top: "",
                left: ""
            }).removeClass("table");
        } else {
            this.finaltext.classList.add('show');
            d.css({
                top: this.moveUp ? "20%" : "50%",
                left: "50%",
                marginLeft: -d.width() / 2 - 55,
                marginTop: -d.height() / 2,
                transform: "translateY(" + ((1.2 * d.height()) * (this.rank - 2)) + "px)"
            }).addClass("table");
        }
    };

    PlayerDisplay.prototype.setScoreText = function(text){
        this.scoretext.innerHTML = text;
    };

    PlayerDisplay.prototype.setFinalText = function(text){
        this.finaltext.innerHTML = text;
    };

    PlayerDisplay.prototype.highlight = function(){
        var b = this.scoretext.classList;
        b.add('highlight');
        setTimeout(function(){
            b.remove('highlight');
        }, 100);
    };

    return {
        fragmentToDom: function(dom){
            if(board){
                dom.appendChild(board);
                dom.appendChild(frag);
                dom.appendChild(heap);
                board = null;
            }
        },

        createPlayerDisplay: function(id, name){
            return new PlayerDisplay(id, name);
        },

        createCardDisplay2: function(ch){

        },


        createCardDisplay: function(numtext, suit){

            if(!frag){
                frag = document.createDocumentFragment();
                heap = document.createElement('div');
                heap.className = 'heap';
            }

            if(!board){
                //frag = document.createDocumentFragment();
                board = document.createElement('div');
                board.className = 'board';

                for (var i=0;i<5;i++){
                    var row = document.createElement('div');
                    row.className = "row";
                    for (var j=0;j<6;++j){
                        var t = document.createElement('div');
                        t.className = "grid";
                        row.appendChild(t);
                    }
                    board.appendChild(row);
                }

            }

            var display = document.createElement('div');
            display.className = 'card';
/*            $(display).css({
                  transform: 'rotateY(30deg)',
                  transform: 'translate3d: (' + 100 + 'px, ' + 100 + 'px, ' + 1 + 'px)'
            });*/

            var numText = document.createElement('div');
            numText.className = 'num';
            numText.innerHTML = numtext;

            front = document.createElement('div');
            front.className = 'front';

            front.appendChild(numText);
            display.classList.add(suits[suit]);

/*
            var lv = document.createElement('div');
            lv.className = 'lv';
            for (var i=0;i<4;++i){
                var t = document.createElement('img');
                t.src = "img/club.png";
                lv.appendChild(t);
            }
            front.appendChild(lv);*/
            display.appendChild(front);

            back = document.createElement('div');
            back.className = 'back';

            display.appendChild(back);

            frag.appendChild(display);
            var z = new CardDisplay(display);
//            z.adjustPos({x: 100, y:100, z:100});
            return z;
        }
    };
});
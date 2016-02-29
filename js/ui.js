define(function(){
    "use strict";

    var arrow = document.createElement('div'),
        button = document.createElement('button'),
        message = document.createElement('div'),
        endMessage = document.createElement("div"),
        board = document.createElement("div"),
        grids = [];

    button.id = 'play-button';
    message.id = 'game-message';
    arrow.innerHTML = "&larr;";
    arrow.id = 'pass-arrow';
    endMessage.id = "end-message";

    //document.body.appendChild(board);
    //$('#game-region').dom.addChild(board);
    document.getElementById("game-region").appendChild(board);
    board.className = 'board';

    for (var i=0;i<5;i++){
        var row = document.createElement('div');
        row.className = "row";
        grids[i] = [];
        for (var j=0;j<6;++j){
            /*var t = document.createElement('div');
            t.className = "grid empty";
            row.appendChild(t);
            grids[i][j] = t;*/
            grids[i][j] = document.createElement('div');
            grids[i][j].className = "grid empty";
            row.appendChild(grids[i][j]);
        }
        board.appendChild(row);
    }

    document.body.appendChild(arrow);
    document.body.appendChild(button);
    document.body.appendChild(message);
    document.body.appendChild(endMessage);


    return {

        activateGrids: function(cb){

            var d = $.Deferred();

            for (let i=0;i<5;++i){
                //for (var t in grids[i]){
                for (let j=0;j<6;++j){
                    //var t = grids[i][j];
                    $(grids[i][j]).on("click", function(){
                        //alert("i: " + i + " j:" + j);
                        $(this).off("click");
                        cb(i, j);
                        //alert(card.num);
                    });
                }
            }
        },

        clearEvents: function(){
            $(button).off("click");
            $(arrow).off("click");
            for (let i=0;i<5;++i){
                for (let j=0;j<6;++j){
                    $(grids[i][j]).off("click");
                }
            }
        },
        showArrow: function(){
            arrow.classList.add('show');
        },
        hideArrow: function(){
            arrow.classList.remove('show');
        },
        showButton: function(text){
            button.innerHTML = text;
            button.classList.add('show');
        },
        hideButton: function(text){
            button.classList.remove('show');
        },
        arrowClickOnce: function(cb){
            $(arrow).on("click", function(){
                cb();
                $(this).off("click");
            });
        },
        buttonClickOnce: function(cb){
            $(button).on("click", function(){
                cb();
                $(this).off("click");
            });
        },
        showWin: function(won){
            endMessage.innerHTML = won ? "YOU WON!" : "YOU LOST!";
            endMessage.classList.add("show");
        },
        hideWin: function(){
            endMessage.classList.remove("show");
        },
        showMessage: function(msg){
            message.innerHTML = msg;
            message.style.display = 'block';
        },
        showPassingScreen: function(dir){
            var directions = ['left', 'right', 'opposite'];
            this.showMessage("Pass three cards to the " + directions[dir]);
            [function(){
                $(arrow).css("transform", 'rotate(0)');
            },function(){
                $(arrow).css("transform", 'rotate(180deg)');
            },function(){
                $(arrow).css("transform", 'rotate(90deg)');
            }][dir]();
        },
        hideMessage: function(){
            message.style.display = '';
        }
    };
});

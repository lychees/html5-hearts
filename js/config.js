define(function(){
    "use strict";

    var names = ["Chakravartin", "Octavian", "Antony", "Lepidus"],
        levels = [-1, 1, 1, 1],
        newCard = null;

    var board = [];
    for (var i=0;i<5;++i){
        board[i] = [];
        for (var j=0;j<6;++j) board[i][j] = '';
    }

    try{
        var loadedNames = JSON.parse(localStorage.getItem("names"));
        if(loadedNames) names = loadedNames;
    } catch(e){}

    try{
        var loadedLevels = JSON.parse(localStorage.getItem("levels"));
        if(loadedLevels) levels = loadedLevels;
    } catch(e){}

    return {
        board: board,
        names: names,
        levels: levels,
        newCard: newCard,

        setNewCard: function(t){
            alert("!!!");

            /*t.adjustPos({



                x: $('div.heap').offset().left - 100,
                y: $('div.heap').offset().top - 50,
                rotation: 0,
                rotateY: 0,
                z:-i
            });*/

            /*this.dom.css({
                zIndex: 10 + pos.z,
                //positionX: pos.x,
                //positionY: pos.y,
                transform: 'rotate(' + pos.rotation + 'deg) translate3d(' + pos.x + 'px, ' + pos.y + 'px, ' + pos.z + 'px) rotateY(' + pos.rotateY + 'deg)'
                //transform: 'rotate(' + pos.rotation + 'deg) translate3d(' + pos.x + 'px, ' + pos.y + 'px, ' + pos.z + 'px)'
            });*/
            var x = $('div.heap').offset().left/2 - 100;
            var y = $('div.heap').offset().top/2 - 50;

            $(t).css({
                zIndex: 100,
                transform: 'rotate(' + 0 + 'deg) translate3d(' + x + 'px, ' + y + 'px, ' + 100 + 'px) rotateY(' + 0 + 'deg)'
            });

            this.newCard = t;
        },

        sync: function(){
            localStorage.setItem("names", JSON.stringify(names));
            localStorage.setItem("levels", JSON.stringify(levels));
        }
    };
});
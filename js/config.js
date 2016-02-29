define(function(){
    "use strict";

    var names = ["Chakravartin", "Octavian", "Antony", "Lepidus"],
        levels = [-1, 1, 1, 1];

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
        sync: function(){
            localStorage.setItem("names", JSON.stringify(names));
            localStorage.setItem("levels", JSON.stringify(levels));
        }
    };
});
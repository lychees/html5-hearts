define(["Player", "jquery", "ui"],
function(Player,  $,         ui){
    "use strict";



    var Human = function(id, name){
        Player.call(this, id, name);
        this.row.flipped = false;
        this.display.setHuman(true);
    };

    Human.prototype = Object.create(Player.prototype);

    Human.prototype.takeIn = function(cards){
        Player.prototype.takeIn.call(this,cards);
        this.row.setSelected(cards);
    };

    Human.prototype.decide = function(validCards){

        this.card = null;

        validCards.forEach(function(c){
            c.display.setSelectable(true);
        });

        var d = $.Deferred();
        var row = this.row;
        /*ui.buttonClickOnce(function(){
            ui.hideMessage();
            ui.hideButton();
            validCards.forEach(function(c){
                c.display.setSelectable(false);
            });
            d.resolve(row.getSelected()[0]);
        });*/

        ui.activateGrids(function(i, j){
            validCards.forEach(function(c){
                c.display.setSelectable(false);
            });
            //d.resolve(row.getSelected()[0], i, j);
            //let ii = i, jj = j;
            //d.resolve(row.getSelected()[0], i, j);
            d.resolve({
                card: row.getSelected()[0],
                i: i,
                j: j
            });
        });

        return d;
    };

    Human.prototype.confirmTransfer = function(){
        ui.showButton("Confirm");
        ui.hideArrow();
        ui.hideMessage();
        var d = $.Deferred();
        ui.buttonClickOnce(function(){
            this.doneTransfer();
            d.resolve();
        }.bind(this));
        return d;
    };

    Human.prototype.doneTransfer = function(){
        this.row.curShifted = [];
        this.row.adjustPos();
        ui.hideButton();
    };

    Human.prototype.initForNewRound = function(){
        Player.prototype.initForNewRound.call(this);
        this.row.curShifted = [];
    };

    Human.prototype.prepareTransfer = function(dir){
        ui.showPassingScreen(dir);
        this.row.cards.forEach(function(c){
            c.display.setSelectable(true);
        });
        this.row.maxShift = 3;
        var d = $.Deferred();
        var row = this.row;
        ui.arrowClickOnce(function(){
            this.selected = row.getSelected();
            this.row.maxShift = 1;
            this.row.cards.forEach(function(c){
                c.display.setSelectable(false);
            });
            d.resolve();
        }.bind(this));

        return d;
    };

    Human.prototype.rowSelected = function(){
        if(this.row.maxShift === 3){
            //ui.showArrow();
        } else {
            //ui.showButton("Go!");
            //ui.activateGrids(this.row.getSelected()[0]);
            //ui.activateGrids();
            this.card = this.row.getSelected()[0];
        }
    };

    Human.prototype.rowDeselected = function(){

        ui.clearEvents();

        if(this.row.maxShift === 3){
            ui.hideArrow();
        } else {
            ui.hideButton();
        }
    };

    return Human;
});
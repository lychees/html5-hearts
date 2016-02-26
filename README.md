# Kingdom with HTML5


Reiner Knizia's Kingdoms is played as a series of tile placements. You will place a tile each turn until the grid is full. A game lasts for three rounds of play.

https://boardgamegeek.com/boardgame/119/kingdoms
http://islaythedragon.com/game-reviews/wait-is-that-a-dragon-a-review-of-kingdoms/
https://www.rpg.net/reviews/archive/9/9518.phtml



You can try the game at:

# 布局描述。

资源卡(Resources Tile, Hazards Tile)：第一个字符位 +- 表示正分还是负分，后一个字符位表示系数。
城堡卡(Castles Tile)：第一个字符位 ABCD 表示所属的玩家，后一个字符位 1234 表示城堡的等级。
山脉(Mountain Tile)：#。
赤龙(Dragon Tile): D。


var Game = {
	Names: ['A','B','C','D'],
	Scores: [0,0,0,0],
	Rounds: 1,
	whosTurn: 0,		
	Board: [
		['','','','','',''],
		['','','','','',''],
		['','','','','',''],
		['','','','','',''],
		['','','','','','']
	],
	Arrangement: {
		A: ['1','1','2','2','2','3','3','4','+4'],
		B: ['1','1','2','2','2','3','3','4','+4'],
		C: ['1','1','2','2','2','3','3','4','+4'],
		D: ['1','1','2','2','2','3','3','4','+4']
	},
	Heap: ['+1','+1']
};

# TODO

// 創造 img HTML 元素，並放入變數中
var bgImg = document.createElement("img");
var enemyImg = document.createElement("img");
var towerBtnImg = document.createElement("img");
var towerImg = document.createElement("img");
var isbiding = false;
var fbs = 60;



bgImg.src = "images/map.png";
towerBtnImg.src = "images/tower-btn.png";
enemyImg.src = "images/slime.gif";


var enemy = {
	x:96,
	y:448,
	speed:64,
	pathDes: 0,
	direction: {
		x:0,
		y:-1,
	},
};

var enemyPath = [
	{x:96, y:64},
    {x:384, y:64},
    {x:384, y:192},
    {x:224, y:192},
    {x:224, y:320},
    {x:544, y:320},
    {x:544, y:96}
];


enemy.move = function(){
	

	if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y, this.speed/fbs, this.speed/fbs)){

		this.x = enemyPath[this.pathDes].x;
    	this.y = enemyPath[this.pathDes].y;
    	this.pathDes++;

		var unitVector = getUnitVector( this.x, this.y, enemyPath[this.pathDes].x, enemyPath[this.pathDes].y );
        this.direction.x = unitVector.x;
        this.direction.y = unitVector.y;

        

	}else{
		this.x = this.x + this.direction.x * this.speed/fbs;
        this.y = this.y + this.direction.y * this.speed/fbs;

	}

}

var cursor = {x:0, y:0};

var tower = {x:0,y:0};


// 找出網頁中的 canvas 元素
var canvas = document.getElementById("game-canvas");

var ctx = canvas.getContext("2d");

$("#game-canvas").mousemove(function(event) {
	cursor.x = event.offsetX;
	cursor.y = event.offsetY;
}); 
$("#game-canvas").click(function(event){
	if((event.offsetX >= 640-64)&&(event.offsetX >= 480-64) ){
		if(isbiding == true){
			isbiding = false;
		}else{
			isbiding = true;
		}
	}			
})

function draw(){
	ctx.drawImage(bgImg,0,0);
	ctx.drawImage(towerBtnImg,640-64,480-64,64,64);

	if(isbiding == true){
		ctx.drawImage(towerImg,cursor.x-cursor.x%32,cursor.y-cursor.y%32,32,32);
	}
	ctx.drawImage(enemyImg,enemy.x,enemy.y);
	enemy.move()

}

function getUnitVector (srcX, srcY, targetX, targetY) {
    var offsetX = targetX - srcX;
    var offsetY = targetY - srcY;
    var distance = Math.sqrt( Math.pow(offsetX,2) + Math.pow(offsetY,2) );
    var unitVector = {
        x: offsetX/distance,
        y: offsetY/distance
    };
    return unitVector;
}

function isCollided ( pointX, pointY, targetX, targetY, targetWidth, targetHeight ) {
	if(     pointX >= targetX
	        &&  pointX <= targetX + targetWidth
	        &&  pointY >= targetY
	        &&  pointY <= targetY + targetHeight
	){
	        return true;
	} else {
	        return false;
	}
}



// 執行 draw 函式
setInterval(draw,1000/fbs);
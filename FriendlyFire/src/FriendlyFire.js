var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 2000; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");

//--------------------------PLAYER DATA ----------------------------------------
var playerOne = {img:null, x:0, y: 512, speed: 10, sizeX: 64, sizeY: 64};  //playerOne data
//var playerTwo = {img:null, x:100, y: 576, speed: 10}; //playerTwo date
var up = false;
var down = false;
var left = false;
var right = false;
var playerSprite = 0;
var maxSprite = 11;
var minSprite = 0;
var spriteCount = 0;
var fps = 2;


//--------------------------PLAYER DATA ----------------------------------------

var images = ["empty","playerTwo", "dirt", "grass" ,"grasstop", "door", "dooropen","monster"];
var sprites = [];
const SIZE = 64; 
var map = {
	rows: 13,	
	cols: 30,
	tiles:
	[
		[4,2,4,4,4,2,4,4,4,4,4,2,4,4,4,2,4,4,2,4,4,2,4,4,4,2,4,4,4,4,4,2,4,4,4,2,4,4,2,4],
		[0,4,0,0,0,4,0,0,0,0,0,4,0,0,0,4,0,0,4,0,0,4,0,0,0,4,0,0,0,0,0,4,0,0,0,4,0,0,4,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,3,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,7,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0,0,0],
		[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0,0,0,0],
		[0,0,0,5,0,3,0,0,2,0,0,0,0,0,2,2,2,0,0,0,0,0,0,5,0,3,0,0,2,0,0,0,0,0,2,2,2,0,0,0],
		[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
		[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0,0,0],
		[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0,0,0,0],
		[0,0,0,5,0,3,0,0,2,0,0,0,0,0,2,2,2,0,0,0,0,0,0,5,0,3,0,0,2,0,0,0,0,0,2,2,2,0,0,0],
		[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	],
	
};

	
var indexX = parseInt(playerOne.x/SIZE);
var indexY = parseInt(playerOne.y/SIZE);
var canMove = true;
var posX = 0;
var posY = 0;


window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

setInt = setInterval(update, 33.34);

//==================INITIALIZE SPIRTES =====================

function init()
{
	for (var i = 0; i < images.length; i++)
	{
		sprites[i] = new Image();
		sprites[i].src = '../img/'+images[i]+'.png';
	}
}

init();

playerOne.img = sprites[1];
//==========================================================


//======================CAMERA==============================

//==========================================================

function update()
{
	animatePlayer(); 
	playerController();
	draw();
	render();
	
}

function onKeyDown(event)
{
	switch (event.keyCode)
	{
		case 65: //A
			left = true;			
			break;
		case 68: //D
			right = true;
			break;
		case 87: //W
			up = true;
			break;
		case 83: //S
			down = true;
			break;
			
		//ADD PLAYER 2 INPUT
	}
}

function onKeyUp(event)
{
	switch (event.keyCode)
	{
		case 65: //A
			left = false;
			break;
		case 68: //D
			right = false;
			break;
		case 87: //W
			up = false;
			break;
		case 83: //S
			down = false;
			break;	
			
		//ADD PLAYER 2 INPUT
	}
}

function playerController() 
{
	if (playerOne.x > 0 && left == true && rayCastCheck(playerOne, 10, playerOne.speed/2))
		playerOne.x -= playerOne.speed;
	if (right == true && playerOne.x < map.cols * SIZE && rayCastCheck(playerOne, 10, playerOne.speed/2))
		playerOne.x += playerOne.speed;
	if (playerOne.y > 0 && up == true && rayCastCheck(playerOne, 10, playerOne.speed/2)) //jump
	{}//jump code here
	
		
}

function gravity()
{
	if(down)
	{
		//rayCastCheck() if it returns true , means you are on the air
	}
}

function rayCastCheck(player, Gap, rayLength)
{
	var centerPos = {x: player.x + player.sizeX/2, y: player.y + player.sizeY/2};
	var leftRay = centerPos.x - (player.sizeX/2 + rayLength);
	var rightRay = centerPos.x + (player.sizeX/2 + rayLength);
	var upRay = centerPos.y - (player.sizeY/2 + rayLength);
	var downRay = centerPos.y + (player.sizeY/2 + rayLength);

	if(left)
	{
		if( map.tiles[parseInt(centerPos.y/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		return true;
	}
	else if(right)
	{
		if( map.tiles[parseInt(centerPos.y/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		return true;
	}
	else if(up)
	{
		if( map.tiles[parseInt(upRay/SIZE)][parseInt(centerPos.x/SIZE)] != 0) return false;
		if( map.tiles[parseInt(upRay/SIZE)][parseInt((player.x + Gap)/SIZE)] != 0) return false;
		if( map.tiles[parseInt(upRay/SIZE)][parseInt((player.x + SIZE - Gap)/SIZE)] != 0) return false;
		return true;
	}
	else if(down)
	{
		console.log("player Y pos:", player.y, "and rayUp: ", downRay);
		if( map.tiles[parseInt(downRay/SIZE)][parseInt(centerPos.x/SIZE)] != 0) return false;
		if( map.tiles[parseInt(downRay/SIZE)][parseInt((player.x + Gap)/SIZE)] != 0) return false;
		if( map.tiles[parseInt(downRay/SIZE)][parseInt((player.x + SIZE - Gap)/SIZE)] != 0) return false;
	return true;
	}

}

function animatePlayer() 
{
	playerSprite++;
	if(playerSprite == maxSprite){
		
		if(right || left)
		{
			minSprite = 12;
			maxSprite = 29;
		}
		else 	
		{
			minSprite = 0;
			maxSprite = 11;
		}
		playerSprite = minSprite;
	}
}

//내 맘대로
function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}

function draw() {
    surface.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
    surface.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset

    //Clamp the camera position to the world bounds while centering the camera around the player                                             
    var camX = clamp(-playerOne.x + canvas.width/2, -2000, 0);
    var camY = clamp(-playerOne.y + canvas.height/2, 0, 0);

    surface.translate( camX, camY );    

    //Draw everything
}
/*function scrollMap() 
{
	// Iterate through all the tiles in map.
	for (var row = 0; row < map.rows; row++)
	{
		for (var col = 0; col < map.cols; col++)
		{
			map[row][col].x -= scrollSpeed; // Subtract speed from tile's x.
		}
	}
}*/



function render()
{
		surface.clearRect(0,0,canvas.width,canvas.height);
		
		for (var r = 0; r < map.rows; r++)
		{
			for (var c = 0; c < map.cols; c++)
			{
				surface.drawImage(sprites[map.tiles[r][c]], c * SIZE , r * SIZE, SIZE, SIZE );
			}
		}	
		surface.drawImage(playerOne.img, SIZE*playerSprite, 0, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
}
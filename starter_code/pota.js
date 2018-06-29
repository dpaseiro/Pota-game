  var myCanvas = document.getElementById('mid-lane');
  var ctx = myCanvas.getContext('2d');

  var svenImg = new Image();
  svenImg.src = "images/svenx300.png";
  var swordImg = new Image();
  swordImg.src = "images/sword.png"
  var moreCreeps = [];

  function Pota(){
    this.sven = {};
    this.creeps = [];
    this.sword = null;
    this.swordImg = swordImg;
  }

  Pota.prototype.animate = function(){
    var that = this;
    setInterval(function (){
      ctx.clearRect(0, 0, 660, 775)
      //SVEN COLLISION WITH CREEPS
      for(var i = 0; i < that.creeps.length; i++){
        if(that.sven.x + that.sven.width >= that.creeps[i].x &&
          that.sven.x <= that.creeps[i].x + that.creeps[i].width &&
          that.sven.y + that.sven.height >= that.creeps[i].y &&
          that.sven.y <= that.creeps[i].y + that.creeps[i].height
        ){
          if((that.creeps[i].y + that.creeps[i].height) - that.sven.y < 65){
            that.sven.y = that.creeps[i].y + that.creeps[i].height +3;
            console.log("bottom")

          }else if((that.sven.y + that.sven.height) - that.creeps[i].y < 65){
              that.sven.y = that.creeps[i].y - that.sven.height -3;
              console.log("top")
          }else if((that.creeps[i].x + that.creeps[i].width) - that.sven.x  < 65){
              that.sven.x = that.creeps[i].x + that.creeps[i].width +3;
              console.log("left")
          }else if((that.sven.x + that.sven.width) - that.creeps[i].x < 65){
              that.sven.x = that.creeps[i].x - that.sven.width -3;
            console.log("right")
          };
        };
      };

    ctx.drawImage(that.sven.img, that.sven.x, that.sven.y, that.sven.width, that.sven.height)
      if(that.sword){
        ctx.drawImage(that.swordImg, that.sword.x, that.sword.y, that.sword.width, that.sword.height)
      }
      for(var i = 0; i < that.creeps.length ; i++){
        ctx.drawImage(that.creeps[i].img, that.creeps[i].x, that.creeps[i].y,that.creeps[i].width,that.creeps[i].height);
      };
    },100)
  };
        
  Pota.prototype.startGame = function(){
    
    svenImg.onload = function() {
      ctx.drawImage(sven.img, sven.x, sven.y,sven.width, sven.height);
    };
  
  this.generateCreep();
  this.animate();
  }

  function Sven(){
    this.img = svenImg;
    this.width = 88;
    this.height = 66;
    this.x = 250;
    this.y = 625;
    this.canAttack = true;
  }
  
//Sven move
Sven.prototype.move = function(whichKey){
  ctx.clearRect(this.x, this.y, this.width, this.height);

  switch(whichKey){
    case 'ArrowLeft':
    if(this.canMove(this.x - 10, this.y)){
      this.x -=3;
    }
    break;
    case 'ArrowRight': 
    if(this.canMove(this.x + 1, this.y)){
      this.x +=3;
    }
    break;
    case 'ArrowUp':
    if(this.canMove(this.x, this.y -1)){
      this.y -= 3;
    }
    break;
    case 'ArrowDown': 
    if(this.canMove(this.x, this.y + 1)){
      this.y +=3;
    }
  }
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

var movement;
  document.onkeydown = function(event) {
    clearInterval(movement); 
    if (event.key === 'ArrowLeft'|| event.key ==='ArrowRight'|| event.key ==='ArrowUp'|| event.key ==='ArrowDown'){
      event.preventDefault();

       movement = setInterval(function(){
        sven.move(event.key);
      }, 10);
    }
    if(event.code === 'Space'){
     sven.attack();
    }
  }

  document.onkeyup = function(){
    clearInterval(movement);
}

function Creep(startingX, health){
  this.img = new Image();
  this.img.src = "images/creep.png";
  this.x = startingX;
  this.y = 0;
  this.width = 132;
  this.height = 97;
  this.health = health;
  this.falling = false;
}

Creep.prototype.fall = function(){
  var that = this;

    if(this.falling === false){
      setInterval(function(){
      that.y += 30;
    },500)
    this.falling = true;  
    }
}

//EDGES OF BOARD COLLISION
Sven.prototype.canMove = function(futurex, futurey){
     if( futurex + this.width >= 660 || futurex <= 0 )
     {
       return false
      }
     if( futurey + this.height >= 775-2)
      {
       console.log('you losse')
       return false}
     if(futurey <= 0)
    {
     alert('Well done. You win!');
      // console.log('you winn')
      return false
    }
    return true;
};

Creep.prototype.receiveDamage = function(){
  this.health -= 1;
  if( this.health <=0){
    var index = game.creeps.indexOf(this)
    game.creeps.splice(index, 1)
  }
  
};

// Creep.prototype.disapear = function(){
//   for(var i = 0; i <= moreCreeps.length; i++){
//     if(moreCreeps[i.y]=== 200){
//       console.log('boom mah dude')
//   }
//   }
// }

Sven.prototype.attack = function(){
  var that = this;
  if(this.canAttack){
    game.sword = {x:this.x + 6, y:this.y - 58, width:this.width / 1.1, height: this.height / 1.1}
    setTimeout(() => {
    game.sword = null;
  }, 250);
      //SWORD COLLISION WITH CREEPS
  for(var i = 0; i < game.creeps.length; i++){
    if(game.creeps[i].x + game.creeps[i].width >= (game.sword.x + 88) - 43 &&
      game.creeps[i].x <= (game.sword.x + 88) - 43 &&
      game.creeps[i].y + game.creeps[i].height >= game.sword.y &&
      game.creeps[i].y <= game.sword.y + game.sword.height
    ){
       game.creeps[i].receiveDamage();
      //  console.log(game.creeps[i].health);
     }
     this.canAttack = false
     setTimeout(function(){
       that.canAttack = true
     },500)

  }}
};

Pota.prototype.GenerateCreepsRow = function(){
  var that = this;
  setInterval(function(){
    that.generateCreep();
  }, 3000)
}

Pota.prototype.generateCreep = function(){

  moreCreeps.push(
    game.creeps.push(new Creep(0, Math.floor(Math.random() * 9))),
    game.creeps.push(new Creep(132, Math.floor(Math.random() * 9))),
    game.creeps.push(new Creep(264, Math.floor(Math.random() * 9))),
    game.creeps.push(new Creep(396, Math.floor(Math.random() * 9))),
    game.creeps.push(new Creep(528, Math.floor(Math.random() * 9)))
  );

  var randomIndex = Math.floor(Math.random() * moreCreeps.length);
    if(moreCreeps[randomIndex].health >= 3){
      moreCreeps[randomIndex].health = 1
      console.log('test');
    }
  
  for(var i = 0; i < game.creeps.length ; i++){ 
    ctx.drawImage(game.creeps[i].img, game.creeps[i].x, game.creeps[i].y,game.creeps[i].width,game.creeps[i].height);
    // console.log(game.creeps[i].health)
    game.creeps[i].fall();
  }  
}

var game = new Pota()
var sven = new Sven()
game.sven = sven;
game.startGame();
game.GenerateCreepsRow();
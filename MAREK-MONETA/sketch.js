
let animation = [];
let playing = false
let i = 1;
let R = 0;

let a = 0;
let mruganie =[3,4,5,6,7,8,9];
let skakanie =[1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2];

function preload() {
  animation[1] = loadImage('coin idle new.png');
  animation[2] = loadImage('coin idle new 2.png');
  animation[3] = loadImage('coin idle eye 3.png');
  animation[4] = loadImage('coin idle new eye.png');
  animation[5] = loadImage('coin idle 5.png');
  animation[6] = loadImage('coin idle new eye2.png');
  animation[7] = loadImage('coin idle 7.png');
  animation[8] = loadImage('coin idle 8.png');
  animation[9] = loadImage('coin idle 4.png');
  
}
  
function setup() {
  createCanvas(1600, 1600);
}

function draw() {
  background(240);
  if (playing == false){
    R = round(random (10));
   
  }
    playing = true
  

  if(playing ==true){
    if(R==1){
      i=mruganie[a];
      a++;
      // print(a);
      if(a==mruganie.length){
        i = 1;
        a = 0;
        playing = false;
      }
    }else{
      
      i = skakanie[a];
      a++
      if(a==skakanie.length){
        i = 1;
        a = 0;
        playing = false;
      }
    }
  }
  
  image(animation[i],325,-50);
}


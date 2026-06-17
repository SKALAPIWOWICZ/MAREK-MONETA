
let gameState = "START"; 
let currentNodeId = "Q1"; 
let endMessage = ""; 


let decisionTree = {

  "Q1": {
    type: "binary",
    text: "CZY POTRZEBUJESZ MOJEJ POMOCY W PODJĘCIU DECYZJI?",
    nextIfYes: "Q2",
    nextIfNo: "W TAKIM RAZIE PODEJMIJ JĄ SAM"
  },
  "Q2": {
    type: "binary",
    text: "CZY DECYZJA, KTÓRĄ CHCESZ PODJĄĆ JEST TRUDNA?",
    nextIfYes: "Q3",
    nextIfNo: "JEŻELI NIE JEST TRUDNA TO NIE MA PROBLEMU W PODJĘCIU JEJ"
  },
  "Q3": {
    type: "binary",
    text: "CZY POTRAFISZ PODJĄĆ TĄ DECYZJĘ SAMODZIELNIE?",
    nextIfYes: "W TAKIM RAZIE NIE JESTEM CI POTRZEBNY",
    nextIfNo: "Q4"
  },
  "Q4": {
    type: "binary",
    text: "CZY CHCESZ ABY LOS PODJĄŁ TĄ DECYZJĘ ZA CIEBIE?",
    nextIfYes: "Q5",
    nextIfNo: "TO NIE ZOSTAWIAJ DECYZJI PRZEZNACZENIU"
  },
  "Q5": {
    type: "binary",
    text: "LUBISZ JAK KTOŚ PODEJMUJE DECYZJE ZA CIEBIE?",
    nextIfYes: "Q6",
    nextIfNo: "TO CZEMU TUTAJ JESTEŚ?"
  },
  "Q6": {
    type: "binary",
    text: "CZY JEŻELI POWIEM CI ŻEBYŚ PODJĄŁ DECYZJE A, TO PODŚWIADOMIE ZACZNIESZ BRONIĆ OPCJI B?",
    nextIfYes: "TO PO CO SIĘ MNIE PYTASZ",
    nextIfNo: "Q7"
  },

  "Q7": {
    type: "binary",
    text: "CZY RZUT MONETĄ JEST PRAWNIE WIĄŻĄCY W TWOIM KRAJU?",
    nextIfYes: "NIE BIORĘ ODPOWIEDZIALNOŚCI PRAWNEJ ZA TWOJE WYBORY ŻYCIOWE",
    nextIfNo: "Q8"
  },
  "Q8": {
    type: "binary",
    text: "CZY RZUT MONETĄ JEST WYSTARCZAJĄCĄ METODĄ ABY PODJĄĆ TRUDNĄ DECYZJĘ?",
    nextIfYes: "Q9",
    nextIfNo: "TO DOBRZE ŻE SIĘ ZGADZAMY"
  },
  "Q9": {
    type: "binary",
    text: "CZY TAK NAPRAWDĘ PO PROSTU CHCESZ ABYM CIE ZWOLNIŁ Z MYŚLENIA?",
    nextIfYes: "Q10",
    nextIfNo: "TO MYŚL SAMODZIELNIE"
  },
  "Q10": {
    type: "binary",
    text: "CZY LUBISZ ZRZUCAĆ NA INNYCH ODPOWIEDZIALNOŚĆ ZA SWOJE DECYZJE?",
    nextIfYes: "O1", //  ODP OTWARTA
    nextIfNo: "TO DOBRZE"
  },
  
  "O1": {
    type: "open",
    text: "TO POWIEDZ MI, CO JEST NAJGORSZĄ RZECZĄ JAKA MOŻE SIĘ WYDARZYĆ NA PODSTAWIE TEJ DECYZJI:",
    next: "Q11"
  },
  "Q11": {
    type: "binary",
    text: "CZY BOISZ SIĘ PODJĄĆ TĄ DECYZJĘ?",
    nextIfYes: "O2", //  ODP OTWARTA
    nextIfNo: "TO STAW JEJ CZOŁA"
  },


  "O2": {
    type: "open",
    text: "TO POWIEDZ MI CO JEST NAJLEPSZĄ RZECZĄ JAKA SIĘ MOŻE WYDARZYĆ NA PODSTAWIE TEJ DECYZJI?",
    next: "Q12"
  },
  "Q12": {
    type: "binary",
    text: "CZY TA DECYZJA JEST CZYMŚ O CZYM DŁUGO MYŚLAŁEŚ?",
    nextIfYes: "Q13",
    nextIfNo: "TO ZASTANÓW SIĘ DŁUŻEJ"
  },
  "Q13": {
    type: "binary",
    text: "CZYLI JESTEŚ NA 100% PEWNY, ŻE CHCESZ ABYM PODJĄŁ TE DECYZJĘ ZA CIEBIE?",
    nextIfYes: "Q14",
    nextIfNo: "ŚWIETNIE, PODEJMIJ JĄ SAM"
  },
  "Q14": {
    type: "binary",
    text: "MASZ JAKIEŚ WĄTPLIWOŚCI?",
    nextIfYes: "TO ZNACZY, ŻE JEDNAK NIE JESTEŚ PEWIEN",
    nextIfNo: "Q15"
  },
  "Q15": {
    type: "binary",
    text: "CZY ZROBISZ TAK JAK ZADECYDUJE MONETA?",
    nextIfYes: "Q16",
    nextIfNo: "TO ZRÓB JAK SAM UWAŻASZ"
  },
  "Q16": {
    type: "binary",
    text: "CZY W TAKIM RAZIE CHCESZ RZUCIĆ MONETĄ?",
    nextIfYes: "Q17", 
    nextIfNo: "POWODZENIA W PODEJMOWANIU DECYJI SAMEMU" 
  },
  "Q17": {
    type: "binary",
    text: "CO CHCESZ ABY WYPADŁO?",
    nextIfYes: "COIN_FLIP_ORZEL",  
    nextIfNo: "COIN_FLIP_RESZKA"   
  }
};


let inputField, submitButton, flipButton;
let coinAngle = 0;
let coinSpeed = 0;
let isCoinSpinning = false;
let coinY = 230;
let coinVelocityY = 0;
let gravity = 0.4;
let flipTimer = 0;
let flipDuration = 600; 

let loaderTimer = 0;
let loaderMaxTime = 120; 
let loaderText = "";

let coinTalk = "Siemanko.\nGotów na rzut?";

function setup() {
  createCanvas(900, 500); 
  textFont('Courier New'); 

  inputField = createInput('');
  inputField.position(width/2 - 200, height/2 + 20);
  inputField.size(300, 30);
  inputField.hide();

  submitButton = createButton('Zatwierdź myśl');
  submitButton.position(width/2 + 120, height/2 + 23);
  submitButton.mousePressed(handleOpenAnswer);
  submitButton.hide();

  flipButton = createButton('RZUĆ MONETĄ');
  flipButton.size(160, 40);
  flipButton.style('background-color', '#ebd032');
  flipButton.style('font-family', 'Courier New');
  flipButton.style('font-weight', 'bold');
  flipButton.position(325 - 80, height/2 + 20);
  flipButton.mousePressed(startCoinFlip);
  flipButton.hide();
}

function draw() {
  background(15, 15, 25); 
  drawScanlines(); 
  drawCoinNPC();   

  if (gameState === "START") {
    drawStartScreen();
  } else if (gameState === "TREE_STAGE") {
    let node = decisionTree[currentNodeId];
    if (node.type === "binary") {
      drawQuestionScreen(node.text);
    } else if (node.type === "open") {
      drawTextInputScreen(node.text);
    }
  } else if (gameState === "LOADING") {
    drawLoadingScreen();
  } else if (gameState === "COIN_FLIP") {
    drawCoinFlipScreen();
  } else if (gameState === "END_DECIDED") {
    drawEndDecidedScreen();
  }
}



function drawStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(17);
  text("HEJKA, WIDZĘ, ŻE NIE MOŻESZ PODJĄĆ JAKIEJŚ DECYZJI", 325, height/2 - 40);
  textSize(13);
  fill(180);
  text("Przygotowałem dla ciebie rzut monetą! \nNaciśnij [SPACJĘ], aby rozpocząć proces.", 325, height/2 + 20);
}

function drawQuestionScreen(questionText) {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(questionText, 70, height/2 - 60, 510, 120); 
  
  textSize(12);
  fill(150);
  
 
  if (currentNodeId === "Q17") {
    text("[T] - ORZEŁ   /   [N] - RESZKA", 325, height/2 + 80);
  } else {
    text("[T] - TAK   /   [N] - NIE", 325, height/2 + 80);
  }
}

function drawTextInputScreen(questionText) {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(questionText, 70, height/2 - 80, 510, 120);
}

function drawLoadingScreen() {
  fill(0, 255, 0); 
  textAlign(CENTER, CENTER);
  textSize(15);
  text(loaderText, 325, height/2 - 20);
  
  stroke(0, 255, 0);
  noFill();
  rect(325 - 100, height/2 + 20, 200, 20);
  
  let progress = map(loaderTimer, 0, loaderMaxTime, 0, 200);
  fill(0, 255, 0);
  rect(325 - 100, height/2 + 20, progress, 20);
  noStroke();

  loaderTimer++;
  if (loaderTimer >= loaderMaxTime) {
    loaderTimer = 0;
    gameState = "TREE_STAGE";
    evaluateNodeTransition(); 
  }
}

function drawCoinFlipScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  
  if (!isCoinSpinning && flipTimer === 0) {
    textSize(20);
    text("STREFA OSTATECZNEGO ROZSTRZYGNIĘCIA", 325, height/2 - 80);
    textSize(13);
    fill(255, 100, 100);
    text("Kliknij przycisk poniżej, aby rzucić monetą.", 325, height/2 - 30);
  } else {
    push();
    translate(325, coinY);
    
    let currentWidth = 80 * abs(cos(coinAngle)); 
    if (currentWidth < 4) currentWidth = 4;



    fill(235, 180, 50);
    stroke(180, 120, 20);
    strokeWeight(3);
    ellipse(0, 0, currentWidth, 80); 
    
    if (currentWidth > 25 && !(!isCoinSpinning && flipTimer >= flipDuration)) {
      fill(180, 120, 20);
      noStroke();
      textSize(24);
      text("$", 0, 0);
    }
    pop();

    if (isCoinSpinning) {
      handleCoinPhysics();
    } else {
      fill(255, 100, 100);
      textSize(16);
      text("UPS...", 325, height/2 + 110);
      textSize(12);
      fill(255);
      text("System zablokował się w martwym punkcie 50/50.\nWygląda na to, że i tak musisz podjąć decyzję sam.", 325, height/2 + 140);
    }
  }
}

function drawEndDecidedScreen() {
  fill(255, 100, 100);
  textAlign(CENTER, CENTER);
  textSize(16);

  text(endMessage, 70, height/2 - 40, 510, 100); 
  
  textSize(12);
  fill(255);
  text("Proces został przerwany.\nOdśwież stronę [F5], aby spróbować ponownie wbić na właściwy tor.", 325, height/2 + 60);
}



let pendingChoice = ""; 

function keyPressed() {
  if (gameState === "START" && key === ' ') {
    gameState = "TREE_STAGE";
    currentNodeId = "Q1";
    coinTalk = "Zaczynamy.\nOdpowiadaj szczerze!";
  } 
  
  else if (gameState === "TREE_STAGE") {
    let node = decisionTree[currentNodeId];
    if (node.type === "binary") {
      if (key === 't' || key === 'T') {
        pendingChoice = "YES";
    
        if (currentNodeId === "Q4") {
          triggerLoader("Nawiązywanie połączenia z przeznaczeniem...");
        } else if (currentNodeId === "Q9") {
          triggerLoader("Formatowanie pamięci podręcznej mózgu...");
        } else {
          evaluateNodeTransition();
        }
      } 
      else if (key === 'n' || key === 'N') {
        pendingChoice = "NON";
        evaluateNodeTransition();
      }
    }
  }
}

function handleOpenAnswer() {
  if (inputField.value().length > 3) { 
    pendingChoice = "OPEN_DONE";
    evaluateNodeTransition();
  } else {
    coinTalk = "Za krótko!\nWysil się trochę.";
  }
}

function triggerLoader(textMessage) {
  gameState = "LOADING";
  loaderText = textMessage;
  loaderTimer = 0;
}

function evaluateNodeTransition() {
  let node = decisionTree[currentNodeId];
  let nextTarget = "";

  if (node.type === "binary") {
    if (pendingChoice === "YES") nextTarget = node.nextIfYes;
    if (pendingChoice === "NON") nextTarget = node.nextIfNo;
  } else if (node.type === "open") {
    nextTarget = node.next;
  }

 
  if (nextTarget.startsWith("COIN_FLIP")) {
    inputField.hide();
    submitButton.hide();
    gameState = "COIN_FLIP";
    coinTalk = "Przebrnąłeś przez to.\nCzas na wielki rzut!";
    flipButton.show();
  } 
  else if (decisionTree[nextTarget] === undefined) {
   
    inputField.hide();
    submitButton.hide();
    endMessage = nextTarget; 
    gameState = "END_DECIDED";
    coinTalk = "No i wszystko jasne.\nKoniec pogawędki.";
  } 
  else {
  
    currentNodeId = nextTarget;
    let nextNode = decisionTree[currentNodeId];
    
    if (nextNode.type === "open") {
      coinTalk = "Oho, pisanie esejów.\nDo dzieła!";
      inputField.value('');
      inputField.show();
      submitButton.show();
    } else {
      inputField.hide();
      submitButton.hide();
      if (currentNodeId === "Q6") coinTalk = "Wiedziałem!";
    }
  }
}



function startCoinFlip() {
  flipButton.hide();
  isCoinSpinning = true;
  flipTimer = 0;
  coinY = 230;
  coinVelocityY = -14; 
  coinSpeed = 0.5; 
  coinTalk = "Uwaga!\nPatrz uważnie!";
}

function handleCoinPhysics() {
  flipTimer++;
  coinAngle += coinSpeed;
  coinY += coinVelocityY;
  coinVelocityY += gravity;
  
  if (coinY > 230 && coinVelocityY > 0) {
    coinY = 230;
    coinVelocityY = -coinVelocityY * 0.5; 
    if (flipTimer > flipDuration - 150) {
      coinVelocityY = 0;
      gravity = 0;
    }
  }

  if (flipTimer > flipDuration - 100) {
    coinSpeed *= 0.92;
  }

  if (flipTimer >= flipDuration) {
    isCoinSpinning = false;
    coinAngle = HALF_PI; 
    coinY = 230; 
    coinTalk = "Oj... \n Akurat spadło na krawędź.";
  }
}



function drawCoinNPC() {
  push();
  translate(770, 250); 
  let bounce = sin(frameCount * 0.08) * 7;
  translate(0, bounce);
  

  fill(255, 215, 0);
  stroke(180, 130, 10);
  strokeWeight(4);
  ellipse(0, 0, 80, 80);
  fill(0);
  noStroke();
  rect(-18, -12, 8, 8); 
  rect(10, -12, 8, 8);  
  rect(-12, 14, 24, 5);  

  fill(255);
  rect(-190, -130, 210, 80, 8); 
  triangle(0, -50, -15, -50, -5, -40); 
  
  fill(0);
  textSize(11);
  textAlign(LEFT, TOP);
  text(coinTalk, -180, -120, 190, 70); 
  pop();
}

function drawScanlines() {
  stroke(0, 0, 0, 30); 
  strokeWeight(1);
  for (let i = 0; i < height; i += 3) {
    line(0, i, width, i);
  }
  noStroke();
}  
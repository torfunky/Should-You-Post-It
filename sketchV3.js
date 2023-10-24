//hello zach and petra or anybody else who has opened this!
//    
//project title: Should You Post It?
//name: Reiley Torfun (Nymeyer)
//resources: Jeff Thompson, Golan Levin, TheCodingTrain, Kazuki Umeda, clmtrackr.js, ml5, handsfree.js 


//for handle
var nickName = ['Awkward', 'Brash', 'Bizarre', 'Cranky', 'Ditsy', 'Elastic', 'Foolish', 'Gullible', 'Grumpy', 'Jittery', 'Loony', 'Nutty', 'Naive', 'Mousy', 'Oblong', 'Queasy', 'Rumpled', 'Sassy', 'Timid', 'Vibrant', 'Witty', 'Whiny', 'Yappy', 'Zealous', 'Dumb', 'Fried', 'Boiling', 'Exploding', 'Slimy', 'Crispy', 'Tasty', 'Green', 'Jolly', 'Plump', 'Stocky', 'Clumsy', 'Quick', 'Jumpy', 'Porcelain', 'Fuzzy', 'Moist', 'Stinky', 'Confident', 'Zesty', 'Fruity', 'Stingy'];
var surName = ['Apple', 'Beast', 'Beetle', 'Brain', 'Celery', 'Ghost', 'Giraffe', 'Honey', 'Panda', 'Cat', 'Lettuce', 'Bean', 'Moth', 'Urchin', 'Elf', 'Dragonfly', 'Banana', 'Sock', 'Zamboni', 'Chair', 'Otter', 'Egg', 'Penguin', 'Fern', 'Crab', 'Puppy', 'Frog', 'Potato', 'Matcha', 'Peanut', 'Book', 'Bear', 'Bumblebee', 'Apple', 'Nugget', 'Smoothie', 'Pretzel', 'Bouqet', 'Wizard', 'Horse', 'House', 'Fungus', 'Persimmons', 'Noodle', 'Squirrel', 'Harlot', 'Fruit', 'Cookie'];
var ranNick = Math.floor(Math.random() * nickName.length);
var ranSur = Math.floor(Math.random() * surName.length);

//fonts
let pixellari;

//pages
let currentPage = 1;
let numberOfPages = 2;

//buttons
let YesBut;
let NoBut;
let pressedYes = false;
let pressedNo = false;

//cam vars
var webcam = null;

var sourceID = '657E086B99931BCEA5390A66F1A631358D1A7196'


//timers
let timer = 3;
let timerPopSKIN = 5;
let timerPopSKINNY = 4;
let timerPopSMILE = 5;
let timerPopPOST = 3;

// 
var GATE = 0;
var skinFilter = false;
var skinnyFilter = false;
var smileFilter = false;

//posting 
var post = false;
var postBut = null;
var commandPost = false;

//etc.
var test = 1;
let takePicTime = false;
let displayPic = false;


function preload() {
    pixellari = loadFont('assets/Pixellari.ttf')
    HandwrittenSYPI = loadImage('assets/HandwrittenSYPI.png');
    CursorSYPI = loadImage('assets/CursorSYPI.png');
    ProfilePic = loadImage('assets/ProfilePic.png');
    LikeBar = loadImage('assets/LikeBar.png');
    Xicon = loadImage('assets/X.png')
    PostConfirm = loadImage('assets/PostConfirm.png')
}

function mouseClicked() {
    //reload handle on page 1
    if (mouseX > 660 && mouseX < 780 && mouseY > 435 && mouseY < 465) {
        if (currentPage == 1) {
            ranNick = Math.floor(Math.random() * nickName.length);
            ranSur = Math.floor(Math.random() * surName.length);
        }
    }
    //page 1 to 2
    if (mouseX > 660 && mouseX < 780 && mouseY > 577.25 && mouseY < 622.5) {
        if (currentPage == 1) {
            currentPage = 2;
        }
    }
}

function setup() {
    createCanvas(1440, 800);

    webcam = createCapture(VIDEO);
    webcam.hide();
    
    
    //webcam2 = createVideo(VIDEO, sourceId);

    frameRate(60);
}

function draw() {
    //troubleshooting
    background(210);
    textAlign(LEFT);
//    text('frame ' + millis(), 0, 20);
//    text('current page ' + currentPage, 0, 40);
//    text('mouse position ' + mouseX + ' ' + mouseY, 0, 60);
//    text('timerPopSKIN ' + timerPopSKIN, 0, 80);
//    text('timerPopSKINNY ' + timerPopSKINNY, 0, 100);
//    text('timerPopSMILE ' + timerPopSMILE, 0, 120);
//    text('timerPopPOST ' + timerPopPOST, 0, 140);
//    text('skin Filter? ' + skinFilter, 0, 160);
//    text('skinny Filter? ' + skinnyFilter, 0, 180);
//    text('smile Filter? ' + smileFilter, 0, 200);
    
//    if (skinFilter == true) {
//        text('image an image blurring filter here', 300, 300);
//    }


    if (currentPage == 1) {
        drawHome();
    }

    if (currentPage == 2 || currentPage == 3 || currentPage == 4 || currentPage == 5) {
        drawTakePhoto();
    }




    if (timer == 1) {
        takePicture();
    }

    if (displayPic == true) {
        takePhoto();
    }

    if (timerPopSKIN == 0) {
        drawPopUpSKIN();
    }

    if (timerPopSKINNY == 0) {
        drawPopUpSKINNY();
    }

    if (timerPopSMILE == 0) {
        drawPopUpSMILE();
    }

    if (currentPage == 3 && timerPopSKIN == -1 && pressedNo == true) {
        skinFilter = true;
        pressedNo = false;
    }

    if (currentPage == 4 && timerPopSKINNY == -1 && pressedNo == true) {
        skinnyFilter = true;
        pressedNo = false;
    }

    if (currentPage == 5 && timerPopSMILE == -1 && pressedNo == true) {
        smileFilter = true;
        pressedNo = false;
    }

    if (timerPopPOST == 0) {
        commandPost = true;
    }

    if (commandPost == true) {
        drawPopUpPost();
    }

    if (post == true) {
        drawPost();
        description();
    }

    if (skinFilter == true) {
        drawSkinFilter();
    }

    if (skinnyFilter == true) {
        drawSkinnyFilter();
    }

    if (smileFilter == true) {
        drawSmileFilter();
    }
}

//homepage
function drawHome() {
    imageMode(CENTER)
    image(CursorSYPI, 1440 / 2, 180, 4413 / 5, 1062 / 5);

    textAlign(CENTER, CENTER);
    textFont(pixellari);
    textSize(30);
    text('Welcome... @' + nickName[ranNick] + surName[ranSur] + '!', 1440 / 2, 400);

    rectMode(CENTER);
    strokeWeight(3);
    rect(1440 / 2, 450, 130, 30, 5);

    textSize(18);
    text('Reload Handle', 1440 / 2, 450);

    rectMode(CENTER);
    strokeWeight(3);
    rect(1440 / 2, 600, 130, 45, 5);

    textSize(24);
    text('Next ->', 1440 / 2, 600);
}

//countdown
function drawTakePhoto() {
    //logo
    imageMode(CENTER)
    //image(CursorSYPI, 1250, 700, 4413/18, 1062/18);

    //framing square
    rectMode(CENTER);
    strokeWeight(3);
    push();
    fill(144);
    rect(1440 / 2, 370, 642, 620);
    pop();


    //top bar
    image(Xicon, 430, 90, 30, 30);
    textAlign(CENTER);
    textFont(pixellari);
    textSize(25);
    text('Get ready! Taking photo in...', 1440 / 2, 100);

    //photo square
    rectMode(CENTER);
    strokeWeight(3);
    rect(1440 / 2, 370, 642, 482);

    //adding the webcam
    push();
    translate(width, 0);
    scale(-1, 1);
    image(webcam, 1440 / 2, 370);
    pop();


    //prepping the timer
    if (frameCount % 60 == 0 && timer > 0) {
        timer--;
    }
    if (frameCount % 60 == 0 && timerPopSKIN > 0) {
        timerPopSKIN--;
    }

    if (currentPage == 3) {
        if (frameCount % 60 == 0 && timerPopSKINNY > 0) {
            timerPopSKINNY--;
        }
    }

    if (currentPage == 4) {
        if (frameCount % 60 == 0 && timerPopSMILE > 0) {
            timerPopSMILE--;
        }
    }

    if (currentPage == 5) {
        if (frameCount % 60 == 0 && timerPopPOST > 0) {
            timerPopPOST--;
        }
    }

    if (timer == 2) {
        takePicTime = true;
    }

    if (timer == 0) {
        displayPic = true;
    }


    //timer text
    push();
    textSize(100);
    text(timer, 1440 / 2, 800 / 2);

    pop();

}

//takes photo (makes an image)
function takePicture() {
    still = createImage(webcam.width, webcam.height);
    still.copy(webcam, 0, 0, webcam.width, webcam.height, 0, 0, still.width, still.height);
}
//displays photo 
function takePhoto() {
    push();
    fill(144);
    rectMode(CENTER);
    noStroke();
    rect(1440 / 2, 90, 400, 55);
    pop();

    push();
    textAlign(CENTER);
    textFont(pixellari);
    textSize(25);
    text('Edit photo', 1440 / 2, 100);
    pop();


    if (still) {
        push();
        translate(width, 0);
        scale(-1, 1);
        image(still, 1440 / 2, 370);
        pop();

    }
}

//popup qs
function drawPopUpSKIN() {
    //frame
    push();
    fill(0, 0, 0);
    rect(1440 / 2 + 5, 350 + 5, 700, 200);
    pop();
    rectMode(CENTER);
    rect(1440 / 2, 350, 700, 200);

    //top bar
    push();
    fill(144);
    rect(1440 / 2, 270, 688, 25);
    pop();
    image(Xicon, 1040, 270, 20, 20);

    //center text
    push();
    textAlign(CENTER);
    textFont(pixellari);
    textSize(40);
    fill(0, 0, 0);
    text('IS YOUR SKIN CLEAR ENOUGH?', 1440 / 2, 350);
    pop();

    //yes
    push();
    rect(144 * 4, 405, 120, 30);
    textAlign(CENTER);
    textFont(pixellari);
    textSize(20);
    fill(0, 0, 0);
    text('Yes', 144 * 4, 405);
    pop();

    YesBut = createButton(' ');
    YesBut.mousePressed(YesPressed);
    YesBut.position(516, 390);
    YesBut.size(120, 30);
    YesBut.style('background', 'none');
    YesBut.style('border', 'none');
    YesBut.style('font-size', '20px');

    //no
    push();
    rect(144 * 6, 405, 120, 30);
    textAlign(CENTER);
    textFont(pixellari);
    textSize(20);
    fill(0, 0, 0);
    text('No', 144 * 6, 405);
    pop();

    NoBut = createButton(' ');
    NoBut.mousePressed(NoPressed);
    NoBut.position(804, 390);
    NoBut.size(120, 30);
    NoBut.style('background', 'none');
    NoBut.style('border', 'none');
    NoBut.style('font-size', '20px');

}

function drawPopUpSKINNY() {
    //frame
    push();
    fill(0, 0, 0);
    rect(1440 / 2 + 5, 350 + 5, 700, 200);
    pop();
    rectMode(CENTER);
    rect(1440 / 2, 350, 700, 200);

    //top bar
    push();
    fill(144);
    rect(1440 / 2, 270, 688, 25);
    pop();
    image(Xicon, 1040, 270, 20, 20);

    //center text
    push();
    textAlign(CENTER);
    textFont(pixellari);
    textSize(40);
    fill(0, 0, 0);
    text('DO YOU LOOK SKINNY ENOUGH?', 1440 / 2, 350);
    pop();

    //yes
    push();
    rect(144 * 4, 405, 120, 30);
    textAlign(CENTER);
    textFont(pixellari);
    textSize(20);
    fill(0, 0, 0);
    text('Yes', 144 * 4, 405);
    pop();

    //no
    push();
    rect(144 * 6, 405, 120, 30);
    textAlign(CENTER);
    textFont(pixellari);
    textSize(20);
    fill(0, 0, 0);
    text('No', 144 * 6, 405);
    pop();
}

function drawPopUpSMILE() {
    //frame
    push();
    fill(0, 0, 0);
    rect(1440 / 2 + 5, 350 + 5, 700, 200);
    pop();
    rectMode(CENTER);
    rect(1440 / 2, 350, 700, 200);

    //top bar
    push();
    fill(144);
    rect(1440 / 2, 270, 688, 25);
    pop();
    image(Xicon, 1040, 270, 20, 20);

    //center text
    push();
    textAlign(CENTER);
    textFont(pixellari);
    textSize(40);
    fill(0, 0, 0);
    text('DO YOU LOOK HAPPY?', 1440 / 2, 350);
    pop();

    //yes
    push();
    rect(144 * 4, 405, 120, 30);
    textAlign(CENTER);
    textFont(pixellari);
    textSize(20);
    fill(0, 0, 0);
    text('Yes', 144 * 4, 405);
    pop();

    YesBut = createButton(' ');
    YesBut.mousePressed(YesPressed);
    YesBut.position(516, 390);
    YesBut.size(120, 30);
    YesBut.style('background', 'none');
    YesBut.style('border', 'none');
    YesBut.style('font-size', '20px');

    //no
    push();
    rect(144 * 6, 405, 120, 30);
    textAlign(CENTER);
    textFont(pixellari);
    textSize(20);
    fill(0, 0, 0);
    text('No', 144 * 6, 405);
    pop();

    NoBut = createButton(' ');
    NoBut.mousePressed(NoPressed);
    NoBut.position(804, 390);
    NoBut.size(120, 30);
    NoBut.style('background', 'none');
    NoBut.style('border', 'none');
    NoBut.style('font-size', '20px');

}

function drawPopUpPost() {
    image(PostConfirm, width / 2, 360, 698 / 3, 495 / 3);

    postBut = createButton(' ');
    postBut.position(604, 277);
    postBut.size(698 / 3, 495 / 3);
    postBut.style('background', 'none');
    postBut.style('border', 'none');
    postBut.style('font-size', '20px');
    postBut.mousePressed(postButPressed);

}

//buttons
function YesPressed() {
    timerPopSKIN--;
    timerPopSKINNY--;
    timerPopSMILE--;

    pressedYes = true;
    currentPage++;
}

function NoPressed() {
    timerPopSKIN--;
    timerPopSKINNY--;
    timerPopSMILE--;

    pressedNo = true;
    currentPage++;

}

function postButPressed() {
    commandPost = false;
    post = true;
}

//creates post and description
function drawPost() {

    //logo
    imageMode(CENTER)
    //image(CursorSYPI, 1250, 700, 4413/18, 1062/18);

    //framing square
    rectMode(CENTER);
    strokeWeight(3);
    rect(1440 / 2, 370, 642, 620);

    //profile and handle
    image(ProfilePic, 450, 95, 45, 45);
    push();
    fill(100, 500, 10, 0);
    circle(450, 95, 40)
    pop();

    textAlign(LEFT);
    textFont(pixellari);
    textSize(25);
    text('@' + nickName[ranNick] + surName[ranSur], 490, 91);

    //photo square
    push();
    rectMode(CENTER);
    strokeWeight(3);
    fill(0, 0, 0, 0);
    rect(1440 / 2, 370, 642, 482);
    pop();

    if (still) {
        push();
        translate(width, 0);
        scale(-1, 1);
        image(still, 1440 / 2, 370);
        pop();

    }

    //like, comment
    image(LikeBar, 480, 636, 1092 / 10, 393 / 10);

}

function description() {
    textAlign(LEFT);
    textFont(pixellari);
    textSize(16);

    // 0 = true (filter is applied)
    // 1 = false (filter is NOT applied)

    if (skinFilter == true && skinnyFilter == true && smileFilter == true) {
        GATE = 1;
    }
    if (skinFilter == true && skinnyFilter == true && smileFilter == false) {
        GATE = 2;
    }
    if (skinFilter == true && skinnyFilter == false && smileFilter == false) {
        GATE = 3;
    }
    if (skinFilter == true && skinnyFilter == false && smileFilter == false) {
        GATE = 4;
    }
    if (skinFilter == false && skinnyFilter == true && smileFilter == true) {
        GATE = 5;
    }
    if (skinFilter == false && skinnyFilter == true && smileFilter == false) {
        GATE = 6;
    }
    if (skinFilter == false && skinnyFilter == false && smileFilter == true) {
        GATE = 7;
    }
    if (skinFilter == false && skinnyFilter == false && smileFilter == false) {
        GATE = 8;
    }


    switch (GATE) {
        case 1: // SKIN 0 SKINNY 0 SMILE 0
            text('Confidence level: Selfie with no filter. #Follow4Follow #EffortlessBeauty', 430, 662);
            break;
        case 2: // SKIN 0 SKINNY 0 SMILE 1
            text('Letting my true colors shine. #BeYouself #NaturalBeauty', 430, 662);
            break;
        case 3: // SKIN 0 SKINNY 1 SMILE 0
            text('Is this even a selfie, or did I enter a digital art exhibit? #Flawless', 430, 662);
            break;
        case 4: // SKIN 0 SKINNY 1 SMILE 1
            text('Just here to bless your feed with my face. #MakeupOnFleek', 430, 662);
            break;
        case 5: // SKIN 1 SKINNY 0 SMILE 0
            text('I came, I saw, I slayed. Now back to reality. #InstaPerfect', 430, 662);
            break;
        case 6: // SKIN 1 SKINNY 0 SMILE 1
            text('Flawlessly imperfect, just like the rest of us. #SlightlyEnhanced', 430, 662);
            break;
        case 7: // SKIN 1 SKINNY 1 SMILE 0
            text('Smile, because why not? #SelfieGameStrong', 430, 662);
            break;
        case 8: // SKIN 1 SKINNY 1 SMILE 1
            text('Confidence is the key to success! #MondayMotivation #SlayingTheDayAway', 430, 662);
            break;

    }
}

//implements filters (TBD)    
function drawSkinFilter() {

}

function drawSkinnyFilter() {

}

function drawSmileFilter() {

}

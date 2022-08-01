const presidents = [
    'Bolsonaro','Temer','Dilma','Lula', 'Fernando Henrique', 'Itamar', 
    'Collor', 'Sarney','Tancredo', 'Gen. Joao Figueiredo', 'Gen. Ernesto Geisel','Gen Emílio Médici',
    'Gen. Costa e Silva','Gen Castelo Branco', 'Gen. Ranieri Mazzilli','João Goulart','Jânio Quadros', 
    'Juscelino Kubitschek',' Nereu Ramos','Carlos Luz','Café Filho', 'Getúlio Vargas', 'Gaspar Dutra',
    'José Linhares','Júlio Prestes', 'Washington Luís','Arthur Bernardes','Epitáfio Pessoa','Delfim Moreira'
];

const cardNames = [
    'Bolsonaro','Temer','Dilma','Lula', 'Fernando Henrique', 'Itamar', 
    'Collor', 'Sarney','Tancredo Neves', 'Joao Figueiredo', 'Ernesto Geisel','Emílio Médici',
    'Costa e Silva','Castelo Branco', 'Ranieri Mazzilli','João Goulart','Jânio Quadros', 
    'Juscelino Kubitschek', 'Bolsonaro','Temer','Dilma','Lula', 'Fernando Henrique', 'Itamar', 
    'Collor', 'Sarney','Tancredo Neves', 'Joao Figueiredo', 'Ernesto Geisel','Emílio Médici',
    'Costa e Silva','Castelo Branco', 'Ranieri Mazzilli','João Goulart','Jânio Quadros', 
    'Juscelino Kubitschek',
];

const board = document.querySelector('.board');
const gameHeader = document.querySelector('header');
const body = document.querySelector('body');
const gameMenuButton = document.querySelector('header button');
const  wrapper = document.querySelector('.wrapper')
const secondMenu = document.querySelector('.second-menu');

const cardsArray = new Array;

let score = 0;
let  amountOfTime = 10; 
let winProgress = 0;
let points = 10;
let timeCounter = 0;
let minutes = 0;



const cardCheker =  {
     firstClick : true,
     firstCard : {},
     
     compareEquals: function(cardObj ) {
        if(this.firstClick) {
            this.firstCard = cardObj; 
            this.firstClick = false;
            this.firstCard.disableClicks()
            
        }else {
            
            cardsArray.forEach(card => card.disableClicks())
           
            if(this.firstCard.id != cardObj.id && this.firstCard.name === cardObj.name){
                cardsArray.forEach(card => card.enableClicks())
                this.firstClick = true;
                updateScore(points);
                checkWin()
                this.firstCard.foundCard();
                cardObj.foundCard();
                sucessSound.play();
             } else {
                   
                    setTimeout(()=>{
                        
                        cardsArray.forEach(card => card.removeRotate())
                        cardsArray.forEach(card => card.enableClicks())
                        
                    },900);
                    this.firstClick =true
            }
  
        }
     }
}

function checkWin() {
        if(cardsArray.length/2 == winProgress ){
           
            eraserTimer()
            setTimeout(()=>{
                victorySound.play()
                winMesage()
                winModal.render()
            } ,1000)
        }
}

const hideElement = element => element.classList.add('hide');

const foundCard = (card1 ,card2) => {
    card1.classList.add('found');
    card2.classList.add('found');
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  } 

  const showCardSound = new sound('/snd/show_card.mp3')
  const hideCardSound = new sound('/snd/hide_card.mp3')
  const sucessSound = new sound('/snd/sucess.mp3')
  const victorySound = new sound('/snd/victory.mp3')

  
const showElement = element => element.classList.remove('hide');

const startGame = () => {
     
    hideElement(secondMenu);
    showElement(board);
    showElement(gameHeader);
    startTimer()
   
    // resetBoard();
   
}
const renderSecondMenu = ()=> {
    showElement(secondMenu)
    hideElement(board);
    hideElement(gameHeader)
    const startButton = document.querySelector('#start-game');
    startButton.addEventListener('click', startGame);

}
renderSecondMenu();


const FactoryCard = (id, name)=> {

      return  {
                    id,
                    name,
                    parentDiv :  undefined,
                    className : 'card',
                    
                    frontSide : {
                        className : 'front-card',
                        imgSrc : '/img/icon_card.png',
                        image: undefined
                        
                    },
                    backSide : {
                        className : 'back-card',
                        imgSrc : `/img/${name}.jpg`,
                        image: undefined
                    },

                    setId : function(id) {
                        this.id = id;
                    },
                    setName : function(name){
                        this.name = name;
                    },
                    
                    setClassName : function(className) {
                        this.className = `card${className}`
                    },
                    getName : function()  { 
                        return this.name;
                    },
                    
                    setBackImage: function(src) {
                        this.backSide.imgSrc = src;
                    },
                    delet : function(){
                        this.parentDiv.remove()
                    }
                    ,
                    checkCard : function() {
                        // 
                        
                        cardCheker.compareEquals(cardsArray[id])
                       
                    },
                    foundCard : function(){
                       
                        this.frontSide.image.src = this.backSide.imgSrc;
                        this.parentDiv.classList.add('found');
                    },
                    
                    disableClicks : function() {
                        this.parentDiv.classList.add('disable');
                    },
                    enableClicks : function() {
                        this.parentDiv.classList.remove('disable');
                    },
                    
                    removeRotate :function() {
                        this.parentDiv.classList.remove('rotate-card')
                        hideCardSound.play()
                    },
                    renderCard: function() {
                        const parentDiv = document.createElement('div');
                 
                        const frontDiv = document.createElement('div');
                        const iconDiv = document.createElement('img');
                        const backDiv = document.createElement('div'); 
                        const backImage = document.createElement('img');
                        const cardName = document.createElement('figcaption');

                        this.parentDiv = parentDiv;
                        this.frontSide.image = iconDiv;
                        this.backSide.image = backImage;
                        
                        cardName.innerText = this.name;

                        parentDiv.classList.add(this.className);
                        frontDiv.classList.add(this.frontSide.className);
                        backDiv.classList.add(this.backSide.className);
                        parentDiv.addEventListener('click', ()=> {
                            parentDiv.classList.add('rotate-card');
                            showCardSound.play()
                        
                        });
                        parentDiv.addEventListener('click', this.checkCard);
                        
                        iconDiv.src = this.frontSide.imgSrc;
                        backImage.src = this.backSide.imgSrc;


                        board.appendChild(parentDiv);
                        parentDiv.appendChild(frontDiv);
                        parentDiv.appendChild(backDiv);
                        frontDiv.appendChild(iconDiv);
                        backDiv.appendChild(backImage);
                        backDiv.appendChild(cardName);
                    },    
            }
}

//Creates an Array with random numbers, without repete
function randomUniqueArray(range) {
    const arr = [];
    const result = [];
    for (let i = 0; i <= range; i++) {
      arr.push(i)
    }
    for (let i = 1; i <= range; i++) {
      const random = Math.floor(Math.random() * (range - i));
      result.push(arr[random]);
      arr[random] = arr[range - i];
    }
    return result;
  }
     
function setCardsPosition() {
    const randomPosition = randomUniqueArray(36);
  
    for(i=0; i<cardNames.length; i++ ) {          
        //This loop sets a ramdom data-name property foar each of the cards on the page
        // It's also give an id and sets the image source. 
            cardsArray.push(FactoryCard(i, cardNames[randomPosition[i]])); 
         
  }

} 


function setCardsClass() {
    // This loop goes to the array and cheks if the row was changed, 
    //then swicht the class name betewn the cards and rows
    const gridRow = 6 ;
    let currentRow = 1;
    let counterRow = 0;
    for(i=0; i<cardsArray.length; i++ ) {
        counterRow++;
      
       if(currentRow ==1 ) {
            if(counterRow>=gridRow) {
                counterRow =0
                currentRow=0
            }

           if(i%2==0) {
            cardsArray[i].setClassName('1');
           } else cardsArray[i].setClassName('2');
             
       } else {
            if(counterRow>=gridRow) {
                counterRow =0
                currentRow=1
            }

            if(i%2==0) {
            cardsArray[i].setClassName('2');
           } else cardsArray[i].setClassName('1');

       }
        
    
    }


   
}


function changeCardsPosition() {
    let newRandomPosition = randomUniqueArray(cardsArray.length)
    for(i=0; i<cardsArray.length; i++ ) {
       
        cardsArray[i] = FactoryCard(i, cardNames[newRandomPosition[i]]);
    
    }
}
 

function renderCards () {
    setCardsPosition()
    setCardsClass()
    cardsArray.forEach(element => element.renderCard())
    
     
}

renderCards();

    // Get all the DOM elements just created by the loop above
function removeDomNode(node){
    let element = document.querySelector(node)
    element.remove()
}

function animateScore(points) {
    const pointAnimation = document.createElement('div');
    pointAnimation.innerText= `${points}`;
    pointAnimation.classList.add('point-animation');
    wrapper.appendChild(pointAnimation);

}


function updateScore(points) {
    let currentPoints = points
    const  displayScore = document.querySelector('.points');
    score += points;
    
    winProgress++ 
    animateScore(currentPoints);
    setTimeout( ()=> {
        displayScore.innerText = score ;
        removeDomNode('.point-animation');
    }, 900 )
}


function resetBoard() {
        removeRotate();
        clickCointer=0; 
        enableClicks();
}
function deletCards (){
  
   cardsArray.forEach(element => element.delet());
}

function reloadGame() {
    const displayScore = document.querySelector('.points'); 
    winProgress = 0;
    deletCards();
    changeCardsPosition();
    setCardsClass();
    cardsArray.forEach( element=> element.renderCard());
    

    score = 0;
    displayScore.innerText = '0' + score;
    restartTimer();
    
   
}

 0;
const timer = document.querySelector('.clock');

// function formatTimer (seconds){
//     let min = Math.floor( seconds /  60);
//     let sec = seconds & 60;
//     return min+':'+sec;
// }

class Modal {
       constructor( title, classCSS) {
        
        this.title = title;
        this.classCSS = classCSS;
        
        this.modal  =  document.createElement('div');
        this.modalTitle = document.createElement('h2');
        this.buttonsContainer =  document.createElement('div');
        this.blackFilter = document.createElement('div');

       }
  
        render() {
            stopTimer()
            this.modalTitle.innerHTML = this.title;
            this.modalTitle.classList.add('modal-title');
            this.modal.classList.add('modal')
            this.modal.classList.add(this.classCSS);
            this.blackFilter.classList.add('black-filter');
            body.appendChild(this.modal);
            body.appendChild(this.blackFilter);
            this.modal.appendChild(this.modalTitle);
            this.modal.appendChild(this.buttonsContainer);
          
        }

        delet() {
            body.removeChild(this.modal);
            body.removeChild(this.blackFilter);

        }
        renderButtons(src1, src2 ) {
        
            this.buttonsContainer.innerHTML = 
             `
             <button class='back-button' onclick='renderSecondMenu(),gameOverModal.delet()'> 
                    <img src= ${src1} >
             </button> 
             <button class='replayButton' onclick='reloadGame(),gameOverModal.delet()' > 
                <img src= ${src2}  >
             </button> 
             `;

        }
        getDomReference(element) {
            if(element == 'modal' || element == 'buttonsContainer') {
                if(element== 'modal') {
                    return this.modal;
                } else return this.buttonsContainer;
            } else {
                return 'ERROR! Only the words modal or buttonsContainer are acept as a parameter';
            }
            
        }

    
}

const gameOverModal = new Modal('Game Over','gameOver');
gameOverModal.renderButtons('/img/back.png', '/img/refresh.png');


const gameMenu = new Modal('Pause','pauseGame');

const winModal = new Modal('Winer!','winModal');
const winPoints = winModal.getDomReference('modal');
const getScore = ()=> score;
function winMesage() {
    winPoints.innerHTML = 
    ` <div class='win-mesage'> 
        <h2>
            You  score was:
        </h2>
        <div>${score}</div>
        <p> 
           Congratulations! </br> You make <span>${score}</span> points. 
        </p>
        <div class="buttons-container"> 
            <button onclick='reloadGame(), winModal.delet()'> Play Again</button>
            <button onclick='renderSecondMenu(),winModal.delet(),reloadGame()'> Back </button>
        </div>
     </div> `
}

const  buttonsGameMenu = gameMenu.getDomReference('buttonsContainer');
    buttonsGameMenu.innerHTML = `
    <button onclick='gameMenu.delet(), startTimer()  '> Resume </button>
    <button onclick='reloadGame(), gameMenu.delet()'> Reload Game</button>
    <button onclick='renderSecondMenu(),gameMenu.delet(),reloadGame()'> Quit </button>
    <button> Setings </button>
`;
gameMenuButton.addEventListener('click', () => gameMenu.render());


let timerID;

const startTimer = ()=>  timerID = setInterval(printTime,1000);

const stopTimer = () => clearInterval(timerID);

const eraserTimer = () => { 
    stopTimer()
    timeCounter = 0;
    minutes = 0;
    timer.innerHTML  = '0:0';
}

const restartTimer = ()=> {
    eraserTimer();
    startTimer();
}



function printTime() {
    timeCounter++;

    if(timeCounter<= 59) { 
        timer.innerHTML  = ''+ minutes +':' + timeCounter;
    } else {
        minutes++;
        timeCounter=0;
        timer.innerHTML  =''+ minutes +':' + timeCounter;
    }
   
}


  
// function printTimeReverse() {
//     timeCounter++;
//     let currentlyTime = amountOfTime - timeCounter;
//     timer.innerHTML  = formatTimer(amountOfTime - timeCounter);
//     console.log(currentlyTime);
//     if(currentlyTime <=1 ) {
//     gameOverModal.render();
  
//     stopTimer();
//    }
// }





/* 
   - Put the presidents names cards front 



*/
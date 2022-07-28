const presidents = [
    'Bolsonaro','Temer','Dilma','Lula', 'Fernando Henrique', 'Itamar', 
    'Collor', 'Sarney','Tancredo', 'Gen. Joao Figueiredo', 'Gen. Ernesto Geisel','Gen Emílio Médici',
    'Gen. Costa e Silva','Gen Castelo Branco', 'Gen. Ranieri Mazzilli','João Goulart','Jânio Quadros', 
    'Juscelino Kubitschek',' Nereu Ramos','Carlos Luz','Café Filho', 'Getúlio Vargas', 'Gaspar Dutra',
    'José Linhares','Júlio Prestes', 'Washington Luís','Arthur Bernardes','Epitáfio Pessoa','Delfim Moreira'
];

const cardNames = [
    'Bolsonaro','Temer','Dilma','Lula', 'Fernando_Henrique', 'Itamar', 
    'Collor', 'Sarney','Tancredo', 'Gen_Joao_Figueiredo', 'Gen_Ernesto_Geisel','Gen_Emílio_Médici',
    'Gen_Costa_e_Silva','Gen_Castelo_Branco', 'Gen_Ranieri_Mazzilli','João_Goulart','Jânio_Quadros', 
    'Juscelino_Kubitschek', 'Bolsonaro','Temer','Dilma','Lula', 'Fernando_Henrique', 'Itamar', 
    'Collor', 'Sarney','Tancredo', 'Gen_Joao_Figueiredo', 'Gen_Ernesto_Geisel','Gen_Emílio_Médici',
    'Gen_Costa_e_Silva','Gen_Castelo_Branco', 'Gen_Ranieri_Mazzilli','João_Goulart','Jânio_Quadros', 
    'Juscelino_Kubitschek',
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
let points = 10


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
            setTimeout(()=>{
                winModal.render()
            } ,800)
        }
}



const hideElement = element => element.classList.add('hide');

const foundCard = (card1 ,card2) => {
    card1.classList.add('found');
    card2.classList.add('found');
}

const showElement = element => element.classList.remove('hide');

const startGame = () => {

    hideElement(secondMenu);
    showElement(board);
    showElement(gameHeader);
   
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
                    },
                    renderCard: function() {
                        const parentDiv = document.createElement('div');
                 
                        const frontDiv = document.createElement('div');
                        const iconDiv = document.createElement('img');
                        const backDiv = document.createElement('div'); 
                        const backImage = document.createElement('img');
                       
                        this.parentDiv = parentDiv;
                        this.frontSide.image = iconDiv;
                        this.backSide.image = backImage;

                        parentDiv.classList.add(this.className);
                        frontDiv.classList.add(this.frontSide.className);
                        backDiv.classList.add(this.backSide.className);
                        parentDiv.addEventListener('click', ()=> parentDiv.classList.add('rotate-card'));
                        parentDiv.addEventListener('click', this.checkCard);
                        
                        iconDiv.src = this.frontSide.imgSrc;
                        backImage.src = this.backSide.imgSrc;

                        board.appendChild(parentDiv);
                        parentDiv.appendChild(frontDiv);
                        parentDiv.appendChild(backDiv);
                        frontDiv.appendChild(iconDiv);
                        backDiv.appendChild(backImage);
                       
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

function changeCardsPosition() {
    let newRandomPosition = randomUniqueArray(cardsArray.length)
    for(i=0; i<cardsArray.length; i++ ) {
       
        cardsArray[i] = FactoryCard(i, cardNames[newRandomPosition[i]]);
    
    }
}
 

function renderCards () {
    setCardsPosition()
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
    
     
    // setTimeout(()=>{
       
    //     pointAnimation.classList.add('arrived-point')
        
    // },300);
    
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
  
   cardsArray.forEach(element => element.delet())
}

function reloadGame() {
    const displayScore = document.querySelector('.points'); 
    deletCards();
    changeCardsPosition()
    cardsArray.forEach( element=> element.renderCard());
    score = 0;
    displayScore.innerText = '0' + score;
   
    
    
}

let timeCounter = 0
const timer = document.querySelector('.clock');

function formatTimer (seconds){
    let min = Math.floor( seconds /  60);
    let sec = seconds & 60;
    return min+':'+sec;
}

class Modal {
       constructor( title, classCSS) {
        
        this.title = title,
        this.classCSS = classCSS
        
        this.modal  =  document.createElement('div');
        this.modalTitle = document.createElement('h2');
        this.buttonsContainer =  document.createElement('div');
        this.blackFilter = document.createElement('div');

       }
  
        render() {
         
            this.modalTitle.innerHTML = this.title;
            this.modalTitle.classList.add('modal-title');
            this.modal.classList.add('animate-window')
            this.modal.classList.add(this.classCSS);
            this.blackFilter.classList.add('black-filter');
            body.appendChild(this.modal);
            body.appendChild(this.blackFilter);
            this.modal.appendChild(this.modalTitle);
            this.modal.appendChild(this.buttonsContainer);
          
        }

        delet() {
            body.removeChild(this.modal)
            body.removeChild(this.blackFilter)
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

             const backButton = document.querySelector('.back-button');
             const replayButton = document.querySelector('.replayButton');

            //  backButton.addEventListener

        }
        getDomReference(element) {
            if(element == 'modal' || element == 'buttonsContainer') {
                if(element== 'modal') {
                    return this.modal
                } else return this.buttonsContainer
            } else {
                return 'ERROR! Only the words modal or buttonsContainer are acept as a parameter';
            }
            
        }

    
}

const gameOverModal = new Modal('Game Over','gameOver');
gameOverModal.renderButtons('/img/back.png', '/img/refresh.png');

const gameMenu = new Modal('Pause','pauseGame');

const winModal = new Modal('Winer!','winModal');
winModal.renderButtons('/img/back.png', '/img/refresh.png');


const  buttonsGameMenu = gameMenu.getDomReference('buttonsContainer');
buttonsGameMenu.innerHTML = `
 <button onclick='gameMenu.delet()'> Resume </button>
 <button onclick='reloadGame(), gameMenu.delet()'> Reload Game</button>
 <button onclick='renderSecondMenu(),gameMenu.delet()'> Quit </button>
 <button> Setings </button>

`;
gameMenuButton.addEventListener('click', () => gameMenu.render());


let timerID;

const startTimer = ()=>  timerID = setInterval(printTime,1000);

const stopTimer = () => clearInterval(timerID);

const printTime = ()=> {
     timeCounter++;
     let currentlyTime = amountOfTime - timeCounter;
     timer.innerHTML  = formatTimer(amountOfTime - timeCounter);
     console.log(currentlyTime);
     if(currentlyTime <=1 ) {
     gameOverModal.render();
   
     stopTimer();
}
  
}

startTimer();

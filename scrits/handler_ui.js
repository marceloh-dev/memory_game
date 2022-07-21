
const board = document.querySelector('.board');
const gameHeader = document.querySelector('header');
const body = document.querySelector('body');

const secondMenu = document.querySelector('.second-menu');


let  amountOfTime = 10; 



const cardCheker =  {
     firstClick : true,
     firstCard : {},
    

    
    
     compareEquals: function(cardObj ) {
        if(this.firstClick) {
            this.firstCard = cardObj;
           
            console.log("First ", cardObj.name, cardObj.getName())
            
            this.firstClick = false;
            // this.firstElement.classList.add('disable')
            
        }else {
            console.log(this.firstCard.id ,cardObj.id)
            this.firstCard.disableClicks()
            cardObj.disableClicks()
            console.log('disable')
            if(this.firstCard.id != cardObj.id && this.firstCard.name === cardObj.name){
                console.log('CHCKING', this.firstCard.name,cardObj.name)
                this.firstCard.enableClicks()
                cardObj.enableClicks()
                this.firstClick = true;
                updateScore(10);
                this.firstCard.foundCard();
                cardObj.foundCard();
             } else {
                   
                    setTimeout(()=>{
                        console.log("removing...",)
                        this.firstCard.removeRotate();
                        cardObj.removeRotate();
                        
                    },900);
                    this.firstClick =true
        }
        
            
            // if(firstCard.name === secondCard.name && firstCard.id !== secondCard.id){
                //         updateScore(10);
                //         hideCards(secondCard);
                //     } else setTimeout(resetBoard,900);

        }
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
                    testMeth : function() {
                        // 
                        
                        cardCheker.compareEquals(cardsArray[id])
                       
                    },
                    foundCard: function(){
                        console.log();
                        this.frontSide.image.src = this.backSide.imgSrc;
                        this.parentDiv.classList.add('found');
                    },
                    
                    disableClicks : function() {
                        this.parentDiv.classList.remove('disable');
                    },
                    enableClicks : function() {
                        this.parentDiv.classList.add('disable');
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
                        parentDiv.addEventListener('click', this.testMeth);
                        
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


        
const cardsArray = new Array;
      
const setCardsPosition = () => {
    const randomPosition = randomUniqueArray(36);
    console.log(randomPosition);
    for(i=0; i<cardNames.length; i++ ) {          
        //This loop sets a ramdom data-name property foar each of the cards on the page
        // It's also give an id and sets the image source. 
            cardsArray.push(FactoryCard(i, cardNames[randomPosition[i]]));
            
  }

} 

const changeCardsPosition = () => {
    let newRandomPosition = randomUniqueArray(cardsArray.length)
    for(i=0; i<cardsArray.length; i++ ) {
       
        cardsArray[i] = FactoryCard(i, cardNames[newRandomPosition[i]]);
    
    }
}
 

const renderCards = () => {
    setCardsPosition()
    cardsArray.forEach(element => element.renderCard())
}

renderCards();
    // Get all the DOM elements just created by the loop above
      let cards = document.querySelectorAll(".board > div");



// BUG HERE !!! A new card is generetade wen refresh game is caled, but this function below 
// it's caled twice and maintain the last image on top of the card, resuting in a logic bug.
// An aproach for this problem, could be refactoring the code, replacing the functios that 
// are used to create the cards by an object, and then nest the creatingFigure function 
// as an atribute of that object. Also maybe will be apropriate to make the html markup 
// of the cards dinamicaly  


const enableClicks = () => cards.forEach(element => element.classList.remove('disable'));

const disableClicks = () => cards.forEach(element => element.classList.add('disable'));


const deletCards = () => cards.forEach(element => element.remove())

const removeRotate = () => cards.forEach(element => element.classList.remove('rotate-card'));

let score = 0;

const updateScore = points => {
    const  displayScore = document.querySelector('.points');
    score += points;
    displayScore.innerText = score ;
}

const resetBoard = ()=>{
        removeRotate();
        clickCointer=0; 
        enableClicks();
}

let timeCounter = 0
const timer = document.querySelector('.clock');
const formatTimer = seconds => {
    let min = Math.floor( seconds /  60);
    let sec = seconds & 60;
    return min+':'+sec;
}
const gameOverModal =  {
    modal :  document.createElement('div'),
     modalTitle : document.createElement('h2'),
     buttonsContainer :  document.createElement('div'),
     backButton : document.createElement('button'),
     againButton : document.createElement('button'),
     imgBack : document.createElement('img'),
     imgReplay : document.createElement('img'),
     blackFilter : document.createElement('div'),
    
     deleteModal : function() {
        body.removeChild(this.modal)
        body.removeChild(this.blackFilter)
    },

    reloadGame : function() {
      
    

        this.deleteModal();
        deletCards();
        changeCardsPosition()
        cardsArray.forEach( element=> element.renderCard());
        resetBoard();
        removeRotate();

        
    },

    returnToMenu : function() {
        this.deleteModal();
        renderSecondMenu();
    },

    'renderModal' : function() {
        this.backButton.addEventListener('click',this.returnToMenu.bind(gameOverModal))
        this.againButton.addEventListener('click', this.reloadGame.bind(gameOverModal))
        this.modalTitle.innerHTML = 'GAMER OVER';
        this.modalTitle.classList.add('modal-title');
        this.modal.classList.add('gameOver');
        this.blackFilter.classList.add('black-filter');

        this.imgReplay.setAttribute("src", "/img/refresh.png");
        this.imgBack.setAttribute("src", "/img/back.png");

        this.imgReplay.classList.add('replayButton');
        this.imgBack.classList.add('back-button');

        body.appendChild(this.modal);
        body.appendChild(this.blackFilter);
        this.modal.appendChild(this.modalTitle);
        this.modal.appendChild(this.buttonsContainer);
        this.buttonsContainer.appendChild(this.backButton);
        this.buttonsContainer.appendChild(this.againButton);
        this.backButton.appendChild(this.imgBack);
        this.againButton.appendChild(this.imgReplay);
    }
}

let timerID;

const startTimer = ()=>  timerID = setInterval(printTime,1000);

const stopTimer = () => clearInterval(timerID);

const printTime = ()=> {
    timeCounter++;
    let currentlyTime = amountOfTime - timeCounter;
    timer.innerHTML  = formatTimer(amountOfTime - timeCounter);
    console.log(currentlyTime);
    if(currentlyTime <=1 ) {
     gameOverModal.renderModal();
     stopTimer();
    }
  
}

startTimer();

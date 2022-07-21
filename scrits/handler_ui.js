const cards = document.querySelectorAll(".board > div");
const board = document.querySelector('.board');
const gameHeader = document.querySelector('header');
const body = document.querySelector('body');

const secondMenu = document.querySelector('.second-menu');



let clickCointer = 0 ;
let  amountOfTime = 10; 

const FactoryCardCheker = (id, name)=> {
 return  {
        "id": id,
        "name" : name,
        "getDomLocation" : function () {
            const domLocation = document.getElementById(this.id)
            return domLocation
        } 
    }
}
let firstCard = FactoryCardCheker("?","?");

const hideElement = element => element.classList.add('hide');


const showElement = element => element.classList.remove('hide');

const startGame = () => {

    hideElement(secondMenu);
    showElement(board);
    showElement(gameHeader);
    // resetBoard()
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
                    'id': id,
                    'name' : name,

                    'className' : 'card',

                    'frontSide' : {
                        'className' : 'front-card',
                        'imgSrc' : '/img/icon_card.png'
                    },
                    'backSide' : {
                        'className' : 'back-card',
                        'imgSrc' : `/img/${name}.jpg`
                    },

                    setId : function(id) {
                        this.id = id;
                    },
                    setName : function(name){
                        this.name = name;
                    },
                    setBackImage: function(src) {
                        this.backSide.imgSrc = src;
                    },
                    renderELement: function() {
                    let parentDiv = document.createElement('div');
                    let frontDiv = document.createElement('div');
                    let iconDiv = document.createElement('img');
                    let backDiv = document.createElement('div'); 
                    let backImage = document.createElement('img'); 

                    parentDiv.classList.add(this.className);
                    frontDiv.classList.add(this.frontSide.className)
                    backDiv.classList.add(this.backSide.className);
                    parentDiv.addEventListener('click', ()=> parentDiv.classList.add('rotate-card'));

                    iconDiv.src = this.frontSide.imgSrc;
                    backImage.src = this.backSide.imgSrc;

                    board.appendChild(parentDiv);
                    parentDiv.appendChild(frontDiv);
                    parentDiv.appendChild(backDiv);
                    frontDiv.appendChild(iconDiv);
                    backDiv.appendChild(backImage)

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

let randomPosition = randomUniqueArray(36);
        
      const cardsArray = new Array;
      
          for(i=0; i<cardNames.length; i++ ) {          
            //This loop sets a ramdom data-name property foar each of the cards on the page
            // It's also give an id and sets the image source. 
                cardsArray.push(FactoryCard(i, cardNames[randomPosition[i]]));
                cardsArray[i].renderELement()
      }
       


// BUG HERE !!! A new card is generetade wen refresh game is caled, but this function below 
// it's caled twice and maintain the last image on top of the card, resuting in a logic bug.
// An aproach for this problem, could be refactoring the code, replacing the functios that 
// are used to create the cards by an object, and then nest the creatingFigure function 
// as an atribute of that object. Also maybe will be apropriate to make the html markup 
// of the cards dinamicaly  
 const createFigure = (name)=>{
    let newImg = document.createElement('img');
    newImg.src ="/img/"+name+".jpg";
    return newImg;
}

const enableClicks = () => cards.forEach(element => element.classList.remove('disable'));

const disableClicks = () => cards.forEach(element => element.classList.add('disable'));

const checkClicks = element => {
    if (clickCointer ==1) { 
        firstCard.id =  element.getAttribute("id");
        firstCard.name = element.getAttribute("data-name");     
     } else if (clickCointer == 2) {
        const secondCard = FactoryCardCheker(element.getAttribute("id"), element.getAttribute("data-name"));  
        console.log(secondCard.classList);
        disableClicks();
        checkCard(secondCard);  
     } 
}
const giveRotate = element => element.classList.add("rotate-card");

cards.forEach(element => {
    element.addEventListener("click", ()=> {
        clickCointer++;  
        giveRotate(element);
        checkClicks(element);
    } );   
});
const removeRotate = () => cards.forEach(element => element.classList.remove('rotate-card'));
let score = 0;
const updateScore = points => {
    const  displayScore = document.querySelector('.points');
    score += points;
    displayScore.innerText = score ;
}
const checkCard = (secondCard)=>{             
    if(firstCard.name === secondCard.name && firstCard.id !== secondCard.id){
        updateScore(10);
        hideCards(secondCard);
    } else setTimeout(resetBoard,900);
}
const hideCards = (secondCard) => {
    enableClicks();
    console.log('enabling...');
    const first = document.getElementById(firstCard.id)
    const second = document.getElementById(secondCard.id)
    first.style.visibility ="hidden";
    second.style.visibility="hidden";
    firstCard.id = "?";
    firstCard.name = "?";
    clickCointer =0;    
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
    'modal' :  document.createElement('div'),
     'modalTitle' : document.createElement('h2'),
     'buttonsContainer' :  document.createElement('div'),
     'backButton' : document.createElement('button'),
     'againButton' : document.createElement('button'),
     'imgBack' : document.createElement('img'),
     'imgReplay' : document.createElement('img'),
     'blackFilter' : document.createElement('div'),
    
     'deleteModal' : function() {
        body.removeChild(this.modal)
        body.removeChild(this.blackFilter)
    },

    'reloadGame' : function() {
       randomPosition =  randomUniqueArray(36);
       let iterator = 0;
       //This loop sets a ramdom data-name property foar each of the cards on the page
       // It's also give an id and sets the image source. 
       cards.forEach(element => {
           element.setAttribute("data-name",cardNames[randomPosition[iterator]]);
           element.setAttribute("id",iterator);
           let bakcCard = element.lastElementChild;
           bakcCard.appendChild(createFigure(cardNames[randomPosition[iterator]]));
           iterator++;
       });

        this.deleteModal();
        startGame();
    },

    'returnToMenu' : function() {
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
    
    // againButton.addEventListener('click', startGame);
    
    // 
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

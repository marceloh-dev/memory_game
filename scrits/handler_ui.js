
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
            this.firstClick = false;
            this.firstCard.disableClicks()
            
        }else {
            
            cardsArray.forEach(card => card.disableClicks())
           
            if(this.firstCard.id != cardObj.id && this.firstCard.name === cardObj.name){
                console.log('CHCKING', this.firstCard.name,cardObj.name)
                 cardsArray.forEach(card => card.enableClicks())
                this.firstClick = true;
                updateScore(10);
                this.firstCard.foundCard();
                cardObj.foundCard();
             } else {
                   
                    setTimeout(()=>{
                        console.log("removing...",)
                        cardsArray.forEach(card => card.removeRotate())
                        cardsArray.forEach(card => card.enableClicks())
                        
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
                    delet : function(){
                        this.parentDiv.remove()
                    }
                    ,
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
      
function setCardsPosition() {
    const randomPosition = randomUniqueArray(36);
    console.log(randomPosition);
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
 


let score = 0;

function updateScore(points) {
    const  displayScore = document.querySelector('.points');
    score += points;
    displayScore.innerText = score ;
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
    deletCards();
    changeCardsPosition()
    cardsArray.forEach( element=> element.renderCard());
    
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
                    <img src= ${src1} 
             </button> 
             <button class='replayButton' onclick='reloadGame(),gameOverModal.delet()' > 
                <img src= ${src2}  
             </button> 
             `;

             const backButton = document.querySelector('.back-button');
             const replayButton = document.querySelector('.replayButton');

            //  backButton.addEventListener

        }
        getDomReference(element) {
            if(element == modal || element == buttonsContainer) {
                if(element== modal) {
                    return this.modal
                } else return this.buttonsContainer
            } else {
                return 'ERROR! Only the words modal or buttonsContainer are acept as a parameter';
            }
            
        }

    
}

const gameOverModal = new Modal('Game Over','gameOver');
gameOverModal.renderButtons('/img/back.png', '/img/refresh.png') 



// class gameOverModal extends Modal  {
     
//      constructor(title,classCSS, ) 
//      super(title, classCSS)

//      backButton = document.createElement('button');
//      againButton = document.createElement('button');
//      imgBack = document.createElement('img');
//      imgReplay = document.createElement('img');
   

//     reloadGame() {

//         this.deleteModal();
//         deletCards();
//         changeCardsPosition()
//         cardsArray.forEach( element=> element.renderCard());
//         resetBoard();
//         removeRotate();
//     }

//     returnToMenu() {
//         this.deleteModal();
//         renderSecondMenu();
//     }

//     renderModal() {

//         this.render()
//         this.backButton.addEventListener('click',this.returnToMenu.bind(gameOverModal))
//         this.againButton.addEventListener('click', this.reloadGame.bind(gameOverModal))


//         this.imgReplay.setAttribute("src", "/img/refresh.png");
//         this.imgBack.setAttribute("src", "/img/back.png");

//         this.imgReplay.classList.add('replayButton');
//         this.imgBack.classList.add('back-button');

//         this.buttonsContainer.appendChild(this.backButton);
//         this.buttonsContainer.appendChild(this.againButton);
//         this.backButton.appendChild(this.imgBack);
//         this.againButton.appendChild(this.imgReplay);
//     }
// }


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

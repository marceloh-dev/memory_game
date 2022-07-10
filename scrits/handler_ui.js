const cards = document.querySelectorAll(".board > div");
let clickCointer = 0 ;

const FactoryCard = (id, name)=> {
 return  {
        "id": id,
        "name" : name,
        "getDomLocation" : function () {
            const domLocation = document.getElementById(this.id)
            return domLocation
        } 
    }
}
let firstCard = FactoryCard("?","?");


const presidents = [
    'Bolsonaro','Temer','Dilma','Lula', 'Fernando Henrique', 'Itamar', 
    'Collor', 'Sarney','Tancredo', 'Gen. Joao Figueiredo', 'Gen. Ernesto Geisel','Gen Emílio Médici',
    'Gen. Costa e Silva','Gen Castelo Branco', 'Gen. Ranieri Mazzilli','João Goulart','Jânio Quadros', 
    'Juscelino Kubitschek',' Nereu Ramos','Carlos Luz','Café Filho', 'Getúlio Vargas', 'Gaspar Dutra',
    'José Linhares','Júlio Prestes', 'Washington Luís','Arthur Bernardes','Epitáfio Pessoa','Delfim Moreira'
]

const cardNames = [
    'Bolsonaro','Temer','Dilma','Lula', 'Fernando_Henrique', 'Itamar', 
    'Collor', 'Sarney','Tancredo', 'Gen_Joao_Figueiredo', 'Gen_Ernesto_Geisel','Gen_Emílio_Médici',
    'Gen_Costa_e_Silva','Gen_Castelo_Branco', 'Gen_Ranieri_Mazzilli','João_Goulart','Jânio_Quadros', 
    'Juscelino_Kubitschek', 'Bolsonaro','Temer','Dilma','Lula', 'Fernando_Henrique', 'Itamar', 
    'Collor', 'Sarney','Tancredo', 'Gen_Joao_Figueiredo', 'Gen_Ernesto_Geisel','Gen_Emílio_Médici',
    'Gen_Costa_e_Silva','Gen_Castelo_Branco', 'Gen_Ranieri_Mazzilli','João_Goulart','Jânio_Quadros', 
    'Juscelino_Kubitschek',
];

console.log(cardNames.length)

function randomUniqueArray(range) {
    const arr = []
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

 const randomPosition =randomUniqueArray(36)
console.log(randomPosition)
 const createFigure = (name)=>{
    let newImg = document.createElement('img');
    newImg.src ="/img/"+name+".jpg";
    return newImg
}

let iterator = 0;
//This loop sets a ramdom data-name property foar each of the cards on the page
// It's also give an id and sets the image source. 
cards.forEach(element => {
    element.setAttribute("data-name",cardNames[randomPosition[iterator]]);
    element.setAttribute("id",iterator);
    let bakcCard = element.lastElementChild;
    bakcCard.appendChild(createFigure(cardNames[randomPosition[iterator]]));
    iterator++

})
const enableClicks = () => cards.forEach(element => element.classList.remove('disable'))

const disableClicks = () => cards.forEach(element => element.classList.add('disable'))

const checkClicks = element => {
    if (clickCointer ==1) { 
        firstCard.id =  element.getAttribute("id");
        firstCard.name = element.getAttribute("data-name");     
     } else if (clickCointer == 2) {
        const secondCard = FactoryCard(element.getAttribute("id"), element.getAttribute("data-name"));  
        console.log(secondCard.classList);
        disableClicks()
        checkCard(secondCard);  
     } 
}
const giveRotate = element => element.classList.add("rotate-card");

cards.forEach(element => {
    element.addEventListener("click", ()=> {
        clickCointer++;  
        giveRotate(element)
        checkClicks(element)
    } );   
});
const removeRotate = () => cards.forEach(element => element.classList.remove('rotate-card'))


const checkCard = (secondCard)=>{
                
               if(firstCard.name === secondCard.name && firstCard.id !== secondCard.id){
                console.log("EQUAL!!!!!")
                console.log("SAVING.....")
                hideCards(secondCard)
               }
              else{
                console.log("IS NOT EQUAL!!!!!")
                setTimeout(resetBoard,900);
                
              }
}
const hideCards = (secondCard) => {
    enableClicks()
    console.log('enabling...')
    const first = document.getElementById(firstCard.id)
    const second = document.getElementById(secondCard.id)
    first.style.visibility ="hidden";
    second.style.visibility="hidden";
    firstCard.id = "?"
    firstCard.name = "?"
    clickCointer =0;    
   
}
const resetBoard = ()=>{
        removeRotate()
        clickCointer=0; 
        enableClicks()
}


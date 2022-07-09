const cards = document.querySelectorAll(".board > div");
let clickCointer = 0 ;

const FactoryCard = (id, name)=> {
 return  {
        "id": id,
        "name" : name
    }
}
let firstCard = FactoryCard("?","?");

const FactoryDomCard = (id , dataName)=> {
    return {
    "id": id, 
    "dataName":  dataName,  
    }
}

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

 const createFigure = (name)=>{
    let newImg = document.createElement('img');
    newImg.src ="/img/"+name+".jpg";
    return newImg
}


let iterator = 0;
//This loop sets a ramdom data-name property foar each of the cards on the page
// It's also give an id and sets the image source.
cards.forEach(element => {
    iterator++
    element.setAttribute("data-name",cardNames[randomPosition[iterator]]);
    element.setAttribute("id",iterator);
    let bakcCard = element.lastElementChild;
    bakcCard.appendChild(createFigure(cardNames[randomPosition[iterator]]));

})


cards.forEach(element => {

    element.addEventListener("click", ()=> {
        clickCointer++;  
        // let cardName = card.getAttribute("data-name");
        // const card1 = FactoryCard(clickCointer,cardName);
        element.classList.add("rotate-card");
        if (clickCointer ==1) { 
            firstCard.id =  element.getAttribute("id");
            firstCard.name = element.getAttribute("data-name");   
         } else if (clickCointer == 2) {
            const secondCard = FactoryCard(element.getAttribute("id"), element.getAttribute("data-name"));  
            console.log(secondCard);
            checkCard(secondCard);
         }
            
    } );   
});


const checkCard = (secondCard)=>{
               if(firstCard.name === secondCard.name){
                console.log("EQUAL!!!!!")
                console.log("SAVING.....")
                saveCards(secondCard)
               }
              else{
                console.log("IS NOT EQUAL!!!!!")
                setTimeout(resetBoard,900);
              }
}
const saveCards = (secondCard) => {
    const first = document.getElementById(firstCard.id)
    const second = document.getElementById(secondCard.id)
    const firstChild1 = first.children[0];
    const firstChild2 = first.children[1];
    const secondChild1 = second.children[0];
    const secondChild2 = second.children[1];
    
    first.style.visibility ="hidden";
    second.style.visibility="hidden";
    firstCard.id = "?"
    firstCard.name = "?"
    clickCointer =0;

}
const resetBoard = ()=>{
        cards.forEach(element =>  element.classList.remove("rotate-card"));
        clickCointer=0;

}


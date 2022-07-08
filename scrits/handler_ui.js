const cards = document.querySelectorAll(".board > div");
let clickCointer = 0 ;

const FactoryCard = (id, name)=> {
 return  {
        "id": id,
        "name" : name
    }
}
let firstCard = FactoryCard("?","?");

cards.forEach(element => {
    const card = element;
  
   
    card.addEventListener("click", ()=> {
        clickCointer++;  
        // let cardName = card.getAttribute("data-name");
        // const card1 = FactoryCard(clickCointer,cardName);
        card.classList.add("rotate-card");
        if (clickCointer ==1) { 
            firstCard.id =  card.getAttribute("id");
            firstCard.name = card.getAttribute("data-name");

            
         } else if (clickCointer == 2) {
            const secondCard = FactoryCard(card.getAttribute("id"), card.getAttribute("data-name"))
            
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
    // first.classList.add("filped");
    // firstChild1.classList.add("filped");
    // firstChild2.classList.add("filped");
    // second.classList.add("filped");
    // secondChild1.classList.add("filped");
    // secondChild2.classList.add("filped");

    firstCard.id = "?"
    firstCard.name = "?"
    clickCointer =0;

}
const resetBoard = ()=>{
        cards.forEach(element =>  element.classList.remove("rotate-card"));
        clickCointer=0;

}


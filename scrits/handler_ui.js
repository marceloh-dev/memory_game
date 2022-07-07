const cards = document.querySelectorAll(".board > div");

cards.forEach(element => {
    const card = element;
    card.addEventListener("click", ()=> card.classList.add("rotate-card") );   
});

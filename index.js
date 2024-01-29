console.log("Script loaded");

let selectedCard;

function selectCard(card) {
    console.log("Card selected:", card.innerText);
    const cards = document.querySelectorAll('.container .item');
    cards.forEach((c) => c.classList.remove('selected'));

    card.classList.add('selected');

    selectedCard = card.innerText;
}
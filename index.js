let selectedCard;

function selectCard(card) {
    console.log("Card selected:", card.innerText);
    const cards = document.querySelectorAll('.container .item');
    cards.forEach((c) => c.classList.remove('selected'));

    card.classList.add('selected');

    selectedCard = card.innerText;
}

// document.getElementById('generate-link').addEventListener('click', () => {
//     console.log("TESTING");

//     var currentUrl = window.location.href;

//     var linkElement = document.createElement('a');
//     linkElement.href = currentUrl;
//     linkElement.textContent = 'Share this page'; 
//     linkElement.setAttribute('target', '_blank');

//     var container = document.getElementById('generate-link');
//     container.parentNode.replaceChild(linkElement, container);
   
// });
let selectedCard;

function selectCard(card) {
    console.log("Card selected:", card.innerText);
    const cards = document.querySelectorAll('.container .item');
    cards.forEach((c) => c.classList.remove('selected'));

    card.classList.add('selected');

    selectedCard = card.innerText;
};

function setUsername(form) {
    let username = document.getElementById('name').value
    let pass = false
    for (let x = 0; x < username.length; x++) {
        if (username.charAt(x) !== " ") {
            pass = true;
        };
    };
    if (1 > username.length || username.length > 12 || pass == false) {
        document.getElementById("usernameError").style.visibility = "visible";
    } else {
        sessionStorage.setItem("username", `${username}`);
        location.assign("MainPage.html");
    }
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
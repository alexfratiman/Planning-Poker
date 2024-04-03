const socket = io('ws://localhost:3500');

let selectedCard;

function selectCard(card) {
    console.log("Card selected:", card.innerText);
    const cards = document.querySelectorAll('#card-container .item');
    cards.forEach((c) => c.classList.remove('selected'));

    card.classList.add('selected');

    selectedCard = card.innerText;

    socket.emit('message', `${sessionStorage.getItem("username")}:${card.innerText}`);
}

function submitVote() {
    if(selectedCard !== undefined) {
        socket.emit('submit vote', {selectedCard: selectedCard});
    }
    else {
        alert("Please select a card to submit!");
    }
}

function setUsername(form) {
    let username = document.getElementById('name').value;
    let pass = false;
    for (let x = 0; x < username.length; x++) {
        if (username.charAt(x) !== " ") {
            pass = true;
        }
    }
    if (1 > username.length || username.length > 12 || pass == false) {
        document.getElementById("usernameError").style.visibility = "visible";
    } else {
        sessionStorage.setItem("username", `${username}`);
        location.assign("MainPage.html");
    }
}

function checkConsensus(arrayOfObjects) {
    const firstVote = arrayOfObjects[0].vote;
    const consensus = arrayOfObjects.every((object) => object.vote === firstVote);
    consensus ? document.getElementById("yes").style.color = "green" : document.getElementById("no").style.color = "red";
    consensus ? document.getElementById("yes").style.border = "3px solid green" : document.getElementById("no").style.border = "3px solid red";

    console.log("Consensus:", consensus); // Debugging: Log consensus value

}

// test data
// votes = [{"name": "john",
//             "vote": 13},
//         {"name": "alex",
//         "vote": 13},
//         {"name": "jade",
//         "vote": 2}]

function calculateAverage (arrayOfObjects) {
    const sum = arrayOfObjects.reduce((accumulator, currentValue) => accumulator + currentValue.vote, 0);
    const numOfVotes = arrayOfObjects.length;
    const aveVote = sum / numOfVotes;
    document.getElementById("ave-number").innerHTML = aveVote.toFixed(2);
}

//CONTACT US BUTTON FUNCTION
function openEmailClient() {
    var emailAddress = 'andrew.jarrett@axahealth.co.uk, alex.fratiman@axahealth.co.uk, alex.kennedy@axahealth.co.uk';
    var subject = 'Inquiry';
    var body = 'Dear Team,\n\nI have the following inquiry:\n\n';
    var mailtoLink = 'mailto:' + emailAddress + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailtoLink;
    console.log("Email client opened");
  }

// Function to generate a random alphanumeric ID
function generateUniqueID() {
    return Math.random().toString(36).substring(2, 10);
}

// Function to generate and display the invite link
function generateInviteLink() {
    const gameID = generateUniqueID();
    const gameLink = window.location.origin + '/game.html?id=' + gameID;
    document.getElementById('game-link').value = gameLink;
}

// Generate the invite link when the page is loaded
window.onload = generateInviteLink;

let counter = 0;

socket.on('message', (data) => {
  const colonIndex = data.indexOf(':');
  const un = data.slice(0, colonIndex);
  const num = data.slice(colonIndex + 1);
  counter++;
  const player = document.createElement('tr');
  player.setAttribute('id', `player${counter}`);
  const username = document.createElement('td');
  username.setAttribute('id', `username-result`);
  const vote = document.createElement('td');
  vote.setAttribute('id', `vote-result`);
  vote.textContent = num;
  username.textContent = un;
  document.getElementById('players').appendChild(player);
  document.getElementById(`player${counter}`).appendChild(username);
  document.getElementById(`player${counter}`).appendChild(vote);

  console.log("Received message:", data);
})

// COPY INVITE LINK FUNCTION
function copyLinkToClipboard() {
    var inputElement = document.getElementById("game-link");
    inputElement.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");

    console.log("Link copied to clipboard:", inputElement.value);
}

//Waiting for players -- to be contained within submit button js
//let allReady = true
//let checking = true

// function readinessCheck() {
//     for (let i = 0; i < /*number of people in session */; i++) {
//         if (!/*hasVoted*/) {
//             allReady = false
//         }
//     }
//     if(allReady = false) {
//       document.getElementById("Waiting").style.visibility = "visible"
//     } else {
//         clearInterval(waitingChecker)
//     }}

// waitingChecker = setInterval(readinessCheck(), 1000)
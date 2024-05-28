const socket = io('ws://localhost:3500');

let selectedCard;

function selectCard(card) {
    console.log("Card selected:", card.innerText);
    const cards = document.querySelectorAll('#card-container .item');
    cards.forEach((c) => c.classList.remove('selected'));

    card.classList.add('selected');

    selectedCard = card.innerText;

}

// track if we have voted to toggle the waiting for players message
var voted = false;

function submitVote() {
    if(selectedCard !== undefined) {
        const params = new URL(document.location.toString());

        socket.emit('submit vote', {
            selectedCard: selectedCard, 
            username: sessionStorage.getItem("username"), 
            sessionID: params.searchParams.get("id")
        });
        voted = true;
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
        // Attempt to read the sessionID from the current page URL
        const params = new URL(document.location.toString());
        // If there was a sessionID in the URL, you should use it (LinkPage), 
        // if not, generate one (LandingPage)
        const sessionID = params.searchParams.has('id') ? params.searchParams.get('id') : generateUniqueID();

        socket.emit('join session', {username: username, sessionID: sessionID });
        // Redirect to the session page with the sessionID in the URL
        // So that when the next page loads, we still know which session we joined.
        location.assign(`MainPage.html?id=${sessionID}`);
    }

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
    
    //  pull the invite link from URL if already exists on page
    // 
    // const params = new URL(document.location.toString());
    // document.getElementById('game-link').value = `${window.location.origin}/app/LinkPage.html?id=${params.searchParams.get('id')}`;
}

window.onload = generateInviteLink;

//participants will be an array of objects, with each object representing a user's username and sessionID
var participants = [];

socket.on('vote complete', (data) => {
    // Vote complete is sent when the server sees that all 
    // participants have submitted their votes.
    // 
    console.log('vote complete', data);
    participants = data;
});


let counter = 0;


// COPY INVITE LINK FUNCTION
function copyLinkToClipboard() {
    var inputElement = document.getElementById("game-link");
    inputElement.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");

    console.log("Link copied to clipboard:", inputElement.value);
}

socket.on('vote received', () =>{
    document.getElementById("Waiting").style.visibility = "visible";
  });
  
  socket.on('vote complete', () =>{
    document.getElementById("Waiting").style.visibility = "hidden";
    document.getElementById("ave-number").innerHTML = window.calculateAverage(participants);
    if(window.checkConsensus(participants)){
        document.getElementById("yes").style.color = "green";
        document.getElementById("yes").style.border = "3px solid green";
        document.getElementById("no").style.color = "grey";
        document.getElementById("no").style.border = "3px solid #d9d9d9";
    } else {
        document.getElementById("yes").style.color = "grey";
        document.getElementById("yes").style.border = "3px solid #d9d9d9";
        document.getElementById("no").style.color = "red";
        document.getElementById("no").style.border = "3px solid red";
    };

participants.sort((participantA, participantB) => {
    return participantA.vote - participantB.vote;
});

document.getElementById('players').innerHTML = '';
for(let i=0; i<participants.length; i++) {
    const row = document.createElement('tr');
    const username = document.createElement('td');
    const vote = document.createElement('td');
    vote.textContent = participants[i].vote;
    username.textContent = participants[i].username;
    row.appendChild(username);
    row.appendChild(vote);
    document.getElementById('players').appendChild(row);
}
  });
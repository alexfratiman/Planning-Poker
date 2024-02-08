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

function checkConsensus(arrayOfObjects) {
    const firstVote = arrayOfObjects[0].vote;
    // takes the first object in the array and selects the value in the vote property of that object's, and saves it in a firstvote variable, that we will compare the following votes with for consensus yes/no
    const consensus = arrayOfObjects.every((object) => object.vote === firstVote);
    // every() returns true if every named element in the array, this time each of the objects' vote attribute, matches the criteria, this time being equal to the first vote
    consensus ? document.getElementById("yes").style.color = "green" : document.getElementById("no").style.color = "red";
    consensus ? document.getElementById("yes").style.border = "3px solid green" : document.getElementById("no").style.border = "3px solid red";

}

// example json:
// votes = [{"name": "john",
//             "vote": 13},
//         {"name": "alex",
//         "vote": 13},
//         {"name": "jade",
//         "vote": 2}]

function calculateAverage (arrayOfObjects) {
    const sum = arrayOfObjects.reduce((accumulator, currentValue) => accumulator + currentValue.vote, 0)
    // the accumulator at the next run instance gets assigned whatever is returned from the previous run time; it's not a consistent variable
    // the 0, initialValue, acts like a value from the previous run that's gonna be used for the first run
    // the reduce function gets us from many to less; it reduces an array
    const numOfVotes = arrayOfObjects.length
    const aveVote = sum / numOfVotes
    document.getElementById("ave-number").innerHTML = aveVote.toFixed(2)
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

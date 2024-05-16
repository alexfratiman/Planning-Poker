function checkConsensus(arrayOfObjects) {
    const firstVote = arrayOfObjects[0].vote;
    const consensus = arrayOfObjects.every((object) => object.vote === firstVote);
    return consensus;
}

function calculateAverage (arrayOfObjects) {
    const sum = arrayOfObjects.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.vote), 0);
    const numOfVotes = arrayOfObjects.length;
    const aveVote = sum / numOfVotes;
    return aveVote.toFixed(2);
}

//used to access the functions from jest
window.calculateAverage = calculateAverage;
window.checkConsensus = checkConsensus;

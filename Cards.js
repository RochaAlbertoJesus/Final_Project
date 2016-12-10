/**
 * Created by Berto on 12/6/16.
 */

//Object: This object is meant to help create pairs of strings, numbers, etc.
function dictionary() {

    //property database array type
    this.dataBase = [];

    //Add function adds to the dictionary variable key value pair
    this.add = function (key , value) {

        if(key && value){

            this.dataBase.push({
                key : key,
                value : value
            });

            return this.dataBase;
        }
    }

    //Size function returns size of the dictionary
    this.size = function () {

        return this.dataBase.length;

    }

    //Clear function removes the dictionary completely
    this.clear = function () {

        this.dataBase = [];

    }

    //Find function finds the string in the dictionary
    this.find = function (string) {

        for(var i = 0 ; i< this.dataBase.length ; i++){

            var key = this.dataBase[i].key;

            if(key === string){

                return this.dataBase[i].value;

            }
        }
    }


    //IndexValueAt function returns the value at a given index
    this.indexValueAt = function(value){

        return this.dataBase[value].value;
    }

    //IndexKeyAt function returns the key at a given index
    this.indexKeyAt = function(key){

        return this.dataBase[key].key;
    }

    //EditKeyAt function changes the key with the given String at a given index
    this.editKeyAt = function (key , string) {

        this.dataBase[key].key = string;

    }

    //EditValueAt function changes the value with the given String at a given index
    this.editValueAt = function (value , string) {

        this.dataBase[value].value = string;

    }

    //Exist function returns a boolean if a given parameter exists in the dictionary
    this.exist = function (value) {

        for(var i =0 ; i < this.dataBase.length ; i++){
            var key = this.dataBase[i].key;

            if(key === value.trim()){

                return true;
            }
        }

        return false;
    }


};


//Used as our current Set
var currentSet = new dictionary();

//Used as our current deck
var currentDeck = new dictionary();

//The array that will be used when the used toggles shuffle on
var shuffleArray = [];

//This counter is used to traverse through our current deck
var counter = 0;

//This counter is used to traverse through our current deck
var counterSet = 0;

//RandomInteger function returns an array of random numbers. The length of the array depends on the parameter given
function randomInteger(max) {

    var arrayOfIntegers = [];
    var counter = 0 ;

    while(counter < max ){

        var ranNum = Math.floor(Math.random() * max);

        if(arrayOfIntegers.indexOf(ranNum) === -1){

            arrayOfIntegers.push(ranNum);
            counter++;

        }
    }

    return arrayOfIntegers;
}

//CheckEmptyString is used to check if a parameter is an empty string or null and returns a boolean
function checkEmptyString(value) {

    if(value === "" || value === null) {

       return true;
    }else{
        return false;
    }

}



// This function initializes the current deck and set
function start() {

    currentDeck.add("What is the capital of California?" , "Sacramento");
    currentDeck.add("What is the capital of Oregon?" , "Salem");
    currentDeck.add("What is the capital of Washington?" , "Olympia");
    currentDeck.add("What is the capital of New York?" , "Albany");
    currentSet.add("State Capitals" , currentDeck);
    document.getElementById('text').innerHTML = currentDeck.indexKeyAt(counter);
    document.getElementById('currentdeck').innerHTML = currentSet.indexKeyAt(counterSet);
    shuffleArray = randomInteger(currentDeck.size());

}


//Back traverse backwards on the current deck
function back() {

    counter--;
     if(document.getElementById('shuffleison').checked){
         if(counter < 0) {

            counter = 0;
         }

        document.getElementById('text').innerHTML = currentDeck.indexKeyAt(shuffleArray[counter]);
        document.getElementById('flipbutton').value = "Flip Question";

     }else {

        if (counter < 0) {

            counter = 0;
        }

        document.getElementById('text').innerHTML = currentDeck.indexKeyAt(counter);
        document.getElementById('flipbutton').value = "Flip Question";

    }
}

//Flip turns the question to answer and vise-vera
function flip() {

    if(this.value === "Flip Question") {
        document.getElementById('text').innerHTML = currentDeck.indexValueAt(counter);
        this.value = "Flip Answer";
    }
    else if (this.value === "Flip Answer"){

        document.getElementById('text').innerHTML = currentDeck.indexKeyAt(counter);
        this.value = "Flip Question";

    }


}

//Next traverse frontwards on the current deck
function next() {
    counter++;
     if(document.getElementById('shuffleison').checked){
         if(counter >= currentDeck.size()) {

             counter = 0;
         }
         document.getElementById('flipbutton').value = "Flip Question";
         document.getElementById('text').innerHTML = currentDeck.indexKeyAt(shuffleArray[counter]);


     }else {


        if (counter >= currentDeck.size()) {

            counter = 0;
        }
        document.getElementById('flipbutton').value = "Flip Question";
        document.getElementById('text').innerHTML = currentDeck.indexKeyAt(counter);

    }

}

//AddDeck and a new deck to the dictionary
function addDeck() {
    var temp = new dictionary();

    var question = document.getElementById('newdeckquestion').value;
    var answer = document.getElementById('newdeckanswer').value;
    var deckName = document.getElementById('newdeckname').value;

    if(checkEmptyString(question) || checkEmptyString(answer) || checkEmptyString(deckName)){
        document.getElementById('popupadddeck').classList.toggle('show');
    }else {
        temp.add(question, answer);
        currentSet.add(deckName, temp);
        document.getElementById('newdeckquestion').value = "";
        document.getElementById('newdeckanswer').value = "";
        document.getElementById('newdeckname').value = "";
    }




}

//AddCard adds new cards to the current deck
function addCards() {

    var newQuestion = document.getElementById('addcardquestion').value;
    var newAnswer = document.getElementById('addcardanswer').value;

    if(checkEmptyString(newQuestion) || checkEmptyString(newAnswer)){
        document.getElementById('popupaddcard').classList.toggle('show');
    }else{
        currentDeck.add(newQuestion, newAnswer);
        document.getElementById('addcardquestion').value = "";
        document.getElementById('addcardanswer').value ="";
    }



}

//ChangeDeck traverse frontwards only on the currentSet
function changeDeck() {



    counter = 0;

    if(counterSet >= currentSet.size()){

        counterSet = 0;
        currentDeck = currentSet.indexValueAt(counterSet);

    }else{

        currentDeck = currentSet.indexValueAt(counterSet);

    }

    document.getElementById('currentdeck').innerHTML = currentSet.indexKeyAt(counterSet);
    document.getElementById('text').innerHTML = currentDeck.indexKeyAt(counter);
    counterSet++;

    shuffleArray = randomInteger(currentDeck.size());
}

//EditQuestion allows the user to make changes to the current card
function editquestion() {

    var newQuestion = document.getElementById('editquestion').value;

   if(checkEmptyString(newQuestion)){

       document.getElementById('popupeditquestion').classList.toggle('show');
   }else{

       currentDeck.editKeyAt(counter , newQuestion);
       document.getElementById('text').innerHTML = currentDeck.indexKeyAt(counter);
       document.getElementById('editquestion').value = "";

   }
}

//EditAnswer allows the user to make changes to the current card
function editAnswer() {

    var newAnswer = document.getElementById('editanswer').value;
    if(checkEmptyString(newAnswer)){

        document.getElementById('popupeditanswer').classList.toggle('show');

    }else{

        currentDeck.editValueAt(counter , newAnswer);
        document.getElementById('text').innerHTML = currentDeck.indexValueAt(counter);
        document.getElementById('editanswer').value = "";

    }
}


//CheckShuffle checks if the shuffle toggle has been moved
function checkedShuffle() {

    if(document.getElementById('shuffleison').checked){

        document.getElementById('shufflediv').style.backgroundColor = "#ccc";
        document.getElementById('btnshuffle').innerHTML = "Shuffle : ON";
        shuffleArray = randomInteger(currentDeck.size());

    }else{

        document.getElementById('shufflediv').style.backgroundColor =  "#2196F3";
        document.getElementById('btnshuffle').innerHTML = "Shuffle : OFF";

    }
}

//VideoSwitch checks if the video control toggle has been moved
function videoSwitch() {

    if(document.getElementById('videoswitch').checked){

        document.getElementById('sitebackground').controls = true;
        document.getElementById('videodiv').style.backgroundColor = "#ccc";
        document.getElementById('btnvideocontrol').innerHTML = "VideoControls : ON";

    }else{

        document.getElementById('sitebackground').controls = false;
        document.getElementById('videodiv').style.backgroundColor =  "#2196F3";
        document.getElementById('btnvideocontrol').innerHTML = "Video Controls : OFF";

    }
}



//Calls start
start();


//Adds Events Listners to the following buttons
document.getElementById('backbutton').addEventListener("click" , back);
document.getElementById('nextbutton').addEventListener("click", next);
document.getElementById('flipbutton').addEventListener("click" , flip);

//initialize firebase
var firebaseConfig = {
    apiKey: "AIzaSyB-8ySyXCgPmks7hDrfI7-u4OnTArKUddI",
    authDomain: "trainscheduler-676dc.firebaseapp.com",
    databaseURL: "https://trainscheduler-676dc.firebaseio.com",
    projectId: "trainscheduler-676dc",
    storageBucket: "trainscheduler-676dc.appspot.com",
    messagingSenderId: "73358616141",
    appId: "1:73358616141:web:c626c91ecd2fe2b0"
};

firebase.initializeApp(firebaseConfig);

//variables
let database = firebase.database();
let trainName;
let destination;
let trainTime;
let frequency;


//create an event handler to store user input in variables, then firebase, and then display onto the table. 
$("#submit").on("click", function (){
  //isolates the text entered by user and stores it in a variable
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    trainTime = $("#train-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

  //empties the input boxes to avoid user needing to backspace
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");

  //pushes variable information to the firebase database and stores it there
    database.ref().push({
        trainName : trainName,
        destination : destination, 
        trainTime : trainTime,
        frequency : frequency,
        trainNumber : trainNumber
    })
  
  //variable making a new row in a table with the information from each input area
    let addRow = " <tr><td>" + trainName + "<td>" + destination + "<td>" + frequency + "<td>" + "placeholder" + "<td>" + "placeholder" + "</tr>";
  
  //appending the aforementioned markup to DOM 
    $("#display-table").append(addRow);
})


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
  event.preventDefault();
  //isolates the text entered by user and stores it in a variable
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    trainTime = $("#train-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    let newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: trainTime,
      frequency: frequency
    }

  //empties the input boxes to avoid user needing to backspace
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");

  //pushes variable information to the firebase database and stores it there
    database.ref().push(newTrain);
  
    database.ref().on("child_added", function(childSnapshot) {
      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var trainTime = childSnapshot.val().firstTrain;
      var frequency = childSnapshot.val().frequency;

    })
  
    // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log("firstTimeConverted: " + firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  //variable making a new row in a table with the information from each input area
    let addRow = " <tr><td>" + newTrain.name + "<td>" + destination + "<td>" + frequency + "<td>"  + moment(nextTrain).format("hh:mm") + "<td>" + tMinutesTillTrain + "</tr>";
  
  //appending the aforementioned markup to DOM 
    $("#display-table").html(addRow);

})


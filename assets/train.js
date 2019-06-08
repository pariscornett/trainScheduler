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

//create an event handler to store user input in variables, and display them into the table. 
$("#submit").on("click", function (){
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    trainTime = $("#train-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    database.ref().set({
        trainName : trainName,
        destination : destination, 
        trainTime : trainTime,
        frequency : frequency
    })
})

// database.ref().on("value", function(snapshot){
//     console.log(snapshot.val())
// })
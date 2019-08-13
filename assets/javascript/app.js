const firebaseConfig = {
  apiKey: "AIzaSyB2Dg9Z-fYBVrWFGTQXOF1K3QPCJg4Of4U",
  authDomain: "train-schedule-4284e.firebaseapp.com",
  databaseURL: "https://train-schedule-4284e.firebaseio.com",
  projectId: "train-schedule-4284e",
  storageBucket: "https://train-schedule-4284e.firebaseio.com/",
  messagingSenderId: "386099410767",
  appId: "1:386099410767:web:0504ab4f85449969"
};
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database();
  let name = ""
  let destination = ""
  let trainTimes = ""
  let reccurence = ""
  $("#submit-train").on("click", function(event){
    event.preventDefault();
    name = $("#train-name").val().trim()
    destination = $("#destination").val().trim()
    trainTimes = moment($("#first-train").val().trim(),"HH:mm").subtract(1,"years").format("X")
    reccurence = $("#frequency").val().trim()
    database.ref().push({
        name: name,
        destination: destination,
        trainTimes: trainTimes,
        reccurence: reccurence
    });
    $("#train-name").val("")
    $("#destination").val("")
    $("#first-train").val("")
    $("#frequency").val("")
  });
  database.ref().on("child_added", function(snapshot){
    $("#train-name").text(snapshot.val().name)
    $("#destination").text(snapshot.val().destination)
    $("#first-train").text(snapshot.val().trainTimes)
    $("#frequency").text(snapshot.val().recurrence)

    let remainder = moment().diff(moment(trainTimes,"X"),"minutes") % reccurence
    let minutes = reccurence - remainder
    let arrival = moment().add(minutes,"minutes").format("hh:mm A")
    let newTr = $("<tr>")
    newTr.html(`<td>${name}</td><td>${destination}</td><td>${reccurence}</td><td>${arrival}</td><td>${minutes}</td>`)
    $("#main-holder").append(newTr)
    
    
  })
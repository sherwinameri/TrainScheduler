  // JS

  // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCECht1h-fF_PJRPav6woTKYkx_T2BpuTE",
    authDomain: "testproject-7d352.firebaseapp.com",
    databaseURL: "https://testproject-7d352.firebaseio.com",
    projectId: "testproject-7d352",
    storageBucket: "testproject-7d352.appspot.com",
    messagingSenderId: "1022465052580"
    };
    firebase.initializeApp(config);

    // variable to reference the database.
    var database = firebase.database();

    // initial Values
    var name = "";
    var destination = "";
    var firstTrainTime = "";
    var frequency = "";

    // button click
    $("#add-train").on("click", function(event) {
      event.preventDefault();

      // get values from text boxes
      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstTrainTime = moment($("#first-train-time").val().trim()).format('HH:mm a');
      frequency = $("#frequency").val().trim();

      // Not Completed: moment.js must be used in order to compare/calculate difference between current time and next train, based off of the frequency/train time info gathered above

      // push
      database.ref().push(
      {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // log previous data
      console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.firstTrainTime);
      console.log(sv.frequency);

      // HTML changes
       $("#train-name-display").text(sv.trainName);
       $("#destination-display").text(sv.destination);
       $("#first-train-time-display").text(sv.firstTrainTime);
       $("#frequency-display").text(sv.frequency);

      // errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
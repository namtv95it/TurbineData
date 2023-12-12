  // Scripts for firebase and firebase messaging
  importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-analytics.js');
  importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js')




  // Initialize the Firebase app in the service worker by passing the generated config
  var firebaseConfig = {
    apiKey: "AIzaSyDVI3VEl4PluXzOUqylYk-IDhwCUe9WtdY",
    authDomain: "test-project-cefb5.firebaseapp.com",
    projectId: "test-project-cefb5",
    storageBucket: "test-project-cefb5.appspot.com",
    messagingSenderId: "163231538022",
    appId: "1:163231538022:web:23af401a41618f065446a7",
    measurementId: "G-L9RKVNKSQ6"
  };
    
  firebase.initializeApp(firebaseConfig);

  const message = firebase.messaging()
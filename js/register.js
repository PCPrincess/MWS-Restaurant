
//REGISTER SERVICE WORKER HERE

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
      .then(console.log("Service Worker Successfully Registered"))
      .catch(error => console.log("Service Worker Registration Failed " + error));

}
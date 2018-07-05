
//REGISTER SERVICE WORKER HERE

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js')
      .then(console.log("Service Worker Successfully Registered"))
      .catch(error => console.log("Service Worker Registration Failed " + error));

}
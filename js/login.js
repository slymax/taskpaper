$(document).ready(function(){
  var client = new Dropbox.Client({ key: "xl9k48bu88uvp10" });
  client.authenticate({interactive: false}, function(error, client) {
    if (error) {
      return handleError(error);
    }
    if (client.isAuthenticated()) {
      window.location.replace("./go/index.html");
    } else {
      var button = document.querySelector("#login-button");
      button.addEventListener("click", function() {
        client.authenticate(function(error, client) {
          if (error) {
            return handleError(error);
          }
          window.location.replace("./go/index.html");
        });
      });
    }
  });
});
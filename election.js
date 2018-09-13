document.addEventListener("DOMContentLoaded", function() {
  var candidatesList = document.querySelector(".candidate-list");
  var status = document.querySelector("#status");
  var refresh = document.querySelector("#refresh");

  refresh.addEventListener("click", function() {
    console.log("refresh!");

    $.ajax({
      url: "https://bb-election-api.herokuapp.com/",
      method: "GET",
      data: {},
      dataType: "json"
    }).done(function(responseData) {
      status.innerHTML = "";

      var candidates = document.querySelectorAll(".candidates");
      for (var i = 0; i < candidates.length; i++) {
        candidates[i].innerHTML = responseData.candidates[i].name + ": " + responseData.candidates[i].votes + " votes";
      }
    });
  });

  $.ajax({
    url: "https://bb-election-api.herokuapp.com/",
    method: "GET",
    data: {},
    dataType: "json"
  }).done(function(responseData){
    var candidates = responseData.candidates;
    for (var i = 0; i < candidates.length; i++) {
      var listItem = document.createElement("li");
      listItem.className = "candidates"
      listItem.innerHTML = candidates[i].name + ": " + candidates[i].votes + " votes";
      candidatesList.append(listItem);

      var form = document.createElement("form");
      form.method = "POST";
      form.action = "https://bb-election-api.herokuapp.com/vote";

      var hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = "id";
      hiddenInput.value = candidates[i].id;

      var submitButton = document.createElement("input");
      submitButton.type = "submit";
      submitButton.value = "Vote";

      form.append(hiddenInput, submitButton);
      candidatesList.append(form);
    }

    candidatesList.addEventListener("submit", function(e) {
      e.preventDefault();

      $.ajax({
        url: "https://bb-election-api.herokuapp.com/vote",
        method: "POST",
        data: $(e.target).serialize()
      }).done(function() {
        console.log("it worked");
        status.innerHTML = "Thank you for your vote!";
      }).fail(function() {
        console.log("it failed");
        status.innerHTML = "Oops! Something went wrong!";
      });
    });
  });
});

// Code here

function loadBeer() {
  fetch("http://localhost:3000/beers/1")
    .then((response) => response.json())
    .then((dataB) => {
      console.log(dataB);

      //Takes the list of beers object and uses it as an argument in the beer list function
      // return dataB;

      document.getElementById("beer-name").innerHTML = dataB.name;
      document.getElementById("beer-image").src = dataB.image_url;
      document.getElementById("beer-description").innerHTML = dataB.description;
      document.getElementById("reviewli").innerHTML = dataB.reviews;
      getBeer();
    });
}

function getBeer() {
  fetch("http://localhost:3000/beers")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // return data;

      //Takes the list of beers object and uses it as an argument in the beer list function
      return updateList(data);
    });
}

function updateList(data) {
  const beerlist = document.getElementById("beer-list");
  data.forEach((beer) => {
    // For Each beer, it adds a new list of item
    const li = document.createElement("li");
    li.innerHTML = beer.name;
    beerlist.appendChild(li);

    //On click, display beer name and image according to selection

    li.onclick = () => {
      document.getElementById("beer-name").innerHTML = beer.name;
      document.getElementById("beer-image").src = beer.image_url;
      document.getElementById("beer-description").innerHTML = beer.description;
      document.getElementById("reviewli").innerHTML = beer.reviews;

      function updateDescription(beer) {
        const beerID = beer.id;

        // Update Description
        const form = document.querySelector("description-form");
        form.addEventListener("submit", handleSubmit);

        function handleSubmit(event) {
          event.preventDefault();

          const newDescription = document.getElementById("description").value;

          // window.alert("TEST!");

          document.getElementById("desc").addEventListener.onclick = () => {
            if (newDescription === "") {
              window.alert("No new description");
            } else {
              //let formData = new formData(form);
              let descData = newDescription;
              let jsonData = JSON.stringify(descData);
              console.log(beer.id);

              fetch(`"http://localhost:3000/beers/${beerID}"`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                description: jsonData,
              })
                .then((response) => response.json())
                .then((newDesc) => console.log(newDesc))
                .catch((err) => console.log(err));
            }
          };
        }
      }
    };

    // Add Reviews

    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", submitReview);

    function submitReview(event) {
      event.preventDEfault();

      console.log("Test!");

      //let reviewFormData = new reviewFormData(form);
      let data = document.getElementById("review-list").value;
      let jsonData = JSON.stringify(data);

      fetch(`"http://localhost:3000/beers/${beer.id}"`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      })
        .then((response) => response.json())
        .then((newRev) => console.log(newRev))
        .catch((err) => console.log(err));

      document.getElementById("rev").addEventListener.onclick = () => {
        const newReview = document.getElementById("review-list").value;

        if (newReview == "") {
          window.alert("No new review");
        } else {
          ul = document.getElementById("review-list");
          reviewList = document.createElement("li");  
          reviewList.innerHTML = newRev;
          ul.appendChild(reviewList);
        }
      };
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadBeer();
});


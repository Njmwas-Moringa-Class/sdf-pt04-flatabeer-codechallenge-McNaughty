// Code here

function loadBeer() {
  fetch("http://localhost:3000/beers/1")
    .then((response) => response.json())
    .then((dataB) => {
      console.log(dataB);
      if (typeof window !== "undefined") {
        window.selectedBeer = dataB;
      }

      //Displays information of the first beer item in the database

      document.getElementById("beer-name").innerHTML = dataB.name;
      document.getElementById("beer-image").src = dataB.image_url;
      document.getElementById("beer-description").innerHTML = dataB.description;

      // Displays the different reviews in different lines
      dataB.reviews.forEach((review) => {
        document.getElementById("review-list").innerHTML +=
          "<li>" + review + "</li>";
      });
      getBeer();
    });
}

function getBeer() {
  fetch("http://localhost:3000/beers")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (typeof window !== "undefined") {
        window.beers = data;
      }
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

    let beerID = null;

    li.onclick = () => {
      if (typeof window !== "undefined") {
        window.selectedBeer = beer;
      }
      console.log(beer.id);
      document.getElementById("beer-name").innerHTML = beer.name;
      document.getElementById("beer-image").src = beer.image_url;
      document.getElementById("beer-description").innerHTML = beer.description;
      // document.getElementById("reviewli").innerHTML = beer.reviews;
      document.getElementById("review-list").innerHTML = "";
      beer.reviews.forEach((reviews) => {
        document.getElementById("review-list").innerHTML +=
          "<li>" + reviews + "</li>";
      });
    };

    // Update Description using the selected beer data

    document
      .getElementById("description-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();

        const newDescription = document.querySelector("#description").value;
        const sB = window.selectedBeer;
        if (sB == null || Object.keys(sB).length == 0) {
          window.alert("Select beer to update");
        }

        // create new json object with the beer data to be pushed
        let jsonData = { ...sB };

        jsonData.description = newDescription;
        //console.log(jsonData);

        fetch(`http://localhost:3000/beers/${jsonData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        })
          .then((response) => response.json())
          .then((newDesc) => console.log("newdesc update", newDesc))
          .catch((err) => console.log(err));
      });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadBeer();
});

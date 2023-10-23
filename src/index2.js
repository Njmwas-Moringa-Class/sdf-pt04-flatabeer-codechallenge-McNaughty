// Code here

function loadBeer() {
  fetch("http://localhost:3000/beers/1")
    .then((response) => response.json())
    .then((dataB) => {
      console.log(dataB);
      if(typeof window !== 'undefined'){
        window.selected_beer = dataB
      }

      //Takes the list of beers object and uses it as an argument in the beer list function
      // return dataB;

      document.getElementById("beer-name").innerHTML = dataB.name;
      document.getElementById("beer-image").src = dataB.image_url;
      document.getElementById("beer-description").innerHTML = dataB.description;
      // document.getElementById("reviewli").innerHTML = dataB.reviews;
      dataB.reviews.forEach(review => {
        document.getElementById("review-list").innerHTML += "<li>"+review+"</li>"
      })
      getBeer();
    });
}

function getBeer() {
  fetch("http://localhost:3000/beers")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(typeof window !== 'undefined'){
        window.beers = data
      }
      // return data;

      //Takes the list of beers object and uses it as an argument in the beer list function
      return updateList(data);
    });
}

function updateList(data) {
  //const specificData = data;
  const beerlist = document.getElementById("beer-list");
  data.forEach((beer) => {
    // For Each beer, it adds a new list of item
    const li = document.createElement("li");
    li.innerHTML = beer.name;
    beerlist.appendChild(li);

    //On click, display beer name and image according to selection


    let beerID = null;

    li.onclick = () => {
      if(typeof window !== 'undefined'){
        window.selected_beer = beer
      }
      console.log(beer.id);
      document.getElementById("beer-name").innerHTML = beer.name;
      document.getElementById("beer-image").src = beer.image_url;
      document.getElementById("beer-description").innerHTML = beer.description;
      // document.getElementById("reviewli").innerHTML = beer.reviews;
      document.getElementById("review-list").innerHTML = '';
      beer.reviews.forEach(reviews => {
        document.getElementById("review-list").innerHTML += "<li>"+reviews+"</li>"
      })

      //console.log(beer.id);
      //return beer.id;
      // return updateDescription(beer);
    };

  // Update Description using the selected beer data

  // function updateDescription(beer) {
  
    // window.alert("TEST!");
    
  
    document.getElementById("description-form").addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newDescription = document.querySelector("#description").value;
        const sb = window.selected_beer
        if( sb == null || Object.keys(sb).length == 0){
          window.alert("Select beer to update");
        }
        
        let jsonData = {...sb }

        jsonData.description = newDescription
        console.log(jsonData);
  
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
      })
  
    //beerID = '';
  // }

  });
}


// // Update Description using the selected beer data

// function updateDescription(beer) {
//  // console.log(data);

//  // window.alert("TEST!");
  
//   const beerID = beer.id;

//   document.getElementById("description-form").addEventListener('submit', (e) => {
//     e.preventDefault();
//     // e.stopPropagation();
//    // const newDescription = document.getElementById("description").value;
//    const newDescription = document.querySelector("#description").value;
  
//       let jsonData = {...beer}
//       jsonData.description = newDescription
//       console.log('jd',jsonData);

//       fetch(`http://localhost:3000/beers/${beerID}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(jsonData),
//       })
//         .then((response) => response.json())
//         .then((newDesc) => console.log("newdesc update", newDesc))
//         .catch((err) => console.log(err));
//     })

//   //beerID = '';
// }



document.addEventListener("DOMContentLoaded", function () {
  loadBeer();
});

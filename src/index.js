// Code here


function loadBeer(){
    fetch ("http://localhost:3000/beers/1")
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

    })

}

function getBeer(){
    
    fetch ("http://localhost:3000/beers")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
       // return data;

       //Takes the list of beers object and uses it as an argument in the beer list function
       return updateList(data);
       
    })
}


function updateList(data) {
    
    const beerlist = document.getElementById('beer-list');
    data.forEach(beer => {
    // For Each beer, it adds a new list of item 
    const li = document.createElement("li");
    li.innerHTML = beer.name;
    beerlist.appendChild(li);

    //On click, display beer name and image according to selection

        li.onclick  = () => {
        
        document.getElementById("beer-name").innerHTML = beer.name;
        document.getElementById("beer-image").src = beer.image_url;
        document.getElementById("beer-description").innerHTML = beer.description;
        document.getElementById("reviewli").innerHTML = beer.reviews;


           }

        // document.getElementsByTagName("button").onclick = () => {
        //     if (document.getElementById("description") === "") {
        //         alert("Item description has not been updated.")
        //     }else{

        //         updateForm = document.getElementById("description-form");

        //         updateForm.querySelector("#desc").onclick = () => {
        //             console.log(beer.id)
        //             let url = `"http://localhost:3000/beers/${beer.id}"`;

        //             dataField = document.getElementById("desc").textContent;
                    
        //             fetch(url),{
        //                 method: "PATCH",
        //                 headers:{
        //                     "Content-Type": "application/json"
        //                 },
        //                // body:JSON.stringify(`${document.getElementById("description").innerHTML}`)
        //                 body:JSON.stringify(dataField)
        //             }
        //             .then(response => response.json())
        //             .then(beerDesc => window.alert(beerDesc))

               // }

               
          //  }
       // }
    
    });

  }
  

document.addEventListener('DOMContentLoaded', function() {
    loadBeer();

    //getBeer();
    // loadBeer();
  });
  



// function updateBeerDesc (){
//     let url = `"http://localhost:3000/beers/${beer.id}"`;

//     fetch(url),{
//         method: "PATCH",
//         headers:{
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify(`${document.getElementById("description").innerHTML}`)
//     }
//     .then(response => response.json())
//     .then(beerDesc => console.log(beerDesc))

// }



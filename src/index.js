const filterDogsButton = document.querySelector("#good-dog-filter")
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")


///////////////////////////////////
//////////////   1    //////////////
///////////////////////////////////

// init / all dogs to NAV
const init = () => {
  
  getAllDogs()
    .then((dogs) => {
        addAllDogsToDogNavBar(dogs)
    })

    ///////////////////////////////////
    //////////////   5    //////////////
    ///////////////////////////////////
    // filterDogsButton.addEventListener("click", () => {
    //     toggleFilterDogs()
    //     })
}


///FETCHES
const url = "http://localhost:3000/pups"

///////////////////////////////////
//////////////   2    //////////////
///////////////////////////////////
//all the dogs
const getAllDogs = () => {
    return fetch(`${url}`)
            .then(response => response.json())
}

//one dog 
const getOneDog = (id) => {
   return fetch(`${url}/${id}`)
            .then(response => response.json())
}


///////////////////////////////////
//////////////   2    //////////////
///////////////////////////////////
const addAllDogsToDogNavBar = (dogs, filter = false) => {

    dogs.forEach(addDogSpanToNav)
    
    ///////////////////////////////////
    //////////////   5    //////////////
    //BONUS filter good dogs
    ///////////////////////////////////
    // dogBar.innerHTML = ""
    // if(filter){
    //     dogs.filter(dog => dog.isGoodDog)
    //         .forEach(addDogSpanToNav)
    // } else {
    //     dogs.forEach(addDogSpanToNav)
    // }
}

///////////////////////////////////
//////////////   2    //////////////
///////////////////////////////////
const addDogSpanToNav = (dog) => {
        const dogSpan = document.createElement("span")
        dogSpan.textContent = dog.name
        dogBar.append(dogSpan)

        dogSpan.addEventListener("click", () => {
            currentDog = dog
            displayDogInfo(dog)
        })
}


///////////////////////////////////
//////////////   3    //////////////
///////////////////////////////////
const displayDogInfo = (cDog) => {
    // console.log(cDog.id)
    getOneDog(cDog.id)
        .then(addDogInfoToPage)
}



const addDogInfoToPage = (dog) => {
//    console.log(dog)
    dogInfo.innerHTML = ""

    //create HTML Node element
    const dogImg = document.createElement("img")   
    const dogTitle = document.createElement("h2") 
    const dogButton = document.createElement("button")

    //slap them with data
    dogImg.src = dog.image
    dogTitle.innerText = dog.name
    dogButton.innerText = dog.isGoodDog? "Good Dog!" : "Bad Dog!"
    dogButton.dataset.id = dog.id //add dataset id attribute

    dogButton.addEventListener("click", onGoodDogButtonClick)

    //append them
    dogInfo.append(dogImg, dogTitle, dogButton)
}


///////////////////////////////////
//////////////   4    //////////////
///////////////////////////////////

const onGoodDogButtonClick = (event) => {
    let newValue;

    if(event.target.innerText.includes("Good")){
        event.target.innerText = "Bad Dog"
        newValue = false
    } else {
        event.target.innerText = "Bad Dog"
        newValue = true
    }

    toggleGoodDog(event.target.dataset.id, newValue)
    .then(updateDogBar)
}


///////////////////////////////////
//////////////   4    //////////////
///////////////////////////////////

function toggleGoodDog(id, newValue){
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: newValue
      })
    }
    return fetch(url + `/${id}`, options)
      .then(r => r.json())
  }


///////////////////////////////////
//////////////   5    //////////////
///////////////////////////////////
//BONUS filter good dogs
// const toggleFilterDogs = () => {
//     if (filterDogsButton.innerText.includes("OFF")){
//         filterDogsButton.innerText = "Filter good dogs: ON"
//         updateDogBar()
//       } else {
//         filterDogsButton.innerText = "Filter good dogs: OFF"
//         updateDogBar()
//       }
// }

// const updateDogBar = () => {
//     console.log("update dog bar")
//     if (filterDogsButton.innerText.includes("OFF")){
//         getAllDogs()
//         .then(dogArray => addAllDogsToDogNavBar(dogArray))
//       } else {
//         getAllDogs()
//         .then(dogArray => addAllDogsToDogNavBar(dogArray, true))
//       }
// }


init()
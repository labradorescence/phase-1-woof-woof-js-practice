const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")

const filterDogsButton = document.querySelector("#good-dog-filter")


const init = () => {
    getAllDogs()
        .then((dogs) => addAllDogsToDogNavBar(dogs))

    filterDogsButton.addEventListener("click", () => {
        toggleFilterDogs() //invoke the toggle filter func
    })
}

//FETCHES 
const url = "http://localhost:3000/pups/"

/////////// 2 ///////////////
//get all the dogs
const getAllDogs = () => {
    return fetch(url)
        .then(response => response.json())
}
/////////// 3 ///////////////
const getOneDog = (id) => {
    return fetch(`${url}/${id}`)
        .then(response => response.json())
}

//////////  2   ////////// 
const addAllDogsToDogNavBar = (dogs, filter = false) => {
    //dogs.forEach(addDogSpanToNav);
   // dogs.forEach(addDogSpanToNav);

   ////// BONUS /// 
   dogBar.innerHTML = ""

   if(filter){
    dogs.filter(dog => dog.isGoodDog)
        .forEach(addDogSpanToNav)
   } else {
        dogs.forEach(addDogSpanToNav)
   }
}

const addDogSpanToNav = (dog) => {
    //create a span tag
    const dogSpan = document.createElement('span')

    // //grab the dog name data 
    dogSpan.textContent = dog.name

    // //append it
    dogBar.append(dogSpan)

    dogSpan.addEventListener("click", () => {
        displayDogInfo(dog)
    })
}

/////////// 3 ///////////////
const displayDogInfo = (dog) => {
    //console.log(dog.id)
    getOneDog(dog.id)
        .then(dog => addDogInfoToPage(dog))
}


const addDogInfoToPage = (dog) => {
   //console.log(dog)
    dogInfo.innerHTML = ""

    //create HTML Node element
    const dogImg = document.createElement("img")
    const dogTitle = document.createElement("h2")
    const dogButton = document.createElement("button")

    //slap the dog data
    dogImg.src = dog.image
    dogTitle.innerText = dog.name
    dogButton.innerText = dog.isGoodDog? "Good Dog!" : "Bad Dog!"
    dogButton.dataset.id = dog.id //add dataset id attribute

    dogButton.addEventListener("click", (event) => onGoodDogButtonClick(event))
    
    //append them
    dogInfo.append(dogImg, dogTitle, dogButton)

}


/////////// 4 ///////////////
const onGoodDogButtonClick = (event) => {
    let newValue;
    
    if(event.target.innerText.includes("Good")){
        event.target.innerText = "Bad Dog"
        newValue = false
    }else {
        event.target.innerText = "Good Dog"
        newValue = true
    }

    toggleGoodDog(event.target.dataset.id, newValue)
        .then(updateDogBar)
}




const toggleGoodDog = (id, newValue) => {
    
    return fetch(`${url}/${id}`,  {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: newValue
        })
    })
        .then(response => response.json())
}

///BONUS! STEP 5: FILTER GOOD DOGS/////
const toggleFilterDogs = () => {
    if(filterDogsButton.innerText.includes("OFF")){
        filterDogsButton.innerText = "Filter good dogs: ON"
        updateDogBar()
    } else {
        filterDogsButton.innerText = "Filter good dogs: OFF"
        updateDogBar()
    }
}


const updateDogBar = () =>{
     //console.log("updating the dog bar")
     if(filterDogsButton.innerText.includes("OFF")){
        getAllDogs()//get all the dog from the server
        .then(dogs => addAllDogsToDogNavBar(dogs))
     } else {
        getAllDogs()
        .then(dogs => addAllDogsToDogNavBar(dogs, true))
     }
}

init()
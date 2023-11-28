const dogList = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const offAndOn = document.querySelector("#good-dog-filter")

function getAllDogs(){
    return fetch("http://localhost:3000/pups")
       .then(response => response.json())
    // .then( dogData => {
    //     dogInHandle(dogData)
    // })
}

//STEP 2: ADD PUPS TO DOG BAR + STEP 5
function addPupsToDogBar(dogData, filter=false){
    // updateDogBar.innerHTML = ""
    dogList.innerHTML = "" ////<-----

    if(filter){
        dogData.filter(oneDog => oneDog.isGoodDog)
            .forEach(addDogSpanToNav)
    }else{

        dogData.forEach(addDogSpanToNav)
    }
}

//STEP 2: ADD PUPS TO DOG BAR
function addDogSpanToNav(oneDog){
    const dogListItem = document.createElement("span")
    dogListItem.textContent = oneDog.name
    dogList.appendChild(dogListItem)

    dogListItem.addEventListener("click", () => {
        showDetails(oneDog)
    })
}

// function dogInHandle(dogData){ 
//     dogData.forEach( oneDog => { 
//     })
// }

//STEP 3: SHOW MORE INFO ABOUT EACH PUP
function showDetails (oneDog) {
 
    dogInfo.innerHTML = ""
    
    const dogImg = document.createElement("img")
    const dogName = document.createElement("h2")
    const dogStatus = document.createElement("button")

    dogImg.src = oneDog.image
    dogName.textContent = oneDog.name
    dogStatus.textContent = oneDog.isGoodDog? "Good Dog!": "Bad Dog!";

    dogInfo.append(dogImg, dogName, dogStatus)
 
    //STEP 4: TOGGLE GOOD DOG
    dogStatus.addEventListener("click", () => {
        oneDog.isGoodDog = !oneDog.isGoodDog

        let updatingData = { isGoodDog: oneDog.isGoodDog }

        patchDog( oneDog.id , updatingData )
            .then(updatedDog => {
                dogStatus.textContent = updatedDog.isGoodDog? "Good Dog!": "Bad Dog!";
            }) 
    })
}


//STEP 4: TOGGLE GOOD DOG
function patchDog( urlId, updatingData){
    return fetch(`http://localhost:3000/pups/${urlId}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(updatingData)
    })
    .then(response => response.json())
}


//STEP 5: FILTER GOOD DOGS
function filterGoodDog(){
    offAndOn.addEventListener("click", () => {
        // if(offAndOn.textContent === 'Filter good dogs: OFF' ) {
        //     offAndOn.textContent = 'Filter good dogs: ON'
        //     } else {
        //         offAndOn.textContent = 'Filter good dogs: OFF'
        //     }
        offAndOn.innerText.includes("OFF")? offAndOn.innerText="Filter good dogs: ON":offAndOn.innerText="Filter good dogs: OFF"
        updateDogBar()
    })
}

//STEP 5: FILTER GOOD DOGS
function updateDogBar(){
    if(offAndOn.innerText.includes("OFF")){
        getAllDogs()//get all the dogs from the server
            .then(dogs => addPupsToDogBar(dogs))
    }else{
        getAllDogs()
            .then(dogs => addPupsToDogBar(dogs, true))
    }
}

filterGoodDog()
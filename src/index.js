const dogBar = document.getElementById('dog-bar')
const dogInfo = document.querySelector("#dog-info")
const dogFilter = document.querySelector("#good-dog-filter")


function filterGoodDog(){
    dogFilter.addEventListener("click", () => {
        dogFilter.innerText.includes("OFF")? dogFilter.innerText="Filter good dogs: ON" : dogFilter.innerText="Filter good dogs: OFF"
        updateDogBar()
    })
}
filterGoodDog()

const updateDogBar = () => {
    if(dogFilter.innerText.includes("OFF")){
        getAllDogs()//get all the dog from the server
        .then(dogs => addPupsToDogBar(dogs))
     } else {
        getAllDogs()
        .then(dogs => addPupsToDogBar(dogs, true))
     }
}

const getAllDogs = () => {
    fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(dogArr => {
        dogArr.map(eachDog => {
            addPupsToDogBar(eachDog)
        })
    })
}




function addPupsToDogBar(dogData, filter=false){
    dogBar.innerHTML=""
    if(filter){
        dogData.filter
    }
    
    const dogSpan = document.createElement("span")
    dogSpan.innerText = dogData.name
    dogBar.appendChild(dogSpan)

    dogSpan.addEventListener("click", () => {
        showMoreInfo(dogData)
    })
}


function showMoreInfo(dogData){
    dogInfo.innerHTML = ""

    const dogImg = document.createElement("img")
    const dogName = document.createElement("h2")
    const dogStatus = document.createElement("button")

    dogImg.src = dogData.image
    dogName.textContent = dogData.name
    dogStatus.textContent = dogData.isGoodDog? "Good Dog!":"Bad Dog!"

    dogInfo.append(dogImg, dogName, dogStatus)

    dogStatus.addEventListener("click", () => {
        dogData.isGoodDog = !dogData.isGoodDog

        let updatingData = {isGoodDog:dogData.isGoodDog}

        patchDog(dogData.id, updatingData)
            .then(updatedDog => {
                dogStatus.textContent = updatedDog.isGoodDog? "Good Dog!":"Bad Dog!"
            })            
    })
}


function patchDog(urlId, updatingData){
    return fetch(`http://localhost:3000/pups/${urlId}`, {
        method:"PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(updatingData)
    })
        .then(response => response.json())
}
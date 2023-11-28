const dogList = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")

fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then( dogData => {
        dogInHandle(dogData)
    })


function dogInHandle(dogData){ 

    dogData.forEach( oneDog => { 
        const dogListItem = document.createElement("span")
        dogListItem.textContent = oneDog.name
        dogList.appendChild(dogListItem)

        dogListItem.addEventListener("click", () => {
            showDetails(oneDog)
        })
    })
}

// When a user clicks on a pup's span in the div#dog-bar, that pup's info (image, name, and isGoodDog status) should show up in the div with the id of "dog-info". Display the pup's info in the div with the following elements:

{/* <img src="dog_image_url" />
<h2>Mr. Bonkers</h2>
<button>Good Dog!</button> */}

function showDetails (oneDog) {
    console.log(oneDog.isGoodDog)
    dogInfo.innerHTML = ""
    
    const dogImg = document.createElement("img")
    const dogName = document.createElement("h2")
    const dogStatus = document.createElement("button")

    dogImg.src = oneDog.image
    dogName.textContent = oneDog.name
    dogStatus.textContent = oneDog.isGoodDog? "Good Dog!": "Bad Dog!";
    console.log(dogStatus)

    // dogInfo.appendChild(dogImg)
    // dogInfo.appendChild(dogName)
    // dogInfo.appendChild(dogStatus)

    dogInfo.append(dogImg, dogName, dogStatus)

}
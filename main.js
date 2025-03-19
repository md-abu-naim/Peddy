const dataLoad = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            const pets = data.pets
            displayPets(pets)
        })
}

const displayPets = (pets) => {
    const petsContainer = document.getElementById('card-container')
    pets.forEach(pet => {
        console.log(pet);
        const div = document.createElement('div')
        div.classList.add('card')

        div.innerHTML = `<img width="227px" style="border-radius: 4px;" src=${pet.image} alt="">
                        <h3 style="font-weight: 900;">${pet.pet_name}</h3>
                        <div class="card-content">
                            <i class="fa-solid fa-minimize"></i>
                            <p>Breed: ${pet.breed}</p>
                        </div>
                        <div class="card-content">
                            <i class="fa-solid fa-calendar-days"></i>
                            <p>Birth: ${pet.date_of_birth}</p>
                        </div>
                        <div class="card-content">
                            <i class="fa-solid fa-mercury"></i>
                            <p>Gender: Female</p>
                        </div>
                        <div class="card-content">
                            <i class="fa-solid fa-dollar-sign"></i>
                            <p>Price : 199$</p>
                        </div>`
        petsContainer.appendChild(div)
    })
}

dataLoad()
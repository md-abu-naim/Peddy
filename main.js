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
    petsContainer.innerHTML = '';
        pets.forEach(pet => {
        const div = document.createElement('div')
        div.classList.add('card')

        div.innerHTML = `
        <img width="227px" style="border-radius: 4px;" src=${pet.image} alt="">
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
                        <p>Gender: ${pet.gender}</p>
                    </div>
                    <div class="card-content">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <p>Price : ${pet.price}$</p>
                    </div>
                    <div>
                        <button class="likeBtn" style="padding: 16px; border-radius: 4px; border: 1px solid #0E7A8126;"><i class="fa-solid fa-thumbs-up"></i></button>
                        <button class="adoptButton card-btn">Adopt</button>
                        <button class="detailsButton card-btn">Details</button>
                    </div>
                        `

        const like = div.querySelector('.likeBtn');
        like.addEventListener('click', () => handlLikeBtn(pet));

        // Adopt Button Event
        const adoptBtn = div.querySelector('.adoptButton')
        adoptBtn.addEventListener('click', function() {
            startAdoption(this)
        })

        // Details Button
        const Details = div.querySelector('.detailsButton')
        Details.addEventListener('click', () => handleDetails(pet))


        petsContainer.appendChild(div)

    })
}

const handlLikeBtn = (pet) => {
    const imgContainer = document.getElementById('image-container')
    const img = document.createElement('img')
    img.width = 125;
    img.src = pet.image;
    img.alt = "Liked Pet";
    imgContainer.appendChild(img)
}

const startAdoption = (button) => {
    let countdown = 3;
    button.disabled = true;

    let interval = setInterval(() => {
        if(countdown > 0) {
            button.innerText = countdown
            countdown--
        }else{
            clearInterval(interval)
            button.innerText = "Adopted"
        }
    }, 1000)
}

const handleDetails = (pet) => {
    const modal = document.getElementById('modal')
    modal.classList.remove('hidden')    
}

// const closeModal = () => {
//     const modal = document.getElementById('modal')
//     modal.classList.add('hidden')
// }

const btnDataLoad = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => {
            displayBtn(data.categories);
        })
}

const displayBtn = (btns) => {
    const btnContainer = document.getElementById('category')
    btns.forEach(btn => {
        const button = document.createElement('button')
        button.classList.add('category-btn')
        button.innerHTML = ` <img src=${btn.category_icon} alt="">
        <h1>${btn.category}</h1>`
        btnContainer.appendChild(button)
    })
}

dataLoad()
btnDataLoad()
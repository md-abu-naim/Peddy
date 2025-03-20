const dataLoad = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            const pets = data.pets
            setTimeout(() => {
                displayPets(pets)
                handleSpinner('none')
            },2000 )
        })
}

const displayPets = (pets) => {
    const petsContainer = document.getElementById('card-container')
    petsContainer.innerHTML = '';
    if(pets.length === 0){
        petsContainer.innerHTML = `<div>
                    <img src="./images/error.webp" alt="">
                    <h2>No Information Available</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page
                        when looking at
                        its layout. The point of using Lorem Ipsum is that it has a.</p>
                </div>`
    }
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
        adoptBtn.addEventListener('click', function () {
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
        if (countdown > 0) {
            button.innerText = countdown
            countdown--
        } else {
            clearInterval(interval)
            button.innerText = "Adopted"
        }
    }, 1000)
}

const handleDetails = (pet) => {
    const modal = document.getElementById('modal')
    modal.classList.remove('hidden')

    const getValue = (value, placeholder = 'Not Available') => value ? value : placeholder

    modal.innerHTML = ''

    const div = document.createElement('div')
    div.classList.add('modal')
    div.innerHTML = `
    <div class="modal">
                <img class="modal-img" src=${getValue(pet.image, 'placeholder.jpg')} alt="">
                <h3>${getValue(pet.pet_name)}</h3>
                <div class="modal-content">
                    <div class="card-content">
                        <i class="fa-solid fa-minimize"></i>
                        <p>Breed: ${getValue(pet.breed)}</p>
                    </div>
                    <div class="card-content">
                        <i class="fa-solid fa-calendar-days"></i>
                        <p>Birth: ${getValue(pet.date_of_birth)}</p>
                    </div>
                </div>
                <div class="modal-content">
                    <div class="card-content">
                        <i class="fa-solid fa-mercury"></i>
                        <p>Gender: ${getValue(pet.gender)}</p>
                    </div>
                    <div class="card-content">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <p>Price : ${getValue(pet.price)}$</p>
                    </div>
                </div>
                <div class="card-content">
                        <i class="fa-solid fa-mercury"></i>
                        <p>Vaccinated status: ${getValue(pet.gender)}</p>
                    </div>
    
                <h5>Details Information</h5>
                <p>${getValue(pet.pet_details)}</p>
    
                <button onclick="closeModal()" class="modal-btn">Cancel</button>
            </div>
    `
    modal.appendChild(div)
}

const closeModal = () => {
    const modal = document.getElementById('modal')
    modal.classList.add('hidden')
}

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

        button.addEventListener('click', () => loadPetsCategory(btn.category))

        btnContainer.appendChild(button)
    })
}

const loadPetsCategory = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(res => res.json()) 
    .then(data => displayPets(data.data))
}

const handleSpinner = (status) => {
    document.getElementById('spinner').style.display = status
}

// loadPetsCategory()
dataLoad()
btnDataLoad()
//if i click home button, it will refersh and will show again all the pets in the UI
document.getElementById('refresh').addEventListener('click', function () {
    removeActiveButton();
    loadAllpets();
})




const removeActiveButton = () => {
    const categoryButton = document.getElementsByClassName("category-btn");
    for (const btn of categoryButton) {
        btn.classList.remove('active');
    }
}


const adopted = (btn) => {
    btn.innerHTML = `Adopted`
    btn.disabled = true
    btn.classList.add('bg-gray-400', 'cursor-not-allowed'); // optional visual update
    btn.classList.remove('bg-teal-600', 'hover:bg-teal-700', 'cursor-pointer');
}


const redLoved = (petId) => {
    // const icon = btn.querySelector('i');
    // icon.classList.add('text-red-600'); // Tailwind red color
    // btn.disabled = true; // optional: disable if you want one-time like
    // console.log(petId)

    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then(res => res.json())
        .then(data => fovoritedItems(data.petData))
}


//show the favorited items to the aside bar
const favoritedContainer = document.getElementById('favorited-container');
const fovoritedItems = (data) => {
    console.log(data)
    const favoritedItem = document.createElement('div')
    favoritedItem.innerHTML = `
    <img src="${data.image}" alt="">
    `
    favoritedContainer.append(favoritedItem);
}


//fetch the categories data


const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}



const displayCategories = (categories) => {
    const categorySection = document.getElementById('category-section')
    for (const category of categories) {
        // console.log(category)

        const buttonContainer = document.createElement('div')
        buttonContainer.classList.add('text-center');
        buttonContainer.innerHTML = `
        <button  id="button-${category.category}" class= "btn gap-6 my-4 w-full category-btn" onclick ="laodSpecificPets('${category.category}')" > <img class="w-6" src="${category.category_icon}" alt=""> ${category.category}  </button>
        `
        categorySection.append(buttonContainer);
    }
}



const laodSpecificPets = (categoryName) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
        .then(res => res.json())
        .then(data => {
            removeActiveButton();

            // ✅ Use the original categoryName
            const activeButton = document.getElementById(`button-${categoryName}`);
            if (activeButton) {
                activeButton.classList.add('active');
            }

            //if there is no data, there will be shown message that NO INFORMATION
            const emptyMessage = document.getElementById('empty-message');

            if (data.data.length === 0) {
                emptyMessage.classList.remove('hidden');
            } else {
                emptyMessage.classList.add('hidden');
            }


            // Display pets even if the array is empty
            displayAllPets(data.data);
        })
        .catch(error => console.log(error));
}






const loadAllpets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPets(data.pets))
        .catch(error => console.log(error))
}

const displayAllPets = (allPets) => {

    const gridContainer = document.getElementById('grid-container')
    gridContainer.innerHTML = ''


    // console.log(allPets);
    for (const singlePet of allPets) {
        // console.log(singlePet);
        const gridContainer = document.getElementById('grid-container')
        const singleGrid = document.createElement('div')
        singleGrid.classList.add('my-5')
        //showing all the pets
        singleGrid.innerHTML = `
        
         <!-- Image -->
  <img src="${singlePet.image}" alt="Pet Image" class="w-full h-40 object-cover rounded-md" />

  <!-- Name -->
  <h2 class="text-xl font-semibold my-3">${singlePet.pet_name}</h2>

  <!-- Info Section -->
  <div class="text-gray-600 text-sm space-y-1 my-3">
    <div class="flex items-center gap-2">
      <span>📋</span> <span>Breed: ${singlePet.breed || "Not Found"}</span>
    </div>
    <div class="flex items-center gap-2">
      <span>📅</span> <span>Birth: ${singlePet.date_of_birth || "Not Found"}</span>
    </div>
    <div class="flex items-center gap-2">
      <span>♀️</span> <span>Gender: ${singlePet.gender}</span>
    </div>
    <div class="flex items-center gap-2">
      <span>💲</span> <span>Price: ${singlePet.price || "Not Found"} $</span>
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex items-center justify-between pt-2 border-t mt-2">
    <button onclick="redLoved(${singlePet.petId})" class="flex items-center gap-1 text-gray-600 hover:text-teal-600 cursor-pointer">
      <i class="fa-solid fa-heart"></i>
    </button>
    <button onclick="adopted(this)" class="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 text-sm cursor-pointer">Adopt</button>
    <button onclick="loadDetails(${singlePet.petId})" class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm cursor-pointer">Details</button>
  </div>
        
        `
        gridContainer.append(singleGrid)
    }
}

const loadDetails = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then(res => res.json())
        .then(data => displayModalDetails(data.petData))

}

const displayModalDetails = (details) => {

    console.log(details)

    const modalContainer = document.getElementById('modal-content')
    modalContainer.innerHTML = `

   <img class="mx-auto" src="${details.image}" alt="">
      <!-- Info Section -->
  <div class="text-gray-600 text-sm space-y-1 my-3">
    <div class="flex justify-center text-2xl items-center gap-2">
      <span>📋</span> <span class="font-bold" >Breed: ${details.breed || "Not Found"}</span>
    </div>
    <div class="flex justify-center text-2xl items-center gap-2">
      <span>📅</span> <span>Birth: ${details.date_of_birth || "Not Found"}</span>
    </div>
    <div class="flex justify-center text-2xl items-center gap-2">
      <span>♀️</span> <span>Gender: ${details.gender}</span>
    </div>
    <div class="flex justify-center text-2xl items-center gap-2">
      <span>💲</span> <span>Price: ${details.price || "Not Found"} $</span>
    </div>
  </div>
        
    `

    document.getElementById('showModal').click();
}






loadCategories();
loadAllpets();
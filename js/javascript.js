
const removeActiveButton = () => {
    const categoryButton = document.getElementsByClassName("category-btn");
    for (const btn of categoryButton) {
        btn.classList.remove('active');
    }
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
        console.log(category)

        const buttonContainer = document.createElement('div')
        buttonContainer.classList.add('text-center');
        buttonContainer.innerHTML = `
        <button id="button-${category.category}" class= "btn gap-6 my-4 w-full" onclick ="laodSpecificPets('${category.category}')" > <img class="w-6" src="${category.category_icon}" alt=""> ${category.category}  </button>
        `
        categorySection.append(buttonContainer);
    }
}



const laodSpecificPets = (data) => {

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${data}`)
        .then(res => res.json())
        .then(data => displayAllPets(data.data))
        .catch(error => console.log(error))
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
    <button class="flex items-center gap-1 text-gray-600 hover:text-teal-600 cursor-pointer">
      🖤
    </button>
    <button class="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 text-sm cursor-pointer">Adopt</button>
    <button class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm cursor-pointer">Details</button>
  </div>
        
        `
        gridContainer.append(singleGrid)
    }
}









loadCategories();
loadAllpets();
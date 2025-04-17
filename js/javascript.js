
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
        <button class= "btn gap-6 my-4 w-full" > <img class="w-6" src="${category.category_icon}" alt=""> ${category.category}  </button>
        `
        categorySection.append(buttonContainer);

    }

}





loadCategories();
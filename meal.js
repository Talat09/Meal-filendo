const loadMeals = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((res) => res.json())
        .then((data) => displayMeals(data.categories));
};
loadMeals();
const displayMeals = (meals) => {
    // console.log(meals)
    const mealsContainer = document.getElementById("meals");
    meals.forEach((meal) => {
        // console.log(meal)
        const div = document.createElement("div");
        div.classList.add("singlemeal");
        div.innerHTML = `
          <img width="300px" src="${meal.strCategoryThumb}" alt="">
         <h1>Name: ${meal.strCategory}</h1>
         <p>Description: ${meal.strCategoryDescription}</p>
         
         `;
        mealsContainer.appendChild(div);
    });
};

//add spinner function
const toggleSpinner = (displayStyle) => {
    document.getElementById("spinner").style.display = displayStyle;
};
const toggleSearchMeals = (displayStyle) => {
    document.getElementById("meals").style.display = displayStyle;
};
//search data load
const Search = () => {
    const inputText = document.getElementById("input-text");
    const searchText = inputText.value;
    //show spninner
    toggleSpinner("block");
    toggleSearchMeals("none");
    inputText.value = "";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => display(data.meals));
};
const display = (meals) => {
    const container = document.getElementById("meals");
    container.textContent = "";
    if (!meals) {
        const showingContainer = document.getElementById("meals");
        const divForShowing = document.createElement("div");
        divForShowing.classList.add("notFound");
        divForShowing.innerHTML = `
      <img src="notfound.jpg" alt="">
      `;
        showingContainer.appendChild(divForShowing);
    }
    meals?.map((meal) => {
        const searchdiv = document.createElement("div");
        searchdiv.classList.add("singlemeal");
        searchdiv.innerHTML = `
          <img width="300px" src="${meal.strMealThumb}" alt="">
          <h1>Name: ${meal.strMeal}</h1>
          <p>Description: ${meal.strInstructions}</p>
          `;
        container.appendChild(searchdiv);
    });

    toggleSpinner("none");
    toggleSearchMeals("grid");
};
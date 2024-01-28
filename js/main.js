// menu section
let searchByNameInput = document.querySelector("#searchByName");
let searchByLetter = document.querySelector("#searchByLetter");
let sideMenuSize = $("#sideMenu").outerWidth(true);
function startLoading() {
  $(".loader").fadeIn(100);
  $("#loader").css({ display: "flex" });
  $("body").css({ overflow: "hidden" });
}
function endLoading() {
  $(".loader").fadeOut(100, () => {
    $("#loader").fadeOut(100);
  });
  $("body").css({ overflow: "auto" });
}
FineMealByName("");

$("aside").animate({ left: -sideMenuSize }, 500);

$("#openBtn").click(() => {
  $("aside").animate({ left: "0px" }, 500);
  $("#openBtn").hide(300);
  $("#closeBtn").show(300);
  $("#list li").addClass("animated bounceInUp");
});

$("#closeBtn").click(() => {
  $("aside").animate({ left: -sideMenuSize }, 500);
  $("#closeBtn").hide(300);
  $("#openBtn").show(300);
  $("#list li").removeClass("bounceInUp");
});

$("#SearchLink").click(() => {
  let cartona = ``;
  document.querySelector("#displayCategory").innerHTML = cartona;
  searchByNameInput.value = "";
  searchByLetter.value = "";
  $("#searchSection").css({ display: "block" });
  $("#contactUsSection").css({ display: "none" });
  $("aside").animate({ left: -sideMenuSize }, 500);
  $("#closeBtn").hide(300);
  $("#openBtn").show(300);
  $("#list li").removeClass("bounceInUp");
});

$("#Categories").click(() => {
  $("#searchSection").css({ display: "none" });
  $("#contactUsSection").css({ display: "none" });
  $("aside").animate({ left: -sideMenuSize }, 500);
  $("#closeBtn").hide(300);
  $("#openBtn").show(300);
  $("#list li").removeClass("bounceInUp");
  getAllCategories();
});

$("#Area").click(() => {
  $("#searchSection").css({ display: "none" });
  $("#contactUsSection").css({ display: "none" });
  $("aside").animate({ left: -sideMenuSize }, 500);
  $("#closeBtn").hide(300);
  $("#openBtn").show(300);
  $("#list li").removeClass("bounceInUp");
  getAllArea();
});

$("#Ingredients").click(() => {
  $("#searchSection").css({ display: "none" });
  $("#contactUsSection").css({ display: "none" });
  $("aside").animate({ left: -sideMenuSize }, 500);
  $("#closeBtn").hide(300);
  $("#openBtn").show(300);
  $("#list li").removeClass("bounceInUp");
  getIngredients();
});

$("#ContactUs").click(() => {
  let cartona = ``;
  document.querySelector("#displayCategory").innerHTML = cartona;
  $("#searchSection").css({ display: "none" });
  $("#contactUsSection").css({ display: "block" });
  $("aside").animate({ left: -sideMenuSize }, 500);
  $("#closeBtn").hide(300);
  $("#openBtn").show(300);
  $("#list li").removeClass("bounceInUp");
  document.querySelector("#nameInput").value = "";
});
// End menu section

// Search section
searchByNameInput.addEventListener("input", () => {
  let searchTerm = searchByNameInput.value;
  FineMealByName(searchTerm);
});

searchByLetter.addEventListener("input", () => {
  let searchTerm = searchByLetter.value;
  FineMealFirstLetter(searchTerm);
});

async function FineMealByName(name) {
  startLoading();
  let myLink = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let myResponse = await myLink.json();
  let myFilter = myResponse.meals;
  let cartona = ``;
  for (let i = 0; i < myFilter.length; i++) {
    cartona += ` <div class="col-md-3 gy-2 rounded-4 p-2">
            <div
                  id="mainDiv"
                  data-meal-id="${myFilter[i].idMeal}"
                  class="inner text-center position-relative overflow-hidden rounded-4">
                  <img src="${myFilter[i].strMealThumb}" alt="" class="w-100" />
                  <div id="layer" class="layer rounded-4">
                    <div id="layerContent" class="p-3 overflow-hidden">
                      <h2>${myFilter[i].strMeal}</h2>
                    </div>
                  </div>
                </div>
            </div>`;
  }
  document.querySelector("#displayCategory").innerHTML = cartona;
  endLoading();
  // looping on nodelist of meals from same search name to get its ID
  let mealCard = document.querySelectorAll("#mainDiv");
  for (let i = 0; i < mealCard.length; i++) {
    mealCard[i].addEventListener("click", function () {
      let mealID = this.getAttribute("data-meal-id");
      getMealDetailsById(mealID); //calling for wanted meal function and get its details
      $("#searchSection").css({ display: "none" });
    });
  }
}

async function FineMealFirstLetter(letter) {
  let myLink = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let myResponse = await myLink.json();
  let myFilter = myResponse.meals;
  let cartona = ``;
  for (let i = 0; i < myFilter.length; i++) {
    cartona += ` <div class="col-md-3 gy-2 rounded-4 p-2">
            <div
                  id="mainDiv"
                  data-meal-id="${myFilter[i].idMeal}"
                  class="inner text-center position-relative overflow-hidden rounded-4">
                  <img src="${myFilter[i].strMealThumb}" alt="" class="w-100" />
                  <div id="layer" class="layer rounded-4">
                    <div id="layerContent" class="p-3 overflow-hidden">
                      <h2>${myFilter[i].strMeal}</h2>
                    </div>
                  </div>
                </div>
            </div>`;
  }
  document.querySelector("#displayCategory").innerHTML = cartona;
  // looping on nodelist of meals from same search name to get its ID
  let mealCard = document.querySelectorAll("#mainDiv");
  for (let i = 0; i < mealCard.length; i++) {
    mealCard[i].addEventListener("click", function () {
      let mealID = this.getAttribute("data-meal-id");
      getMealDetailsById(mealID); //calling for wanted meal function and get its details
      $("#searchSection").css({ display: "none" });
    });
  }
}
// END search section

// Category Section
async function getAllCategories() {
  startLoading();
  let myLink = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let myResponse = await myLink.json();
  let allCategories = myResponse.categories;
  let cartona = ``;
  for (let i = 0; i < allCategories.length; i++) {
    cartona += ` <div class="col-md-3 gy-2 rounded-4 p-2">
        <div
            id="mainDiv"
            data-category="${allCategories[i].strCategory}"
            class="inner text-center position-relative overflow-hidden rounded-4">
              <img src="${allCategories[i].strCategoryThumb}" alt="" class="w-100" />
              <div id="layer" class="layer rounded-4">
                <div id="layerContent" class="p-3 overflow-hidden">
                  <h2>${allCategories[i].strCategory}</h2>
                  <p>${allCategories[i].strCategoryDescription}</p>
                </div>
            </div>
        </div>
    </div>`;
  }
  document.querySelector("#displayCategory").innerHTML = cartona;
  endLoading();
  // looping on nodelist of categories to get more data about the wanted category
  let categoryCard = document.querySelectorAll("#mainDiv");
  for (let i = 0; i < categoryCard.length; i++) {
    categoryCard[i].addEventListener("click", function () {
      let wantedCategory = this.getAttribute("data-category");
      filterCategoryByType(wantedCategory); //calling for wanted category function
    });
  }
}

async function filterCategoryByType(type = "beef") {
  startLoading();
  let myLink = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${type}`
  );
  let myResponse = await myLink.json();
  let myFilter = myResponse.meals;
  let twentyItemFilter = myFilter.slice(0, 20);
  // DisplayFilter
  let cartona = ``;
  for (let i = 0; i < twentyItemFilter.length; i++) {
    cartona += ` <div class="col-md-3 gy-2 rounded-4 p-2">
          <div
                id="mainDiv"
                data-meal-id="${twentyItemFilter[i].idMeal}"
                class="inner text-center position-relative overflow-hidden rounded-4">
                <img src="${twentyItemFilter[i].strMealThumb}" alt="" class="w-100" />
                <div id="layer" class="layer rounded-4">
                  <div id="layerContent" class="p-3 overflow-hidden">
                    <h2>${twentyItemFilter[i].strMeal}</h2>
                  </div>
                </div>
              </div>
          </div>`;
  }
  document.querySelector("#displayCategory").innerHTML = cartona;
  endLoading();
  // looping on nodelist of meals from same wanted category to get its ID
  let mealCard = document.querySelectorAll("#mainDiv");
  for (let i = 0; i < mealCard.length; i++) {
    mealCard[i].addEventListener("click", function () {
      let mealID = this.getAttribute("data-meal-id");
      getMealDetailsById(mealID); //calling for wanted meal function and get its details
    });
  }
}

async function getMealDetailsById(id = 52874) {
  startLoading();
  let myLink = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let myResponse = await myLink.json();
  let myMeal = myResponse.meals[0];
  let tags = myMeal.strTags;
  let values = Object.values(myMeal);

  let amout = values.slice(29, 48);
  let rec = values.slice(9, 28);
  console.log(amout);
  console.log(rec);

  let cartona = `<div class="col-md-4 p-3">
    <div>
      <img src="${myMeal.strMealThumb}" alt="" class="w-100 rounded-4" />
      <h2>${myMeal.strMeal}</h2>
    </div>
    </div>
     <div class="col-md-8 p-3">
    <div>
      <div>
        <h2>Instructions</h2>
        <p>${myMeal.strInstructions}</p>
        <h2>Area: <span>${myMeal.strArea}</span></h2>
        <h2>Category: <span>${myMeal.strCategory}</span></h2>
        <h2>Recipes:
        <span class="bg-warning bg-opacity-25 p-1 rounded-2 mx-1 fs-6">${rec}</span>
        </h2>
        <h2>tags: <span class="bg-success bg-opacity-25 p-1 rounded-2 mx-1 fs-6">${tags}</span>
        </h2>
        <a href="${myMeal.strSource}" target="_blank" class="btn btn-success">source</a>
        <a href="${myMeal.strYoutube}" target="_blank" class="btn btn-danger">youtube</a>
      </div>
    </div>
  </div>`;
  document.querySelector("#displayCategory").innerHTML = cartona;
  endLoading();
}
// END Category Section

// Area Section
async function getAllArea() {
  startLoading();
  let myLink = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let myResponse = await myLink.json();
  let allArea = myResponse.meals;
  let cartona = ``;
  for (let i = 0; i < allArea.length; i++) {
    cartona += `<div class="col-md-3">
      <div id="areaIcon" data-area-name="${allArea[i].strArea}"
      class="text-center gy-2 py-4">
        <i class="fa-solid fa-house-laptop"></i>
        <h2>${allArea[i].strArea}</h2>
      </div>
    </div>`;
  }
  document.querySelector("#displayCategory").innerHTML = cartona;
  endLoading();
  // looping on nodelist of areas to get the area name
  let areaIcon = document.querySelectorAll("#areaIcon");
  for (let i = 0; i < areaIcon.length; i++) {
    areaIcon[i].addEventListener("click", function () {
      let areaName = this.getAttribute("data-area-name");
      filterMealsByArea(areaName); //calling for wanted area to get its meals
    });
  }
}

async function filterMealsByArea(areaName = "American") {
  startLoading();
  let myLink = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  let myResponse = await myLink.json();
  let myFilter = myResponse.meals;
  let twentyItemFilter = myFilter.slice(0, 20);
  let cartona = ``;
  for (let i = 0; i < twentyItemFilter.length; i++) {
    cartona += ` <div class="col-md-3 gy-2 rounded-4 p-2">
            <div
                  id="mainDiv"
                  data-meal-id="${twentyItemFilter[i].idMeal}"
                  class="inner text-center position-relative overflow-hidden rounded-4">
                  <img src="${twentyItemFilter[i].strMealThumb}" alt="" class="w-100" />
                  <div id="layer" class="layer rounded-4">
                    <div id="layerContent" class="p-3 overflow-hidden">
                      <h2>${twentyItemFilter[i].strMeal}</h2>
                    </div>
                  </div>
                </div>
            </div>`;
  }
  document.querySelector("#displayCategory").innerHTML = cartona;
  endLoading();
  // looping on nodelist of meals from same area to get its ID
  let mealCard = document.querySelectorAll("#mainDiv");
  for (let i = 0; i < mealCard.length; i++) {
    mealCard[i].addEventListener("click", function () {
      let mealID = this.getAttribute("data-meal-id");
      getMealDetailsById(mealID); //calling for wanted meal function and get its details by id
    });
  }
}
// END - Area Section

//Ingredients Section
async function getIngredients() {
  startLoading();
  // display all getIngredients for menu link
  let myLink = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let myResponse = await myLink.json();
  let myFilter = myResponse.meals;
  let twentyItemFilter = myFilter.slice(0, 20);
  let cartona = ``;
  for (let i = 0; i < twentyItemFilter.length; i++) {
    cartona += `<div class="col-md-3">
      <div id="areaIcon" data-Ingredients-name="${twentyItemFilter[i].strIngredient}"
      class="text-center gy-2 py-4">
        <i class="fa-solid fa-drumstick-bite"></i>
        <h2>${twentyItemFilter[i].strIngredient}</h2>
        <p class="fs-6" id="maxLines" >${twentyItemFilter[i].strDescription}</p>
      </div>
    </div>`;
  }
  document.querySelector("#displayCategory").innerHTML = cartona;
  endLoading();
  // looping on nodelist of Ingredients to get the main Ingredients name
  let areaIcon = document.querySelectorAll("#areaIcon");
  for (let i = 0; i < areaIcon.length; i++) {
    areaIcon[i].addEventListener("click", function () {
      let ingredientsName = this.getAttribute("data-Ingredients-name");
      getMealsByIngredients(ingredientsName);
    });
  }
}

async function getMealsByIngredients(ingredientsName = "chicken") {
  startLoading();
  let myLink = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientsName}`
  );
  let myResponse = await myLink.json();
  let myFilter = myResponse.meals;
  let twentyItemFilter = myFilter.slice(0, 20);
  let cartona = ``;
  for (let i = 0; i < twentyItemFilter.length; i++) {
    cartona += ` <div class="col-md-3 gy-2 rounded-4 p-2">
          <div
                id="mainDiv"
                data-meal-id="${twentyItemFilter[i].idMeal}"
                class="inner text-center position-relative overflow-hidden rounded-4">
                <img src="${twentyItemFilter[i].strMealThumb}" alt="" class="w-100" />
                <div id="layer" class="layer rounded-4">
                  <div id="layerContent" class="p-3 overflow-hidden">
                    <h2>${twentyItemFilter[i].strMeal}</h2>
                  </div>
                </div>
              </div>
          </div>`;
  }
  document.querySelector("#displayCategory").innerHTML = cartona;
  endLoading();
  // looping on nodelist of meals from same Ingredients to get its ID
  let mealCard = document.querySelectorAll("#mainDiv");
  for (let i = 0; i < mealCard.length; i++) {
    mealCard[i].addEventListener("click", function () {
      let mealID = this.getAttribute("data-meal-id");
      getMealDetailsById(mealID); //calling for wanted meal function and get its details
    });
  }
}
//END Ingredients Section

// contact Section
// NameInput
let nameRegex = /^[a-zA-Z ]{1,}$/;
let nameInput = document.querySelector("#nameInput");
nameInput.addEventListener("input", () => {
  let myEntries = nameInput.value;
  if (nameRegex.test(myEntries)) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    document
      .querySelector("#nameInputMess")
      .classList.replace("d-block", "d-none");
  } else {
    nameInput.classList.add("is-invalid");
    document
      .querySelector("#nameInputMess")
      .classList.replace("d-none", "d-block");
  }
});
// END NameInput

// phoneInput
let phoneRegex = /^[0-9]{11,11}$/;
let phoneInput = document.querySelector("#phoneInput");
phoneInput.addEventListener("input", () => {
  let myEntries = phoneInput.value;
  if (phoneRegex.test(myEntries)) {
    phoneInput.classList.add("is-valid");
    phoneInput.classList.remove("is-invalid");
    document
      .querySelector("#phoneInputMess")
      .classList.replace("d-block", "d-none");
  } else {
    phoneInput.classList.add("is-invalid");
    document
      .querySelector("#phoneInputMess")
      .classList.replace("d-none", "d-block");
  }
});
// End phoneInput

// passwordInput
let passwordRegex = /^[a-zA-Z0-9]{8,}$/;
let passwordInput = document.querySelector("#passwordInput");
let repasswordInput = document.querySelector("#repasswordInput");
let currentPassword = undefined;
passwordInput.addEventListener("input", () => {
  let myEntries = passwordInput.value;
  if (passwordRegex.test(myEntries)) {
    passwordInput.classList.add("is-valid");
    passwordInput.classList.remove("is-invalid");
    document
      .querySelector("#passwordInputMess")
      .classList.replace("d-block", "d-none");
  } else {
    passwordInput.classList.add("is-invalid");
    document.querySelector("#passwordInputMess").classList.replace("d-none", "d-block");
  }
  passwordInput.addEventListener("blur", () => {
    currentPassword = myEntries;
  });
});
repasswordInput.addEventListener("input", () => {
  let rePassEntered = repasswordInput.value;
  if (currentPassword == rePassEntered) {
    repasswordInput.classList.add("is-valid");
    repasswordInput.classList.remove("is-invalid");
    document.querySelector("#RepasswordInputMess").classList.replace("d-block", "d-none");
  }else{repasswordInput.classList.add("is-invalid");
  document.querySelector("#RepasswordInputMess").classList.replace("d-none", "d-block");}
});

// END passwordInput

// emailInput
let emailRegex = /^[a-zA-Z0-9\._-]{1,}@[a-zA-Z]{1,}\.[a-zA-Z]{3}$/;
let emailInput = document.querySelector("#emailInput");
emailInput.addEventListener("input", () => {
  let myEntries = emailInput.value;
  if (emailRegex.test(myEntries)) {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    document
      .querySelector("#emailInputMess")
      .classList.replace("d-block", "d-none");
  } else {
    emailInput.classList.add("is-invalid");
    document
      .querySelector("#emailInputMess")
      .classList.replace("d-none", "d-block");
  }
});
// END emailInput

// ageInput
let ageRegex = /^[0-9]{1,2}$/;
let ageInput = document.querySelector("#ageInput");
ageInput.addEventListener("input", () => {
  let myEntries = ageInput.value;
  if (ageRegex.test(myEntries)) {
    ageInput.classList.add("is-valid");
    ageInput.classList.remove("is-invalid");
    document
      .querySelector("#ageInputMess")
      .classList.replace("d-block", "d-none");
  } else {
    ageInput.classList.add("is-invalid");
    document
      .querySelector("#ageInputMess")
      .classList.replace("d-none", "d-block");
  }
});
// END ageInput
// End contact Section

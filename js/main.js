// function to display loading screen layer
$(function loading(){
    $('#loading').fadeOut(1000,function () {
        $('body').css('overflow',"auto")
    })

})

// function to get data from API 
async function getData() {

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let response = await data.json()
    console.log(response);
    showMeals(response)
    openMeal(response)
}
getData()

// function to show API data
function showMeals(response) {
    $('#loading').show()
    box = ``
        for (let i = 0; i < response.meals.length; i++) {
            box +=
                `
                <div class="col-md-3" id="${response.meals[i].idMeal}" >
                    <div class="meal position-relative rounded-3 overflow-hidden">
                        <img src="${response.meals[i].strMealThumb}" class="w-100" alt="">
                        <div class="meal-layer w-100 position-absolute d-flex align-items-center ps-3 text-white">
                            <h3>${response.meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            
        `
        }
    $('#loading').fadeOut(800)
        $('#rowItems').html(box)
}

// function to open meal details
function openMeal(response) {

    for (let i = 0; i < response.meals.length; i++) {
        $(`#${response.meals[i].idMeal}`).on('click', function () {
            x = this.getAttribute("id")
            getApiData(x)
        })
    }
}

// function to get data from api
async function getApiData(x) {
    $('#loading').show()
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${x}`)
    response = await data.json()
    showMealDetails(response)
}

// function to show meals details to user screen
function showMealDetails(response) {
    box = `  

    <div class="col-md-4">
    <img src="${response.meals[0].strMealThumb}" class="w-100" alt="">
    <h3 class="text-white mt-1">${response.meals[0].strMeal}</h3>
</div>
<div class="col-md-8 text-white">
    <h3>Instructions</h3>
    <p>${response.meals[0].strInstructions}</p>
    <h3>Area : ${response.meals[0].strArea}</h3>
    <h3>Category : ${response.meals[0].strCategory}</h3>
    <h3>Recipes : </h3>
    <ul class="list-unstyled d-flex flex-wrap">
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure1} ${response.meals[0].strIngredient1}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure2}  ${response.meals[0].strIngredient2}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure3}  ${response.meals[0].strIngredient3}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure4}   ${response.meals[0].strIngredient4}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure5}  ${response.meals[0].strIngredient5}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure6}  ${response.meals[0].strIngredient6}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure7}  ${response.meals[0].strIngredient7}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure8}  ${response.meals[0].strIngredient8}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure9}  ${response.meals[0].strIngredient9}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure10} ${response.meals[0].strIngredient10}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure11}  ${response.meals[0].strIngredient11}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure12} ${response.meals[0].strIngredient12}</li>
        <li class="alert alert-info m-2 p-1">${response.meals[0].strMeasure13}  ${response.meals[0].strIngredient13}</li>
    </ul>
    <h3>Tags</h3>
    <ul class="list-unstyled d-flex flex-wrap ">
        <li class="alert alert-danger">${response.meals[0].strTags}</li>
    </ul>
    <a href="${response.meals[0].strSource}"  class="btn btn-outline-success">Source</a>
    <a href="${response.meals[0].strYoutube}" class="btn btn-outline-danger">Youtube</a>
</div>

    `
    $('#loading').fadeOut(800)
    $('#rowItems').html(box)
}


// search function 
$('#search').on('click', function () {
    $('#loading').show()

    let box = ``
    box += `

        <div class="col-md-6">
            <input type="text" id="byName" class=" input form-control bg-transparent text-white PHcolor" placeholder="Search By Name...">
        </div>
        
        <div class="col-md-6">
            <input type="text" id="byFirstLetter" class=" input form-control bg-transparent text-white PHcolor" placeholder="Search By First Letter...">
        </div>

        <div class="row mt-5 gy-4 text-white " id="showSerachItems"></div>

    `
    $('#loading').fadeOut(200)
    $('#rowItems').html(box)
    searchByName()
    searchByLetter()

})


// function to serach for an item by item name
function searchByName() {
    $("#byName").on("keyup", async function () {
    $('#loading').show()
        x = $("#byName").val()
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
        let response = await data.json()
        let box = ``
        for (let i = 0; i < response.meals.length; i++) {
            box += `
            <div class="col-md-3" id="${response.meals[i].idMeal}" >
            <div class="meal position-relative rounded-3 overflow-hidden">
                <img src="${response.meals[i].strMealThumb}" class="w-100" alt="">
                <div class="meal-layer w-100 position-absolute d-flex align-items-center ps-3 text-white">
                    <h3>${response.meals[i].strMeal}</h3>
                </div>
            </div>
        </div>
        
            `
        }
    $('#loading').fadeOut(150)
        $('#showSerachItems').html(box)
        for (let i = 0; i < response.meals.length; i++) {
            $(`#${response.meals[i].idMeal}`).on('click', function () {
                getApiData(response.meals[i].idMeal)
            })
        }
    });
}


// function to search for an item by  letter
function searchByLetter() {
    $("#byFirstLetter").on("keyup", async function () {
        x = $("#byFirstLetter").val()
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${x}`)
        let response = await data.json()
        let box = ''
        for (let i = 0; i < response.meals.length; i++) {

            box += `
            <div class="col-md-3" id="${response.meals[i].idMeal}" >
            <div class="meal position-relative rounded-3 overflow-hidden">
                <img src="${response.meals[i].strMealThumb}" class="w-100" alt="">
                <div class="meal-layer w-100 position-absolute d-flex align-items-center ps-3 text-white">
                    <h3>${response.meals[i].strMeal}</h3>
                </div>
            </div>
        </div>
            `
        }

        $('#showSerachItems').html(box)
        for (let i = 0; i < response.meals.length; i++) {
            $(`#${response.meals[i].idMeal}`).on('click', function () {
                getApiData(response.meals[i].idMeal)
            })
        }
    });
}

// function to show areas on user screen
$('#area').on('click', async function () {
    $('#loading').show()
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await data.json()
    box = ``
    for (let i = 0; i < response.meals.length; i++) {
        box += `  
        <div class="col-md-3" onclick="getDataArea(x)">
            <div class="text-center text-white">
                <i id="${response.meals[i].strArea}" class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${response.meals[i].strArea}</h3>
            </div>
        </div>

        `
    }
    $('#loading').fadeOut(600)
    $('#rowItems').html(box)

    for (let i = 0; i < response.meals.length; i++) {
        $(`#${response.meals[i].strArea}`).on('click', function () {
            getDataArea(response.meals[i].strArea)
        })
    }

})

// function to get areas data from api
async function getDataArea(x) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${x}`)
    let response = await data.json()
    showMeals(response)
    openMeal(response)
    
}


// function to show categories on user screen
$('#Categories').on('click', async function () {
    $('#loading').show()
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await data.json()
    console.log(response);
    box = ``
    for (let i = 0; i < response.categories.length; i++) {
        box += `
        <div class="col-md-3" id="${response.categories[i].idCategory}" >
        <div class="meal position-relative rounded-3 overflow-hidden">
            <img src="${response.categories[i].strCategoryThumb}" class="w-100" alt="">
            <div class="meal-layer w-100 position-absolute d-flex align-items-center ps-3 text-white">
                <h3>${response.categories[i].strCategory}</h3>
            </div>
        </div>
    </div>
    `
    }
    $('#loading').fadeOut(600)
    $('#rowItems').html(box)

    for (let i = 0; i < response.categories.length; i++) {
        $(`#${response.categories[i].idCategory}`).on('click', function () {
            getDataCategories(response.categories[i].strCategory)
        })
        
    }
})

// function to get categories data from api
async function getDataCategories(x) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`)
    let response = await data.json()

    showMeals(response)
    openMeal(response)
}

// function to show ingredients on user screen
$('#Ingredients').on('click', async function () {
    $('#loading').show()
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await data.json()
    box = ``
    for (let i = 0; i <= 20; i++) {
        box += `
        <div class="col-md-3 d-flex flex-column align-items-center text-white text-center">
        <span><i id="${response.meals[i].idIngredient}" class="fa-solid fa-drumstick-bite areaIcon"></i></span>
        <h3>${response.meals[i].strIngredient}</h3>
        </div>
    `
    }
    $('#loading').fadeOut(600)
    $('#rowItems').html(box)
    for (let i = 0; i <= 20; i++) {
        $(`#${response.meals[i].idIngredient}`).on('click', function () {
            console.log(response.meals[i].strIngredient);
            getDataIngredients(response.meals[i].strIngredient)
        })
    }

})

// function to get ingredients data from api
async function getDataIngredients(x) {
    console.log();
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${x}`)
    let response = await data.json()
    showMeals(response)
    openMeal(response)

}

$('#contact').on('click', function () {
    $('#loading').show()
    let box = ``
    box += `

    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class=" form-control btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>

    `
    $('#loading').fadeOut(200)

    $('#rowItems').html(box)

    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })

    searchByName()
    searchByLetter()

})

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
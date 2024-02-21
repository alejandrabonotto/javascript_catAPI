const categorySelect = document.getElementById("category");
const getButton = document.getElementById("get-button");
const gallery = document.querySelector(".gallery");
const API_URL = "https://api.thecatapi.com/v1";
const API_KEY = "live_4ZY1nH2q65Yx0yhbDYpkW4BPZLzxa5Eu7ZI39s4In851arCMplWbbMiJcoqQXbpV"; // your API key goes here;

// Add your code here

//function to create the elements option for categories
async function createOptions() {
  const response = await fetch(`${API_URL}/categories`);
  const categories = await response.json();
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

//function to get the images (limited 9) from the Cat API
async function fetchCat(category) {
  const url = `${API_URL}/images/search?limit=9&category_ids=${category}&api_key=${API_KEY}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

//function to display the images by categorie in the gallery
async function showGallery() {
  const category = categorySelect.value;
  const images = await fetchCat(category);

  gallery.innerHTML = "";
  
  images.forEach((image) => {
   const div = document.createElement("div");
   div.className = "gallery-item";
   const img = document.createElement("img");
   img.src = image.url;
   img.id = image.id;
   img.alt = "Cat";
 
   div.appendChild(img)
   gallery.appendChild(div);

    /* You'll need to append the heart and add an eventlistener to each image parent (div) when you create it. Here is the code to do that. You might have to modify it a bit differently if you used a different variable name.*/
   const heart = document.createElement("span");
   heart.classList.add("heart");
   heart.innerHTML = "&#x2764;";
   div.appendChild(heart);
   div.addEventListener("click", addToFavourite);
  });
}

//calling the function createOption when the page is loaded
window.onload = async function () {await createOptions();};

//calling the function showGallery when the category is selected 
getButton.addEventListener("click", showGallery);

/* Bonus */

/* Uncomment below for the bonus, this is the function that will be called when you click each image. I've used e.currentTarget instead of e.target because it's more reliable. I would encourage you to google it and read about it to understand the differences. */

//function to add the favorites images
async function addToFavourite(e) {
  e.currentTarget.classList.toggle("showheart");
  // Add your code here
  const imageID = e.target.id;
  const requestBody = JSON.stringify({"image_id": imageID});

  await fetch(`${API_URL}/favourites`, {
    method: 'POST',
    body: requestBody,
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
  });
}

//function to display the favorites images
async function showFavorites() {
  const response = await fetch (`${API_URL}/favourites/?limit=9&order=DESC`, {
    method: "GET",
    headers:{
      'x-api-key': API_KEY,
      'Content-Type': 'application/json'
    }
  });
  
  const favorites = await response.json();
  
  gallery.innerHTML = "";
  
  favorites.forEach(favorite => {
    const div = document.createElement("div");
    div.className = "gallery-item";
    const img = document.createElement("img");
    img.src = favorite.image.url;
    div.appendChild(img);
    gallery.appendChild(div);
  });
}

//calling showFavorites
const showFavoritesButton = document.getElementById("e.currentTarget");
showFavoritesButton.addEventListener("click", showFavorites);  



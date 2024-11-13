import API_KEY from "./apikey.js";

let allImages;
let searchParam = '';
let newParam = location.search.split('=').pop();
let currentPage = 1;
let currentIndex = 0;

const gallery = document.querySelector('.gallery');

// Search random images
const randomImages = () => {
    fetch(`https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=30`)
        .then(res => res.json())
        .then(data => {
            allImages = data;
            displayImages(allImages);
        });
}

// Search based on keyword
const searchImages = () => {
    fetch(`https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${searchParam}&page=${currentPage}&per_page=30`)
        .then(res => res.json())
        .then(data => {
            allImages = data.results;
            displayImages(allImages);
        });
}

const displayImages = (data) => {
    data.forEach((item, index) => {
        console.log(item);

        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = 'gallery-img';
        img.alt = item.alt_description;
        gallery.appendChild(img);

        // Popup image
        img.addEventListener('click', () => {
            currentIndex = index;
            showPopup(item);
        })
    });
}

// Popup
const showPopup = (item) => {
    let popup = document.querySelector('.image-popup');
    const closeBtn = document.getElementById('close-btn');
    const image = document.querySelector('.large-img');

    popup.classList.remove('hide');
    document.getElementById('fullscreen').href = item.urls.full;

    image.src = item.urls.regular;
    image.alt = image.title = item.alt_description;

    closeBtn.addEventListener('click', () => {
        popup.classList.add('hide');
    })
}

// Control Buttons
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const loadBtn = document.querySelector('.load-btn')

// Popup previous button
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showPopup(allImages[currentIndex]);
    }
})

// Popup next button
nextBtn.addEventListener('click', () => {
    if (currentIndex < (allImages.length - 1)) {
        currentIndex++;
        showPopup(allImages[currentIndex]);
    }
})

// Load more button
loadBtn.addEventListener('click', () => {
    currentPage++;
    run();
})

function run() {
    // Reset page number when new keyword is searched
    if (searchParam !== newParam) {
        currentPage = 1;
    }

    searchParam = newParam;
    if (searchParam === '') {
        randomImages();
    } else {
        searchImages();
    }
}

run();
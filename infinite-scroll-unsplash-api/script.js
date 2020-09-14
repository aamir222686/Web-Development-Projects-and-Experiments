// DOM elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = 'kGfsndEw8RhPjDbiqUrCZxR8NBGKKqYHBgugVHbQZas';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded == totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to set Attributes
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for links, photos & Add to DOM
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, then put both inside the imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

//  Get Photos from unsplash.

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    }
    catch (error) {
        console.log('Oops, there was an error!', error)
    }
}

//  Check to see if scrolling to the bottom og the page.
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
})


// On Load
getPhotos()
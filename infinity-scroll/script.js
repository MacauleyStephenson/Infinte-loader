const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
const count = 5;
const apiKey = 'uVHsKoc2zeuiQ1DcoD-G2mUwIROpLMJmpfF2sN9Rt5k';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded += totalImages){
        ready = true;
        loader.hidden = true;
        count = 30
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}


function setAttributes(element, attributes){
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements For Links And Photos, Add to DOM
function displayPhotos(){
    totalImages = photosArray.length;
    //Run function for each method
    photosArray.forEach((photo) =>{
        // Create <a> to link to unsplash
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
        //Event Listener
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside the image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){
        //Catch
    }
}

//Check to see if scrolling near the bottom of the page, load more photos
window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})


// On Load
getPhotos();
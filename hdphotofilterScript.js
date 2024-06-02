let smallImages = [];
let largeImages = [];
let defaultResolutionImages = [];
let minResolutionWidth = 1024;
let minResolutionHeight = 1024;

function resizePhotos() {
    let uploadButton = document.getElementById('uploadButton');
    let files = uploadButton.files;

    smallImages = [];
    largeImages = [];
    defaultResolutionImages = [];

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let img = new Image();

        img.onload = function() {
            if (this.width < minResolutionWidth || this.height < minResolutionHeight) {
                smallImages.push(URL.createObjectURL(file));
            } else {
                largeImages.push(URL.createObjectURL(file));
            }

            if (this.width === minResolutionWidth && this.height === minResolutionHeight) {
                defaultResolutionImages.push(URL.createObjectURL(file));
            }

            updateCounts();
        };

        img.src = URL.createObjectURL(file);
    }
}

function updateCounts() {
    document.getElementById('count1').innerText = smallImages.length + ' small photos';
    document.getElementById('count2').innerText = largeImages.length + ' large photos';
    document.getElementById('count-default').innerText = defaultResolutionImages.length + ' default resolution photos';
}

function downloadImages(size) {
    let images;
    switch (size) {
        case 'small':
            images = smallImages;
            break;
        case 'large':
            images = largeImages;
            break;
        case 'default':
            images = defaultResolutionImages;
            break;
    }

    for (let i = 0; i < images.length; i++) {
        let a = document.createElement('a');
        a.href = images[i];
        a.download = 'image' + i;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

function adjustResolution() {
    let newResolution = prompt("Enter the minimum resolution for large photos (width x height):", `${minResolutionWidth}x${minResolutionHeight}`);
    if (newResolution) {
        let parts = newResolution.split('x');
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            minResolutionWidth = parseInt(parts[0], 10);
            minResolutionHeight = parseInt(parts[1], 10);
            defaultResolutionImages = [];
            updateCounts();
        } else {
            alert("Invalid format. Please enter in the format width x height, e.g., 1024x1024.");
        }
    }
}

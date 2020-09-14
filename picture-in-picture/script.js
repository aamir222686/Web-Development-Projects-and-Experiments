const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt to select media stream and pass that to the video element, then play

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play()
        }
    } catch (err) {
        console.log(err, 'Something Went Wrong')
    }
}

// on load
selectMediaStream()

button.addEventListener('click', async () => {
    // Disable Button
    button.disabled = true;
    // start PIP mode
    await videoElement.requestPictureInPicture();
    // reset button
    button.disabled = false;
})
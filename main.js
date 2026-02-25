 const stopCam = () => {
    const video = document.getElementById('video');
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;
};

const startCam = () => {
    const video = document.getElementById('video');
    if (navigator.mediaDevices.getUserMedia && navigator.mediaDevices.getUserMedia({ video: true })) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(error => {
                console.error("Something went wrong!", error);
            });
    } else {
        console.log("getUserMedia not supported on your browser!");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    startCam();
});
const video_list = {
    "1": "videos/video1.mp4",
    "2": "videos/video2.mp4",
    "3": "videos/video3.mp4",
}

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
    let params = new URLSearchParams(document.location.search);
    let p_user_name = params.get("un") || "User 1";
    let p_interviewer_name = params.get("in") || "Juliana";
    let p_video = params.get("v") || "1";
    let p_size = params.get("s") || "1";
    let video_file = video_list[p_video] || video_list[0];

    let un_el = document.querySelector('.user_name.user');
    un_el.textContent = p_user_name;
    let in_el = document.querySelector('.user_name.interviewer');
    in_el.textContent = p_interviewer_name;

    let u_box = document.querySelector('.user_view');
    let i_box = document.querySelector('.interviewer_view');
    if (p_size == "2") {
        u_box.classList.add('big');
        i_box.classList.add('small');
    } else if (p_size == "3") {
        console.log('3')
        u_box.classList.add('small');
        i_box.classList.add('big');
    }

    let video_el = document.getElementById('cam-video');
    let video_src = document.createElement('source');
    video_src.setAttribute('src', video_file)
    video_src.setAttribute('type', 'video/mp4');
    video_el.appendChild(video_src);

    startCam();
});
console.log("Welcome to SongFly")
songlist = [
    { songname: 'Unstoppable -- The Score', filepath: "Music/1.mp3", coverpath: "Image/1.jpg" },
    { songname: 'Liggi --- Ritviz', filepath: "Music/2.mp3", coverpath: "Image/2.jpg" },
    { songname: 'Checques -- Shubh', filepath: "Music/3.mp3", coverpath: "Image/3.jpg" },
    { songname: 'Blinding Lights ', filepath: "Music/4.mp3", coverpath: "Image/4.jpg" },
    { songname: 'Still rollin -Shubh', filepath: "Music/5.mp3", coverpath: "Image/5.jpg" },
    { songname: 'Mera na -Shiddhu moose wala', filepath: "Music/6.mp3", coverpath: "Image/6.jpg" },
    { songname: 'Akhiyaan--- Mitraz', filepath: "Music/7.mp3", coverpath: "Image/7.jpg" },
]


songIndex = 0;
const newaudio = new Audio('Music/1.mp3');

function duration(element) {
    element.addEventListener('loadedmetadata', () => {

        const dur = parseInt(element.duration / 60) + ':' + parseInt(element.duration % 60);
        console.log(dur + 'Min');
        songduration.innerText=dur
        // return dur
    });
}

duration(newaudio);

const songs = Array.from(document.getElementsByClassName('songitem'));
songs.forEach((element, i) => {
    // console.log(element, i)
    element.getElementsByTagName('img')[0].src = songlist[i].coverpath;
    element.getElementsByTagName('span')[0].innerText = songlist[i].songname;


    // element.getElementsByTagName('span')[1].innerText = duration(newaudio);
});





playButton.addEventListener('click', () => {
    if (newaudio.paused || newaudio.currentTime <= 0) {
        newaudio.play()
            .then(() => {
                console.log('Audio playback started successfully');
                playButton.classList.remove('fa-play-circle');
                playButton.classList.add('fa-pause-circle');
                vlm.classList.remove('fa-volume-off')
                vlm.classList.add('fa-volume-high')
            })
            .catch(error => {
                console.error('Error starting audio playback:', error);
            });
    } else {
        newaudio.pause();
        playButton.classList.remove('fa-pause-circle');
        playButton.classList.add('fa-play-circle');
        vlm.classList.remove('fa-volume-high')
        vlm.classList.add('fa-volume-off')
    }
});

// For Handling Seekbar
newaudio.addEventListener('timeupdate', (e) => {
    //update seekbar
    console.log('timeupdate')
    const time = parseInt(newaudio.currentTime / newaudio.duration * 100)
    myprogressbar.value = time;
})

myprogressbar.addEventListener('change', () => {
    newaudio.currentTime = myprogressbar.value * newaudio.duration / 100
})


// #for comingsoon page
let card = Array.from(document.getElementsByClassName('comingsoon'));
// card.style = 'cursor:pointer';
card.forEach((element, i) => {
    // console.log(element, i)
    element.addEventListener('click', (element) => {
        const newWindow=window.open('',',_blank');
        newWindow.location = 'comingsoon.html';
    })
})


// #for getpremium page
prm.style = 'cursor:pointer';
prm.addEventListener('click', (e) => {
    const newWindow = window.open('', '_blank');
    newWindow.location = 'getpremium.html';
    

})

// for handing songlist play option


const listplay = Array.from(document.getElementsByClassName('listplay'));
function makeallplay() {
    listplay.forEach(element => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');

    });
}

listplay.forEach((element, i) => {
    // console.log(element,i)
    element.addEventListener('click', (e) => {
        if (newaudio.paused || newaudio.duration <= 0) {
            newaudio.play()
                .then(() => {
                    // document.getElementById('songname').i = songlist[i].songname;
                    document.getElementById('_img').src = songlist[i].coverpath;

                    console.log('Audio play succesfull')
                    makeallplay();
                    songIndex = parseInt(e.target.id);

                    element.classList.remove('fa-circle-play');
                    element.classList.add('fa-circle-pause');
                    vlm.classList.remove('fa-volume-off')
                    vlm.classList.add('fa-volume-high')
                    playButton.classList.remove('fa-play-circle');
                    playButton.classList.add('fa-pause-circle');
                    newaudio.src = `Music/${songIndex}.mp3`;
                    newaudio.play();
                    duration(newaudio);
                    

                })
                .catch(() => {
                    console.log("Error while starting playback")
                })
        }
        else {
            newaudio.pause()
            console.log('audio paused')
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
            vlm.classList.remove('fa-volume-high')
            vlm.classList.add('fa-volume-off')
            playButton.classList.remove('fa-pause-circle');
            playButton.classList.add('fa-play-circle');

        }
    });
})


// for volume controller


const volumeSlider = document.getElementById("volumeSlider");

volumeSlider.addEventListener("input", () => {

    const volumeValue = volumeSlider.value;
    newaudio.volume = volumeValue;
    volume_level.innerText = parseInt(volumeValue * 10)
    vlm.classList.remove('fa-volume-xmark')
    vlm.classList.add('fa-volume-high')


});


vlm.addEventListener('click', (e) => {
    newaudio.volume = 0;
    vlm.classList.remove('fa-volume-high')
    vlm.classList.add('fa-volume-xmark')
})


// Now turn on the next and previous button
next.addEventListener('click', (e) => {

    if (songIndex > 6) {
        songIndex = 1
    }
    else { songIndex++ }


    // makeallplay();
    newaudio.src = `Music/${songIndex}.mp3`;
    newaudio.play();
    document.getElementById('_img').src = songlist[songIndex - 1].coverpath;
    vlm.classList.remove('fa-volume-off')
    vlm.classList.add('fa-volume-high')
    playButton.classList.remove('fa-play-circle');
    playButton.classList.add('fa-pause-circle');
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');

    document.getElementById(parseInt(songIndex - 1)).classList.remove('fa-pause-circle');
    document.getElementById(parseInt(songIndex - 1)).classList.add('fa-play-circle');

    document.getElementById(parseInt(songIndex - 1)).classList.remove('fa-pause-circle');
    document.getElementById(parseInt(songIndex - 1)).classList.add('fa-play-circle');


})
previous.addEventListener('click', (e) => {

    if (songIndex <= 1) {
        songIndex = 7
    }
    else { songIndex-- }


    // makeallplay();
    newaudio.src = `Music/${songIndex}.mp3`;
    newaudio.play();
    document.getElementById('_img').src = songlist[songIndex - 1].coverpath;
    vlm.classList.remove('fa-volume-off')
    vlm.classList.add('fa-volume-high')
    playButton.classList.remove('fa-play-circle');
    playButton.classList.add('fa-pause-circle');
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
    document.getElementById(parseInt(songIndex + 1)).classList.remove('fa-pause-circle');
    document.getElementById(parseInt(songIndex + 1)).classList.add('fa-play-circle');

})














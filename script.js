const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const rewindButton = document.getElementById('rewindButton');
const fastForwardButton = document.getElementById('fastForwardButton');
const skipButton = document.getElementById('skipButton');

let audioFiles = [];
let currentSongIndex = 0;

// Fetch music files from the main process
window.electronAPI.getMusicFiles().then(files => {
    audioFiles = files.map(file => `music/${file}`);
    if (audioFiles.length > 0) {
        audioPlayer.src = audioFiles[currentSongIndex];
        updateSongTitle();
    }
});

playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playButton.textContent = 'Play';
    }
});
rewindButton.addEventListener('click', () => {
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
});
fastForwardButton.addEventListener('click', () => {
    audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
});

skipButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % audioFiles.length; //loop
    audioPlayer.src = audioFiles[currentSongIndex];
    updateSongTitle();
    cycleImage();
    audioPlayer.play();
});

audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
    audioPlayer.src = audioFiles[currentSongIndex];
    updateSongTitle();
    cycleImage();
    audioPlayer.play();
});

function updateSongTitle() {
    const titleElement = document.getElementById('currentSongTitle');
    const currentPath = audioFiles[currentSongIndex];
    const filename = currentPath.split('/').pop().replace(/\.mp3$/i, '');
    titleElement.textContent = `Now Playing: ${filename}`;
}

const coverImages = [
    './coverimages/temp1.png',
    './coverimages/temp2.png'
];
let currentImageIndex = 0;

function cycleImage() {
    currentImageIndex = (currentImageIndex + 1) % coverImages.length;
    const img = document.getElementById('songImage');
    img.src = coverImages[currentImageIndex];
}
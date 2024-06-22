
function playAudio() {
    const audio = new Audio(chrome.runtime.getURL('../audio.wav'));
    audio.volume = 0.1;
    audio.play();
}


playAudio();

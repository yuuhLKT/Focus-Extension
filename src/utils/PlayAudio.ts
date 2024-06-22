export async function playAudio() { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await new Promise((resolve) => {
        chrome.storage.local.get('bools', (result) => {
            resolve(result);
        });
    });

    const isAudioEnabled = result.bools.playVolume;

    if(isAudioEnabled){
        const audioUrl = chrome.runtime.getURL('./audio.wav');
        const audio = new Audio(audioUrl);
        audio.volume = 0.005;
        audio.play();
    }
}
import Confetti from "../components/Confetti";

chrome.storage.local.get(['confettiEnabled'], (result) => {
    const { confettiEnabled } = result;
    if (confettiEnabled) {
        Confetti.launch();
    }
});

const paper = document.getElementById('paper');
const speakBtn = document.getElementById('speak-btn');

function write() {
    const status = document.getElementById('status');
    const accuracy = document.getElementById('accuracy');

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.onstart = function() {
        status.innerHTML = `Listening, please speak...`;
    }

    recognition.onspeechend = function() {
        status.innerHTML = `Done listening...`;

        recognition.stop();
    }

    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        let confidence = event.results[0][0].confidence;

        accuracy.innerHTML = `${Math.round(confidence * 100)}% Accuracy`;
        paper.innerHTML += `${transcript} `;
    }

    recognition.start();
}

speakBtn.addEventListener('click', write);

const copier = document.getElementById('copier');

function copyWriting() {
    paper.select();
    paper.setSelectionRange(0, 99999);

    document.execCommand('copy');
    alert(`You just copied: ${paper.value}`);
}

copier.addEventListener('click', copyWriting);

const notesSection = document.getElementById('notes');
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
        status.innerHTML = `Stopped listening...`;

        recognition.stop();
    }

    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        let confidence = event.results[0][0].confidence;

        accuracy.innerHTML = `${Math.round(confidence * 100)}% Accuracy`;
        const paper = document.createElement('div');

        paper.classList.add('paper');
        paper.setAttribute('placeholder', 'Begin speaking to write...');
        paper.innerHTML += `${transcript}`;

        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = 'Copy';
        copyBtn.classList.add('copy-btn');
        copyBtn.addEventListener('click', copyToClipboard);

        function copyToClipboard() {
            const target = copyBtn.parentElement.firstChild;
            console.log(target.textContent);

            navigator.clipboard.writeText(target.textContent);
            alert(`You copied: ${target.textContent}`);
        }

        paper.appendChild(copyBtn);
        notesSection.appendChild(paper);
    }

    recognition.start();
}

speakBtn.addEventListener('click', write);

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
};

let timer = null;

refs.btnStop.disabled = true;

refs.btnStart.addEventListener('click', onStartDisco);
refs.btnStop.addEventListener('click', onStopDisco);

function onStartDisco() { 
    timer = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.btnStop.disabled = false;
    refs.btnStart.disabled = true;
}

function onStopDisco() { 
    clearInterval(timer);
    refs.btnStop.disabled = true;
    refs.btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


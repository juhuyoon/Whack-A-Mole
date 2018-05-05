const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

//get random amount of seconds
function randTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randHoles(holes){
    //console.log(holes.length)
    const indexHole = Math.floor(Math.random() * holes.length);
    const hole = holes[indexHole];
    if(hole === lastHole) {
        console.log('same hole');
       return randHoles(holes);
    }
    lastHole = hole;
    return hole;
}

function showMoles() {
    const time = randTime(200, 1000);
    const hole = randHoles(holes);
    hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) showMoles();
        }, time);
    }

        function startGame() {
            scoreBoard.textContent = 0;
            timeUp = false;
            score = 0;
            showMoles();
            setTimeout(() => timeUp = true, 10000)
          }

          function bonk(e) {
              if(!e.isTrusted) return; 
              score++;
              this.parentNode.classList.remove('up');
              scoreBoard.textContent = score;
          }

          moles.forEach(mole => mole.addEventListener('click', bonk));

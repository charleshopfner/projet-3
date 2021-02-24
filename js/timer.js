class Timer {
    constructor() {
        this.timer = document.getElementById('timer');
        // On récupère la date d'aujourd'hui en millisecondes
        this.now = new Date().getTime();
        // On rajoute les 20min correspondant au timer, et on calcule le delta
        this.endDate = this.now + 1200000;
        this.delta = this.endDate - this.now;
        this.setTimer = 0;
        this.isPlaying = false;
        this.name = "";
        this.forename = "";
        this.stationName = "";
        this.checkingStorage = false;
    }

    checkTimer = () => {
        if ('remainingTime' in sessionStorage) {
            this.hideCanvas();
            this.delta = sessionStorage.remainingTime
            this.play();
            this.checkingStorage = true;
        };
    }

    play = () => {
        // Condition pour éviter de pouvoir lancer plusieurs fois le timer
        if (!this.isPlaying) {
            this.setTimer = setInterval(() => {
                this.isPlaying = true;
                if (this.delta > 0) {
                    this.delta -= 1000;
                    // On convertit les millisecondes restantes en minutes et secondes
                    let remainingMin = Math.floor((this.delta % (1000 * 60 * 60)) / (1000 * 60));
                    let remainingSec = Math.floor((this.delta % (1000 * 60)) / 1000);
                    // opérateur ternaire pour rajouter un 0 lorsque les sec et min < 10
                    let prettyMin = remainingMin < 10 ? `0${remainingMin}` : remainingMin;
                    let prettySec = remainingSec < 10 ? `0${remainingSec}` : remainingSec;
                    // On récupère les valeurs des inputs et le nom de la station qui sont stockés
                    this.name = localStorage.name;
                    this.forename = localStorage.forename;
                    this.stationName = sessionStorage.stationName;
                    this.timer.innerHTML = `Vélo réservé à la station ${this.stationName} par ${this.forename} ${this.name}.<br> Temps restant : ${prettyMin}min ${prettySec}s`;
                    sessionStorage.setItem('remainingTime', this.delta);
                } else {
                    this.cancel();
                    this.timer.innerHTML = 'Les 20 minutes sont écoulées, le vélo ne vous est plus réservé !'
                }
            }, 1000);
            this.hideCanvas();
        };
    }

    hideCanvas = () => {
        document.getElementById('h3-reservation').className = 'hidden';
        document.getElementById('canvas-div').className = 'hidden';
        document.getElementById('reservation-btn').className = 'hidden';
        document.getElementById('cancel-btn').classList.remove('hidden');
        document.getElementById('name').setAttribute('disabled', null);
        document.getElementById('forename').setAttribute('disabled', null);
    }

    cancel = () => {
        this.isPlaying = false;
        clearInterval(this.setTimer);
        this.delta = this.endDate - this.now;
        sessionStorage.removeItem('remainingTime');
        this.timer.innerHTML = 'Votre réservation a été annulée.';
        document.getElementById('cancel-btn').className = 'hidden';
        document.getElementById('name').removeAttribute('disabled');
        document.getElementById('forename').removeAttribute('disabled');
        if (this.checkingStorage === true) {
            document.getElementById('h3-reservation').classList.remove('hidden');
            document.getElementById('reservation-btn').classList.remove('hidden');
        } else {
            canvas.clear();
            document.getElementById('canvas-div').className = 'canvas-div';
            document.getElementById('reservation-btn').classList.remove('hidden');
            document.getElementById('validation-btn').setAttribute('disabled', null)
        }
    }
}

const timer = new Timer;
document.getElementById('validation-btn').onclick = timer.play;
document.getElementById('cancel-btn').onclick = timer.cancel;
window.onload = timer.checkTimer;
class Slider {
    constructor() {
        this.currentSlide = 0;
        this.timer = 0;
        this.slides = document.getElementsByClassName('slide');
    }

    sliding = (n) => {
        this.slides[this.currentSlide].className = 'slide';
        this.currentSlide += n;
        this.slides[this.currentSlide].className = 'slide showing';
    }

    nextSlide = () => {
        // Condition qui s'active lorque l'on arrive à la dernière image du slider et qui permet retourner à la 1ère image.
        if (this.currentSlide === this.slides.length - 1) {
            this.currentSlide = 0;
            this.slides[this.slides.length - 1].className = 'slide';
            this.slides[this.currentSlide].className = 'slide showing';
        } else {
            this.sliding(1);
        }
    }

    previousSlide = () => {
        // Condition qui s'active lorque l'on arrive à la 1ère image du slider et qui permet d'aller à la dernière image.
        if (this.currentSlide === 0) {
            this.currentSlide = this.slides.length - 1;
            this.slides[0].className = 'slide';
            this.slides[this.currentSlide].className = 'slide showing';
        } else {
            this.sliding(-1);
        }
    }

    play = () => {
        clearInterval(this.timer);
        this.display();
    }

    pause = () => {
        clearInterval(this.timer);
    }

    display = () => {
        this.timer = setInterval(() => { this.nextSlide() }, 5000);
    }
}

const slider = new Slider();
slider.display();

document.getElementById('previous').onclick = slider.previousSlide;
document.getElementById('next').onclick = slider.nextSlide;
document.getElementById('play').onclick = slider.play;
document.getElementById('pause').onclick = slider.pause;
document.addEventListener('keydown', (e) => { if (e.keyCode === 39) { slider.nextSlide() } });
document.addEventListener('keydown', (e) => { if (e.keyCode === 37) { slider.previousSlide() } });
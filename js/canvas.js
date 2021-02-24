class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = 150;
        this.canvas.width = 300;
        this.painting = false;
    }

    display = () => {
        document.getElementById('canvas-div').className = 'canvas-div';
    }

    startPainting = (e) => {
        this.painting = true;
        this.draw(e);
    }

    draw = (e) => {
        // Si painting n'est pas true, la fonction s'arrête.
        if (!this.painting) return;
        // On récupère les coordonnées du canvas sur la page
        let x = e.pageX - this.canvas.offsetLeft;
        let y = e.pageY - this.canvas.offsetTop;
        // On définit les caractéristiques du tracé (épaisseur, forme du trait, couleur...)
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#69a5e6';
        this.ctx.lineTo(x, y);  // Point d'origine du tracé
        this.ctx.stroke();      // le tracé est une ligne
        this.ctx.beginPath();   // On initie le tracé
        this.ctx.moveTo(x, y);  // Point de fin du tracé
    }

    stopPainting = () => {
        // Permet d'éviter que les lignes se connectent lorsqu'on recommence une ligne
        this.ctx.beginPath();
        this.painting = false;
        document.getElementById('validation-btn').removeAttribute('disabled');
    }

    clear = () => {
        this.ctx.clearRect(0, 0, 300, 150);
        document.getElementById('validation-btn').setAttribute('disabled', null)
    }
}

const canvas = new Canvas();
document.getElementById('reservation-btn').addEventListener('click', canvas.display);
document.getElementById('canvas').addEventListener('mousedown', canvas.startPainting);
document.getElementById('canvas').addEventListener('mousemove', canvas.draw);
document.getElementById('canvas').addEventListener('mouseup', canvas.stopPainting);
document.getElementById('clear-canvas').onclick = canvas.clear;


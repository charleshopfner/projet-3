class Enable {
    constructor() {
        this.reservationBtn = document.getElementById('reservation-btn');
        this.validationBtn = document.getElementById('validation-btn');
        this.name = document.getElementById('name');
        this.forename = document.getElementById('forename');
        this.nameValue = "";
        this.forenameValue = "";
    }

    // Méthode qui vérifie si les deux champs sont bien remplis avant d'activer le bouton de réservation
    isFilled = () => {
        if (this.nameValue !== "" && this.forenameValue !== "") {
            this.reservationBtn.removeAttribute('disabled');
        } else {
            this.reservationBtn.setAttribute('disabled', null);
            document.getElementById('canvas-div').className = "hidden";
        }
    }

    // Méthode qui checke si les nom & prénom sont présent dans le localstorage, et qui est appelée lorsqu'on clique sur un marqueur dans api.js
    isStorageFilled = () => {
        if (localStorage.name && localStorage.forename) {
            this.reservationBtn.removeAttribute('disabled');
        }
    }


    // Listener qui récupère la valeur des inputs à chaque changement de la valeur, et qui lance la fonction isFilled pour vérifier les conditions.
    enableReservation = () => {
        this.name.oninput = () => {
            this.nameValue = this.name.value;
            this.isFilled();
        };
        this.forename.oninput = () => {
            this.forenameValue = this.forename.value;
            this.isFilled();
        };
    }
    // on store les valeur des inputs en local, et donc n'expireront pas lorsque le navigateur se ferme. Elles seront stockées lorsqu'on clique sur le bouton de réservation.
    store = () => {
        localStorage.name = this.nameValue;
        localStorage.forename = this.forenameValue;
    }
}

const enable = new Enable;
enable.enableReservation();
document.getElementById('reservation-btn').onclick = enable.store;

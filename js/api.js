class Map {
    constructor() {
        // Création de la carte
        this.map = L.map('carte').setView([45.764043, 4.835659], 14);
        // array dans laquelle on push les données parsées
        this.stations = [];
        // définition des deux types de marqueurs
        this.redIcon = L.icon(
            {
                iconUrl: "images/red_marker.png",
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -30]
            });
        this.greenIcon = L.icon(
            {
                iconUrl: "images/green_marker.png",
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -30]
            });
        this.marker = '';
    }

    showMap() {
        // Récupération de la map que l'on veut afficher, puis ajout de celle-ci à this.map
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(this.map);
    }

    // Fonction asynchrone créée avec async await
    async main() {
        try {
            let response = await fetch('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=79704fd8004cc0602ace2dffd848855442a9f6c0');
            let data = await response.json();
            // On boucle les élements du json reçu et on parse les infos dans des objets "station", qu'on ajoute ensuite au tableau "stations"
            for (let element of data) {
                let station = {
                    address: element.address,
                    availableBikeStands: element.available_bike_stands,
                    availableBikes: element.available_bikes,
                    name: element.name,
                    position: element.position,
                    isOpen: element.status,
                };
                this.stations.push(station);
                // Toujours dans la même boucle, on définit si la station a un marqueur rouge ou vert suivant le nombre de vélos disponibles et on les ajoute à la map.
                if (station.isOpen !== 'OPEN') {
                    this.marker = L.marker([station.position.lat, station.position.lng], { icon: this.redIcon }).bindPopup(`<p>${station.name}</p> <p>STATION FERMÉE</p>`).addTo(this.map);
                } else if (station.availableBikes === 0) {
                    this.marker = L.marker([station.position.lat, station.position.lng], { icon: this.redIcon }).bindPopup(`<p>${station.name}</p><p> Pas de vélo disponible</p><p>Places disponibles : ${station.availableBikeStands}</p>`).addTo(this.map);
                } else {
                    this.marker = L.marker([station.position.lat, station.position.lng], { icon: this.greenIcon }).bindPopup(`<p>${station.name}</p><p>Vélos disponibles : ${station.availableBikes}</p><p>Places disponibles : ${station.availableBikeStands}</p>`).addTo(this.map);
                }
                // event listeners pour display les infos des stations dans le div.
                if (station.isOpen !== 'OPEN' || station.availableBikes === 0) {
                    this.marker.addEventListener('click', () => {
                        document.getElementById('display-station').innerHTML = `<p>${station.name}<br>Adresse : ${station.address}<br> Aucun vélo n'est actuellement disponible !</p>`
                        document.getElementById('user-info').className = 'hidden';
                        document.getElementById('canvas-div').className = 'hidden';
                        document.getElementById('h3-reservation').className = "hidden";
                    })
                } else {
                    this.marker.addEventListener('click', () => {
                        // On récupère le nom & prénom du localstorage si il y a des valeurs stockées.
                        if ("name" in localStorage) {
                            document.getElementById('name').value = localStorage.name
                        };
                        if ("forename" in localStorage) {
                            document.getElementById('forename').value = localStorage.forename
                        };
                        enable.isStorageFilled();
                        document.getElementById('display-station').innerHTML =
                            `<p>${station.name}<br>Adresse : ${station.address}<br>Vélos disponibles : ${station.availableBikes}<br> Places disponibles : ${station.availableBikeStands}</p>`;
                        document.getElementById('user-info').className = "user-info";
                        document.getElementById('h3-reservation').className = "hidden";
                        sessionStorage.stationName = station.name;
                    })
                }
            }
        } catch (error) {
            console.error("error in main()", error);
        }
    }
}
const map = new Map();
map.showMap();
map.main()
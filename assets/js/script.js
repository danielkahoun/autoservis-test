class Vehicle {
    constructor(znacka, model, rokVyroby, najeteKilometry) {
        this.znacka = znacka;
        this.model = model;
        this.rokVyroby = rokVyroby;
        this.najeteKilometry = najeteKilometry;
    }
}

class Autoservis {
    constructor(nazev) {
        this.nazev = nazev;
        this.vehicles = [];
    }
    getAllVehicles() {
        return this.vehicles;
    }
    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }
    removeVehicle(id) {
        this.vehicles.splice(id, 1);
    }
}

autoservis = new Autoservis("Autoservis");
load();

function addVehicle() {
    let formData = document.getElementsByTagName("input");
    autoservis.addVehicle(new Vehicle(formData[0].value, formData[1].value, formData[2].value, formData[3].value));

    console.log(autoservis.getAllVehicles());

    for (let i = 0; i < 4; i++) {
        formData[i].value = "";
    }

    save();
}

function load() {
    LSLoad();
    renderVehicles();
}

function save() {
    LSSave();
    renderVehicles();
}

function LSLoad() {
    let vehicles = JSON.parse(localStorage.getItem("autoservis"));

    for (let i = 0; i < vehicles.length; i++) {
        autoservis.addVehicle(vehicles[i]);
        console.log(vehicles[i]);
    }
}

function LSSave() {
    localStorage.setItem("autoservis", JSON.stringify(autoservis.getAllVehicles()));
}

function renderVehicles() {

    document.querySelector("#vehicles").innerHTML = "";
    let vehicles = autoservis.getAllVehicles();

    for (let i = 0; i < vehicles.length; i++) {
        const column = document.createElement("div"); //column is-4
        const card = document.createElement("div"); //card
        const title = document.createElement("p"); //title
        const subtitle = document.createElement("p"); //subtitle
        const button = document.createElement("button"); //button is-primary

        column.classList.add("column");
        column.classList.add("is-4");
        card.classList.add("card");
        card.classList.add("p-4");
        title.classList.add("title");
        title.classList.add("is-4");
        subtitle.classList.add("subtitle");
        subtitle.classList.add("is-6");
        button.classList.add("button");
        button.classList.add("is-danger");

        title.appendChild(document.createTextNode(vehicles[i].znacka + " " + vehicles[i].model));
        subtitle.appendChild(document.createTextNode("Rok výroby: " + vehicles[i].rokVyroby + ", " + vehicles[i].najeteKilometry + " km"));
        button.appendChild(document.createTextNode("Smazat vozidlo"));
        button.addEventListener('click', (event) => {
            autoservis.removeVehicle(i);
            save();
        });
        card.appendChild(title);
        card.appendChild(subtitle);
        card.appendChild(button);
        column.appendChild(card);

        document.querySelector("#vehicles").appendChild(column);
    }

}
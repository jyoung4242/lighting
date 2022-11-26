import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Lighting, Vector, Light } from "@peasy-lib/peasy-lighting";
import { version } from "html-webpack-plugin";

const template = `
<div class="content">
    <div id="ship" class="ship"></div>
    <div id="roid" class="asteroid"></div>
</div>
`;

const model = {};
let viewport: HTMLElement;

UI.create(document.body, template, model);
UI.update();

viewport = document.querySelector(".content");
Lighting.initialize(viewport);

let light = Lighting.addLight({
  id: "white",
  position: new Vector(800, 200),
  radius: 1000,
  color: "white",
  viewport: viewport,
});

let ship = {
  element: document.getElementById("ship"),
  position: new Vector(100, 10),
  orientation: 0,
  enity: undefined as any,
};

let roid = {
  element: document.getElementById("roid"),
  position: new Vector(100, 100),
  orientation: 0,
  enity: undefined as any,
};

ship.enity = Lighting.addEntities([
  {
    id: "ship",
    position: ship.position,
    orientation: ship.orientation,
    size: new Vector(50, 50),
    normalMap: "./assets/playernormal.png",
  },
]);

roid.enity = Lighting.addEntities([
  {
    id: "roid",
    position: roid.position,
    orientation: roid.orientation,
    size: new Vector(80, 80),
    normalMap: "./assets/asteroid normal.png",
  },
]);

setInterval(() => {
  UI.update();
  Lighting.update();
}, 1000 / 60);

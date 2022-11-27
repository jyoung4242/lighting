import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Lighting, Vector, Light } from "@peasy-lib/peasy-lighting";
import { version } from "html-webpack-plugin";

const template = `
<div class="content">
    <div id="\${ship.id}" class="ship" style="translate: \${ship.position.x}px \${ship.position.y}px; rotate: \${ship.orientation}deg"></div>
    <div id="\${roid.id}" class="asteroid" style="translate: \${roid.position.x}px \${roid.position.y}px; rotate: \${roid.orientation}deg background-position: \${roid.cssPosition}"></div>
</div>
`;

const model = {
  ship: {
    id: "ship",
    element: document.getElementById("ship"),
    position: new Vector(100, 10),
    orientation: 0,
    entity: undefined as any,
  },
  roid: {
    id: "roid",
    element: document.getElementById("roid"),
    position: new Vector(100, 100),
    orientation: 0,
    entity: undefined as any,
    cssPosition: "0px 0px",
  },
};
let viewport: HTMLElement;

UI.create(document.body, template, model);
UI.update();

viewport = document.querySelector(".content");
Lighting.initialize(viewport);

let light = Lighting.addLight({
  id: "white",
  position: new Vector(600, 200),
  radius: 1000,
  color: "white",
  viewport: viewport,
});

model.ship.entity = Lighting.addEntities([
  {
    id: "ship",
    position: model.ship.position,
    orientation: model.ship.orientation,
    size: new Vector(50, 50),
    normalMap: "./assets/playernormal.png",
  },
]);

model.roid.entity = Lighting.addEntities([
  {
    id: "roid",
    position: model.roid.position,
    orientation: model.roid.orientation,
    size: new Vector(80, 80),
    normalMap: "./assets/asteroid normal.png",
  },
]);

setInterval(() => {
  UI.update();
  Lighting.update();
}, 1000 / 60);

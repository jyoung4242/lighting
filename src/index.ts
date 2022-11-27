import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Lighting, Vector, Light } from "@peasy-lib/peasy-lighting";
import playerNormal from "./assets/playernormal.png";
import roidNormal from "./assets/asteroid normal.png";

const template = `
<div class="content">
    <div id="\${ship.id}" class="ship" style="translate: \${ship.position.x}px \${ship.position.y}px;transform-origin: center; rotate: \${ship.orientation}deg"></div>
    <div id="\${roid.id}" class="asteroid" style="translate: \${roid.position.x}px \${roid.position.y}px; rotate: \${roid.orientation}deg; transform-origin: center; background-position: \${roid.cssPosition}"></div>
</div>
`;

const model = {
  ship: {
    id: "ship",
    element: document.getElementById("ship"),
    position: new Vector(100, 10),
    orientation: 0,
    entity: undefined as any,
    sizeoffset: new Vector(25, 25),
  },
  roid: {
    id: "roid",
    element: document.getElementById("roid"),
    position: new Vector(100, 100),
    orientation: 0,
    entity: undefined as any,
    cssPosition: "0px 0px",
    sizeoffset: new Vector(40, 40),
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
    position: model.ship.position.add(model.ship.sizeoffset),
    orientation: model.ship.orientation,
    size: new Vector(50, 50),
    normalMap: playerNormal,
  },
]);

model.roid.entity = Lighting.addEntities([
  {
    id: "roid",
    position: model.roid.position.add(model.roid.sizeoffset),
    orientation: model.roid.orientation,
    size: new Vector(80, 80),
    normalMap: roidNormal,
  },
]);

setInterval(() => {
  model.ship.orientation += 0.5;
  model.roid.orientation += 0.5;
  UI.update();
  Lighting.update();
}, 1000 / 60);

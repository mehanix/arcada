import { Container, Graphics, InteractionEvent } from "pixi.js";
import { viewportX, viewportY } from "../../helpers/ViewportCoordinates";
import { useStore } from "../../stores/EditorStore";

export class Pointer extends Container {

    private graphic: Graphics;
    constructor() {
        super();
        this.graphic = new Graphics();
        this.graphic.lineStyle(1).beginFill(0x0).drawCircle(0,0,2);
        this.addChild(this.graphic);
    }

    public update(ev:InteractionEvent) {
        let worldX = viewportX(ev.data.global.x)
        let worldY = viewportY(ev.data.global.y)
        if (useStore.getState().snap) {
            worldX = Math.trunc(worldX - worldX%10)
            worldY = Math.trunc(worldY - worldY%10)
        }


        this.position.set(worldX, worldY);

    }
}
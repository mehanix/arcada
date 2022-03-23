import { Sprite, Texture } from "pixi.js";
import { METER } from "../../constants";
import { TransformLayer } from "./TransformControls/TransformLayer";

export class Furniture extends Sprite {

  
    private id:number; // fiecare mobila isi stie index-ul in plan. uuids?
    // private dragging: boolean;

    private transformLayer: TransformLayer;
    constructor(resourcePath: string, id:number) {

        let texture = Texture.from(resourcePath);
        super(texture);
        this.transformLayer = TransformLayer.Instance;

        this.interactive = true;
        // this.dragging = false;
        this.width = 2.6* METER;
        this.height = METER;
        this.id = id;
        console.log(this.id)

        this.on('mousedown', this.onMouseDown)
        this.on('mousemove', this.onMouseMove)
        // this.on('mouseup', this.onMouseUp)

    }

    private onMouseDown() {

        this.transformLayer.select(this);
    }

    private onMouseMove() {
        this.transformLayer.update();
    }
    

   

}
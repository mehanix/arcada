import { IViewportOptions, Viewport } from "pixi-viewport";
import { TilingSprite } from "pixi.js";
import { Furniture } from "../objects/2d/Furniture";

export class Main extends Viewport {

    private bkgPattern: TilingSprite;
    constructor(options:IViewportOptions) {
        super(options);

        this.bkgPattern = TilingSprite.from("background-pattern.svg", { width: options.worldWidth ?? 0, height: options.worldHeight ?? 0 });
        this.addChild(this.bkgPattern);

        let spr = new Furniture("sofa.svg", this.plugins);
        let spr2 = new Furniture("sofa.svg",this.plugins);

        this.addChild(spr);
        this.addChild(spr2);

        this.drag().pinch().wheel().clamp({direction: 'all'}).clampZoom({minScale: 1.0, maxScale:3.0})
    }

}

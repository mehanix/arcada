import { IViewportOptions, PluginManager, Viewport } from "pixi-viewport";
import { TilingSprite } from "pixi.js";
import { FloorPlan } from "../FloorPlan";

export class Main extends Viewport {

    private bkgPattern: TilingSprite;

    private floorPlan: FloorPlan;
    public static viewportPluginManager: PluginManager;

    constructor(options:IViewportOptions) {
        super(options);

        Main.viewportPluginManager = this.plugins;
        this.drag().pinch().wheel().clamp({direction: 'all'}).clampZoom({minScale: 1.0, maxScale:3.0})

        this.bkgPattern = TilingSprite.from("background-pattern.svg", { width: options.worldWidth ?? 0, height: options.worldHeight ?? 0 });
        this.addChild(this.bkgPattern);

        this.floorPlan = FloorPlan.Instance;
        this.addChild(this.floorPlan);

        this.floorPlan.addFurniture("sofa");
        this.floorPlan.addFurniture("sofa");
    }

}

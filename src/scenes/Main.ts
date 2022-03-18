import { IViewportOptions, PluginManager, Viewport } from "pixi-viewport";
import { Loader, TilingSprite } from "pixi.js";
import { FloorPlan } from "../objects/2d/FloorPlan";
import { assets } from "../objects/2d/assets"
import { TransformLayer } from "../objects/2d/TransformControls/TransformLayer";
export class Main extends Viewport {

    private bkgPattern: TilingSprite;

    private floorPlan: FloorPlan;
    public static viewportPluginManager: PluginManager;
    transformLayer: TransformLayer;

    constructor(options:IViewportOptions) {
        super(options);

        Loader.shared.add(assets);

        // connect the events
        Loader.shared.onComplete.once(this.setup, this);
        // Start loading!
        Loader.shared.load();

  
    }

    private setup(scene:any) {
        Main.viewportPluginManager = this.plugins;
        // this.drag().clamp({direction: 'all'})
        // .wheel().clampZoom({minScale: 1.0, maxScale:3.0})
        this.bkgPattern = TilingSprite.from("background-pattern", { width: scene.worldWidth ?? 0, height: scene.worldHeight ?? 0 });
        this.addChild(this.bkgPattern);

        this.floorPlan = FloorPlan.Instance;
        this.addChild(this.floorPlan);

        this.transformLayer = TransformLayer.Instance;
        this.addChild(this.transformLayer)

        this.floorPlan.addFurniture("sofa");
        this.floorPlan.addFurniture("sofa");



    }

}

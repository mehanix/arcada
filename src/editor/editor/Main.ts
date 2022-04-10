import { IViewportOptions, PluginManager, Viewport } from "pixi-viewport";
import { Loader, TilingSprite } from "pixi.js";
import { FloorPlan } from "./objects/FloorPlan";
import { assets } from "./objects/assets"
import { TransformLayer } from "./objects/TransformControls/TransformLayer";
import { Label } from "./objects/TransformControls/Label";
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
        // this.setup(this);
        console.log("hi")

    }

    private setup(scene:any) {
        console.log("done loading")
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

        // let rectGraph = new Graphics();
        // rectGraph.interactive = true;
        // rectGraph.beginFill().drawRect(100,100,200,200).endFill()
        // rectGraph.on("mousedown", ()=>{console.log("cleck test")})

        // this.addChild(rectGraph);
        this.addChild(new Label(255));

    }

}

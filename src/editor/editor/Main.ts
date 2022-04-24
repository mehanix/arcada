import { IViewportOptions, PluginManager, Viewport } from "pixi-viewport";
import { InteractionEvent, Loader, TilingSprite } from "pixi.js";
import { FloorPlan } from "./objects/FloorPlan";
import { assets } from "./objects/assets"
import { TransformLayer } from "./objects/TransformControls/TransformLayer";
import { FurnitureData } from "../../stores/FurnitureStore";
import { Tool, useStore } from "../../stores/ToolStore";
import { AddNodeAction } from "./actions/AddNodeAction";
import { ToolStateManager } from "./actions/ToolStateManager";
export class Main extends Viewport {

    private bkgPattern: TilingSprite;

    private floorPlan: FloorPlan;
    public static viewportPluginManager: PluginManager;
    transformLayer: TransformLayer;
    toolStateManager:ToolStateManager;

    constructor(options: IViewportOptions) {
        super(options);

        Loader.shared.add(assets);

        // connect the events
        Loader.shared.onComplete.once(this.setup, this);
        // Start loading!
        Loader.shared.load();
        // this.setup(this);
        console.log("hi")

    }

    private setup(scene: any) {
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

        this.toolStateManager = ToolStateManager.Instance;
        this.addChild(this.toolStateManager.preview)


        let f1: FurnitureData = {
            width: "2.0",
            height: "1.0",
            id: "canapea-1-l-2-1",
            name: "canapea mare"
        }

        let f2: FurnitureData = {
            width: "1.6",
            height: "2.0",
            id: "king-size-bed-1.6-2",
            name: "canapea mare"
        }
        let f3: FurnitureData = {
            width: "0.6",
            height: "0.6",
            id: "plant-0.6-0.6",
            name: "planta"
        }
        let id1 = this.floorPlan.addFurniture(f1, "living_room");
        let id2 = this.floorPlan.addFurniture(f2, "bedroom");
        let id3 = this.floorPlan.addFurniture(f3, "bedroom");

        this.floorPlan.setFurniturePosition(id1, 100, 100);
        this.floorPlan.setFurniturePosition(id2, 400, 150);
        this.floorPlan.setFurniturePosition(id3, 200, 600);


        this.on("mousedown", this.checkTools)
        this.on("mousemove", this.updatePreview)
        // this.floorPlan.addFurniture("http://localhost:4133/kitchen/aragaz-4-ochiuri");
        // this.floorPlan.addFurniture("http://localhost:4133/bedroom/king-size-bed");

        // let rectGraph = new Graphics();
        // rectGraph.interactive = true;
        // rectGraph.beginFill().drawRect(100,100,200,200).endFill()
        // rectGraph.on("mousedown", ()=>{console.log("cleck test")})

        // this.addChild(rectGraph);

    }
    private updatePreview(ev:InteractionEvent) {
        this.toolStateManager.updatePreview(ev);
    }
    private checkTools(ev:InteractionEvent) {
        ev.stopPropagation()
        switch (useStore.getState().activeTool) {
            case Tool.WallAdd:
                let action = new AddNodeAction(undefined, ev.data.global)
                action.execute();
                break;
        }
    }

}

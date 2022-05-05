import { IViewportOptions, PluginManager, Viewport } from "pixi-viewport";
import { InteractionEvent, Loader } from "pixi.js";
import { FloorPlan } from "./objects/FloorPlan";
import { TransformLayer } from "./objects/TransformControls/TransformLayer";
import { Tool, useStore } from "../../stores/ToolStore";
import { AddNodeAction } from "./actions/AddNodeAction";
import { ToolStateManager } from "./actions/ToolStateManager";
// import { FurnitureData } from "../../stores/FurnitureStore";
export class Main extends Viewport {


    private floorPlan: FloorPlan;
    public static viewportPluginManager: PluginManager;
    transformLayer: TransformLayer;
    toolStateManager:ToolStateManager;

    constructor(options: IViewportOptions) {
        super(options);


        // connect the events
        Loader.shared.onComplete.once(this.setup, this);
        // Start loading!
        Loader.shared.load();
        // this.setup(this);

    }

    private setup() {
        Main.viewportPluginManager = this.plugins;
        // this.drag().clamp({direction: 'all'})
        // .wheel().clampZoom({minScale: 1.0, maxScale:3.0})
        // this.bkgPattern = TilingSprite.from("background-pattern", { width: scene.worldWidth ?? 0, height: scene.worldHeight ?? 0 });
        // this.addChild(this.bkgPattern);

        this.floorPlan = FloorPlan.Instance;
        this.addChild(this.floorPlan);

        this.transformLayer = TransformLayer.Instance;
        this.addChild(this.transformLayer)

        this.toolStateManager = ToolStateManager.Instance;
        this.addChild(this.toolStateManager.preview)

        this.on("mousedown", this.checkTools)
        this.on("mousemove", this.updatePreview)

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

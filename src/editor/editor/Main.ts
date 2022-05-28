import { IViewportOptions, PluginManager, Viewport } from "pixi-viewport";
import { Application, InteractionEvent, Loader, Point, TilingSprite } from "pixi.js";
import { FloorPlan } from "./objects/FloorPlan";
import { TransformLayer } from "./objects/TransformControls/TransformLayer";
import { useStore } from "../../stores/EditorStore";
import { AddNodeAction } from "./actions/AddNodeAction";
import { AddWallManager } from "./actions/AddWallManager";
import { viewportX, viewportY } from "../../helpers/ViewportCoordinates";
import { Tool } from "./constants";
import { Pointer } from "./Pointer";
// import { FurnitureData } from "../../stores/FurnitureStore";
export class Main extends Viewport {


    private floorPlan: FloorPlan;
    public static viewportPluginManager: PluginManager;
    public static app:Application;
    transformLayer: TransformLayer;
    addWallManager:AddWallManager;
    bkgPattern: TilingSprite;
    public pointer:Pointer;
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
        this.drag().clamp({direction: 'all'})
        .wheel().clampZoom({minScale: 1.0, maxScale:6.0})
        this.bkgPattern = TilingSprite.from("./pattern.svg", { width: this.worldWidth ?? 0, height: this.worldHeight ?? 0 });
        this.addChild(this.bkgPattern);

        this.floorPlan = FloorPlan.Instance;
        this.addChild(this.floorPlan);

        this.transformLayer = TransformLayer.Instance;
        this.addChild(this.transformLayer)

        this.addWallManager = AddWallManager.Instance;
        this.addChild(this.addWallManager.preview)
        
        this.pointer = new Pointer();
        this.addChild(this.pointer);
        this.on("mousedown", this.checkTools)
        this.on("mousemove", this.updatePreview)

    }
    private updatePreview(ev:InteractionEvent) {
        this.addWallManager.updatePreview(ev);
        this.pointer.update(ev);
    }
    private checkTools(ev:InteractionEvent) {
        ev.stopPropagation()
        switch (useStore.getState().activeTool) {
            case Tool.WallAdd:
                let point = new Point(viewportX(ev.data.global.x), viewportY(ev.data.global.y));
                let action = new AddNodeAction(undefined, point)
                action.execute();
                break;
        }
    }

}

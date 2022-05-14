import { Graphics, InteractionEvent } from "pixi.js";
import { viewportX, viewportY } from "../../../helpers/ViewportCoordinates";
import { WALL_THICKNESS } from "../constants";
import { TransformLayer } from "../objects/TransformControls/TransformLayer";
import { WallNode } from "../objects/Walls/WallNode";
import { AddWallAction } from "./AddWallAction";

// tracks current action data
export class AddWallManager {
    

    private static instance:AddWallManager;

    public previousNode:WallNode;

    public preview:Graphics;
    private constructor() {
        this.previousNode = undefined;
        this.preview = new Graphics();
        this.preview.clear();


    }

    public updatePreview(ev:InteractionEvent) {
        if (this.previousNode === undefined) {
            return;
        }
        AddWallManager.Instance.preview
        .clear()
        .lineStyle(WALL_THICKNESS,0x1f1f1f)
        .moveTo(this.previousNode.x, this.previousNode.y)
        .lineTo(viewportX(ev.data.global.x), viewportY(ev.data.global.y));
    }
    public step(node:WallNode) {
        if (this.previousNode === undefined) {
            this.previousNode = node;
            return;
        }

        if (this.previousNode.getId() === node.getId()) {
            this.previousNode = undefined;
            return;
        } else {
            let wallAction = new AddWallAction(this.previousNode, node);
            wallAction.execute();
        }

        this.previousNode = node;
        this.preview.clear();
        
    }

    public unset() {
        this.previousNode = undefined;
        this.preview.clear();
    }
    public static get Instance()
    {
        return this.instance || (this.instance = new this());
    }

    public resetTools() {
        TransformLayer.Instance.deselect();
        this.unset();
    }
}


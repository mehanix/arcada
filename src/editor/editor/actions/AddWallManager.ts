import { Graphics, InteractionEvent } from "pixi.js";
import { euclideanDistance } from "../../../helpers/EuclideanDistance";
import { Point } from "../../../helpers/Point";
import { viewportX, viewportY } from "../../../helpers/ViewportCoordinates";
import { INTERIOR_WALL_THICKNESS, METER, WALL_THICKNESS } from "../constants";
import { FloorPlan } from "../objects/FloorPlan";
import { Label } from "../objects/TransformControls/Label";
import { TransformLayer } from "../objects/TransformControls/TransformLayer";
import { WallNode } from "../objects/Walls/WallNode";
import { AddWallAction } from "./AddWallAction";
import { Preview } from "./MeasureToolManager";

// tracks current action data
export class AddWallManager {


    private static instance: AddWallManager;

    public previousNode: WallNode;

    public preview: Preview;

    private constructor() {
        this.previousNode = undefined;
        this.preview = new Preview();


    }

    // checks if step is valid
    public checkStep(coords:Point) {
        if (this.previousNode == undefined) {
            for (let [id,node] of FloorPlan.Instance.getWallNodeSeq().getWallNodes()) {
                if (euclideanDistance(coords.x, node.x, coords.y, node.y) < 0.3 * METER) {
                    return false;
                }
            }
            return true;
        }

        if (euclideanDistance(coords.x, this.previousNode.x, coords.y, this.previousNode.y) < 0.3 * METER) {
            return false;
        }
        return true;
    }
    public step(node: WallNode) {
        // first click. set first node
        if (this.previousNode === undefined) {
            this.previousNode = node;
            this.preview.set(this.previousNode.position)
            return;
        }

        // double click. end chain
        if (this.previousNode.getId() === node.getId()) {
            this.previousNode = undefined;
            this.preview.set(undefined)
            return;
        }

        //new node on screen
        let wallAction = new AddWallAction(this.previousNode, node);
        wallAction.execute();
        this.preview.set(node.position)

        this.previousNode = node;
        this.preview.set(this.previousNode.position)
        // this.sizeLabel.visible = false;

    }

    public updatePreview(ev:InteractionEvent) {
        this.preview.updatePreview(ev, true);

    }
    public unset() {
        this.previousNode = undefined;
        this.preview.set(undefined);
    }
    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public resetTools() {
        TransformLayer.Instance.deselect();
        this.unset();
    }
}


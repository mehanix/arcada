import { Graphics, InteractionEvent } from "pixi.js";
import { euclideanDistance } from "../../../helpers/EuclideanDistance";
import { viewportX, viewportY } from "../../../helpers/ViewportCoordinates";
import { INTERIOR_WALL_THICKNESS, WALL_THICKNESS } from "../constants";
import { Label } from "../objects/TransformControls/Label";
import { TransformLayer } from "../objects/TransformControls/TransformLayer";
import { WallNode } from "../objects/Walls/WallNode";
import { AddWallAction } from "./AddWallAction";

// tracks current action data
export class AddWallManager {


    private static instance: AddWallManager;

    public previousNode: WallNode;

    public preview: Graphics;

    private sizeLabel: Label;
    private constructor() {
        this.previousNode = undefined;
        this.preview = new Graphics();
        this.preview.clear();

        this.sizeLabel = new Label();
        this.sizeLabel.visible = false;
        this.preview.addChild(this.sizeLabel)


    }

    public updatePreview(ev: InteractionEvent) {
        if (this.previousNode === undefined) {
            return;
        }
        let newX = viewportX(ev.data.global.x);
        let newY = viewportY(ev.data.global.y);
        AddWallManager.Instance.preview
            .clear()
            .lineStyle(INTERIOR_WALL_THICKNESS, 0x1f1f1f)
            .moveTo(this.previousNode.x, this.previousNode.y)
            .lineTo(newX, newY);

        let length = euclideanDistance(this.previousNode.x, newX, this.previousNode.y, newY);
        this.sizeLabel.update(length);
        this.sizeLabel.position.x = Math.abs(newX + this.previousNode.x) / 2
        this.sizeLabel.position.y = Math.abs(newY + this.previousNode.y) / 2
        this.sizeLabel.visible = true;


    }
    public step(node: WallNode) {
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
        this.sizeLabel.visible = false;

    }

    public unset() {
        this.previousNode = undefined;
        this.preview.clear();
    }
    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public resetTools() {
        TransformLayer.Instance.deselect();
        this.unset();
    }
}


import { Graphics, InteractionEvent } from "pixi.js";
import { euclideanDistance } from "../../../helpers/EuclideanDistance";
import { Point } from "../../../helpers/Point";
import { viewportX, viewportY } from "../../../helpers/ViewportCoordinates";
import { Tool, WALL_THICKNESS } from "../constants";
import { Label } from "../objects/TransformControls/Label";

export class Preview {
    private static instance: Preview;
    public preview: Graphics;
    public startPoint:Point;
    private sizeLabel: Label;
    public constructor() {
        this.startPoint = undefined;
        this.preview = new Graphics();
        this.sizeLabel = new Label();
        this.sizeLabel.visible = false;
        this.preview.addChild(this.sizeLabel)
    }

    public set(value:Point){
        this.startPoint = value;
        this.preview.clear();
        this.sizeLabel.visible = false;
    }

    public updatePreview(ev:InteractionEvent, isWall = false) {
        if (this.startPoint === undefined) {
            return;
        }
        let newX = viewportX(ev.data.global.x);
        let newY = viewportY(ev.data.global.y);
        this.preview
            .clear()
            .lineStyle(2, 0x1f1f1f)
            .moveTo(this.startPoint.x, this.startPoint.y)
            .lineTo(newX, newY);

        let length = euclideanDistance(this.startPoint.x, newX, this.startPoint.y, newY);
        if (isWall) {
            length-=20;
        }
        this.sizeLabel.update(length);
        this.sizeLabel.position.x = Math.abs(newX + this.startPoint.x) / 2
        this.sizeLabel.position.y = Math.abs(newY + this.startPoint.y) / 2
        this.sizeLabel.visible = true;

    }
    public getReference() {
        return this.preview;
    }
}

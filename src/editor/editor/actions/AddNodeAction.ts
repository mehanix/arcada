import { Point } from "pixi.js";
import { FloorPlan } from "../objects/FloorPlan";
import { Wall } from "../objects/Walls/Wall";
import { WallNode } from "../objects/Walls/WallNode";
import { Action } from "./Action";
import { AddWallManager } from "./AddWallManager";

// Add node to FloorPlan. if clicked on screen, just add it. otherwise, add it to the wall.
export class AddNodeAction implements Action {
    private wall:Wall;
    private coords:Point;
    private receiver:FloorPlan;   

    constructor(wall?:Wall, coords?:Point) {
        if (wall) {
            this.wall = wall;
        }
        if (coords) {
            this.coords = coords;
        }
        this.receiver = FloorPlan.Instance;
    }

    public execute() {
        let node:WallNode;
        if (this.wall) {
            node = this.receiver.addNodeToWall(this.wall, this.coords);
        } else {
            node = this.receiver.addNode(this.coords.x, this.coords.y)
        }
        AddWallManager.Instance.step(node);
        this.receiver.actions.push(this);
    }
}
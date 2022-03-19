import { Container } from "pixi.js";
import { Wall } from "./Wall";
import { WallNode } from "./WallNode";

export class WallNodeSequence extends Container {
    private wallNodes: WallNode[];
    private walls: Wall[];
    constructor() {
        super();
        this.sortableChildren = true; 
        this.wallNodes = [];
        this.walls = [];
        this.wallNodes.push(new WallNode(50, 50))
        this.wallNodes.push(new WallNode(750, 50))
        this.wallNodes.push(new WallNode(750, 750))
        this.wallNodes.push(new WallNode(50, 750))


        this.drawWalls();
        // this.addChild(this.walls);
        for (let node of this.wallNodes) {
            this.addChild(node)
        }

        this.on("mousedown", this.mousedown)

        // this.walls.on("mousemove", this.drawWalls);
    }
    private mousedown() {
        console.log("sunt doar un vagabond")
    }

    public drawWalls() {
        console.log("redraw")

        this.walls.forEach(wall => {
            wall.destroy(true);
        })
        this.walls.length = 0;
        for (let left=0; left<this.wallNodes.length - 1; left++) {
            let right = left + 1;
            console.log(right,left)

            let leftNode = this.wallNodes[left]
            let rightNode = this.wallNodes[right]
            this.walls.push(new Wall(leftNode.x, leftNode.y, rightNode.x, rightNode.y, left, right))
        }
        for (let wall of this.walls) {
            this.addChild(wall)
        }
        // this.walls.clear();
        // console.log()
        // console.log(this.getWallNodesPos())
        // this.walls.beginFill(0xb5aba1).lineStyle(14,0x1a1a1a).moveTo(this.wallNodes[0].x, this.wallNodes[0].y)
        // for (let point of this.wallNodes) {
        //     this.walls.lineTo(point.x, point.y)
        // }
        // this.walls.hitArea = this.walls.getBounds();
        // this.walls.endFill();
    }
    // private getWallNodesPos() {
    //     let ans: number[] = [];

    //     for (let node of this.wallNodes) {
    //         let globals = node.getGlobalPosition();
    //         ans.push(globals.x);
    //         ans.push(globals.y)
    //     }
    //     return ans;

    // }
}
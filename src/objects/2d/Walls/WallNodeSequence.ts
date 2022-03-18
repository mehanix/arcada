import { Container, Graphics, } from "pixi.js";
import { WallNode } from "./WallNode";

export class WallNodeSequence extends Container {
    private wallNodes: WallNode[];
    private walls:Graphics;
    constructor() {
        super();
        this.wallNodes = [];
        this.wallNodes.push(new WallNode(50,50))
        this.wallNodes.push(new WallNode(750,50))
        this.wallNodes.push(new WallNode(750,750))
        this.wallNodes.push(new WallNode(50,750))
        this.walls = new Graphics();
        this.walls.interactive = true;

        this.drawWalls();
        this.addChild(this.walls);
        for (let node of this.wallNodes) {
            this.addChild(node)
        }
        this.walls.on("mousedown", this.mousedown)

        this.walls.on("mousemove", this.drawWalls);
    }
    private mousedown() {
        console.log("sunt doar un vagabond")
    }

    public drawWalls() {
        console.log("sal")
      
        this.walls.clear();
        console.log()
        console.log(this.getWallNodesPos())
        this.walls.beginFill(0xb5aba1).lineStyle(14,0x1a1a1a).drawPolygon(this.getWallNodesPos()).endFill();
        // for (let left=0; left<this.wallNodes.length - 1; left++) {
        //     let right = left + 1

        // }
    }
    private getWallNodesPos() {
        let ans:number[] = [];
        
        for (let node of this.wallNodes) {
            let globals = node.getGlobalPosition();
            ans.push(globals.x);
            ans.push(globals.y)
        }
        return ans;

    }
}
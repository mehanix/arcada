import { Container } from "pixi.js";
import { Wall } from "./Wall";
import { WallNode } from "./WallNode";

export class WallNodeSequence extends Container {
    private wallNodes: Record<string, WallNode>;
    private wallNodeLinks: Record<string, number[]>
    private walls: Wall[];
    private static wallNodeId: number = 0;
    constructor() {
        super();
        this.sortableChildren = true;
        this.walls = [];
        this.wallNodes = {};
        this.wallNodeLinks = {};

        this.addNode(50, 50);
        this.addNode(750, 50);
        this.addNode(750, 750);
        this.addNode(50, 750);
        this.addNode(300, 50);
        this.addNode(300, 200);
        this.addNode(600, 200);
        this.wallNodeLinks[1].push(4);
        this.wallNodeLinks[2].push(5);
        this.wallNodeLinks[2].push(3);
        this.wallNodeLinks[3].push(4);
        this.wallNodeLinks[5].push(6);
        this.wallNodeLinks[6].push(7);
        console.log(this.wallNodes);
        console.log(this.wallNodeLinks)
        this.drawWalls();

        this.on("mousedown", this.mousedown)

        // this.on("mousemove", this.drawWalls);
    }
    private mousedown() {
        console.log("sunt doar un vagabond")
    }

    public contains(id: number) {
        return id in this.wallNodes;
    }

    public remove(id: number) {
        // remove node
        this.wallNodes[id].destroy(true);
        this.wallNodes[id] = null;

        // remove links containing node TODO if implementing undo. remember these
        this.wallNodeLinks[id].length = 0;


        //TODO only remove if connected to 2 points.
        for (const src in this.wallNodeLinks) {
            for (const dest of this.wallNodeLinks[src]) {
                if (dest == id) {
                    console.log("tre sa plece", src, dest)
                }
            }
        }
    }

    public addNode(x: number, y: number) {
        WallNodeSequence.wallNodeId += 1;
        const nodeId = WallNodeSequence.wallNodeId;
        this.wallNodes[nodeId] = new WallNode(x, y, nodeId);
        this.wallNodeLinks[nodeId] = [];
        this.addChild(this.wallNodes[nodeId])
        return nodeId;
    }

    public addWall(leftNode: number, rightNode: number) {
        this.wallNodeLinks[leftNode].push(rightNode);
        this.drawWalls();
    }
    
    public removeWall(leftNode:number, rightNode:number) {
         const index = this.wallNodeLinks[leftNode].indexOf(rightNode);
        console.log("links for left:",leftNode, "right:", rightNode, "found index:",index)
        console.log("links 2 left:",this.wallNodeLinks[leftNode]);
        console.log("links 2 right:",this.wallNodeLinks[rightNode]);

        if (index != -1) {
            this.wallNodeLinks[leftNode].splice(index, 1);
            this.drawWalls();
        }
        console.log("tratate 2 left:",this.wallNodeLinks[leftNode]);
        console.log("tratate 2 right:",this.wallNodeLinks[rightNode]);

    }
    public drawWalls() {
        console.log("redraw")

        this.walls.forEach(wall => {
            wall.destroy(true);
        })
        this.walls.length = 0;
        console.log(this.wallNodes)
        for (const src in this.wallNodeLinks) {
            for (const dest of this.wallNodeLinks[src]) {
                console.log(src, dest)
                const leftNode = this.wallNodes[parseInt(src)]
                const rightNode = this.wallNodes[dest]
                this.walls.push(new Wall(leftNode.x, leftNode.y, rightNode.x, rightNode.y, parseInt(src), dest))
            }
        }
        for (let wall of this.walls) {
            this.addChild(wall)
        }
        // for (let left=0; left<this.wallNodes.length - 1; left++) {
        //     let right = left + 1;
        //     console.log(right,left)

        //     let leftNode = this.wallNodes[left]
        //     let rightNode = this.wallNodes[right]
        //     this.walls.push(new Wall(leftNode.x, leftNode.y, rightNode.x, rightNode.y, left, right))
        // }
        // for (let wall of this.walls) {
        //     this.addChild(wall)
        // }
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
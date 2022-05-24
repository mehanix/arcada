import { Container } from "pixi.js";
import { INodeSerializable } from "../../persistence/INodeSerializable";
import { Wall } from "./Wall";
import { WallNode } from "./WallNode";

export class WallNodeSequence extends Container {
    private wallNodes: Map<number, WallNode>;
    private wallNodeLinks: Map<number, number[]>
    private walls: Wall[];
    private static wallNodeId: number = 0;
    constructor() {
        super();
        this.sortableChildren = true;
        this.walls = [];
        this.wallNodes = new Map<number, WallNode>();
        this.wallNodeLinks = new Map<number, number[]>();

        // this.addNode(50, 50);
        // this.addNode(750, 50);
        // this.addNode(750, 750);
        // this.addNode(50, 750);

        console.log(this.wallNodes);
        // this.addWall(1, 4);
        // this.addWall(1, 2);
        // this.addWall(2, 3);
        // this.addWall(3, 4);
        // this.wallNodeLinks[1].push(4);
        // this.wallNodeLinks[1].push(2);
        // this.wallNodeLinks[2].push(3);
        // this.wallNodeLinks[3].push(4);
        // this.wallNodeLinks[5].push(6);
        // this.wallNodeLinks[6].push(7);

        this.drawWalls();

        this.on("mousemove", this.drawWalls);
    }

    public setId(id:number) {
        WallNodeSequence.wallNodeId = id;
    }

    public getExteriorWalls(): Wall[] {
        let exteriorWalls: Wall[] = [];
        for (let wall of this.walls) {
            if (wall.isExteriorWall) {
                exteriorWalls.push(wall)
            }
        }
        return exteriorWalls
    }

    public getWallNodeId() {
        return WallNodeSequence.wallNodeId;
    }
    public contains(id: number) {
        return this.wallNodes.has(id);
    }

    public getWalls() {
        return this.walls;
    }

    public getWallNodes() {
        return this.wallNodes;
    }

    public getWallNodeLinks() {
        return this.wallNodeLinks;
    }

    public load(nodes: INodeSerializable[], nodeLinks: Map<number, number[]>) {
        // this.wallNodeLinks = nodeLinks; //deep copy?
        for (let node of nodes) {
            this.addNode(node.x, node.y, node.id);
        }
        for (let [src, dests] of nodeLinks) {
            for (const dest of dests) {
                console.log("zid intre ",src,dest)
                this.addWall(src,dest)
                // this.wallNodeLinks.get(src).push(dest);
            }
        }
        console.log(this.wallNodeLinks);
    }   

    // drop everything
    public reset() {
        for (let key of this.wallNodes.keys()) {
                this.wallNodes.get(key).destroy(true);
        }
        this.wallNodes.clear();

        for (let wall of this.walls) {
            wall.destroy(true)
        }
        this.walls = []

        this.wallNodeLinks.clear();
        WallNodeSequence.wallNodeId = 0;


    }
    public remove(id: number) {
        //TODO only remove if connected to 2 points.
        let isolated = true;
        if (this.wallNodeLinks.get(id).length > 0) {
            isolated = false;
        } else {
            for (let src of this.wallNodeLinks.keys()) {
                for (const dest of this.wallNodeLinks.get(src)) {
                    if (dest == id) {
                        isolated = false;
                    }
                }
            }
        }

        if (isolated) {
            // remove node
            this.wallNodes.get(id)!.destroy(true);
            this.wallNodes.delete(id)

            // remove links containing node TODO if implementing undo. remember these
            // this.wallNodeLinks[id].length = 0;

        } else {
            console.log("cannot remove node with walls attached");
        }


    }


    public getNewNodeId() {
        WallNodeSequence.wallNodeId += 1;
        return WallNodeSequence.wallNodeId;
    }

    public addNode(x: number, y: number, id?: number) {
        let nodeId;
        if (id) {
            nodeId = id;
        } else {
            nodeId = this.getNewNodeId();
        }
        this.wallNodes.set(nodeId, new WallNode(x, y, nodeId));
        this.wallNodeLinks.set(nodeId,[]);
        this.addChild(this.wallNodes.get(nodeId))
        return this.wallNodes.get(nodeId);
    }

    public addWall(leftNodeId: number, rightNodeId: number) {
        // 
        if (leftNodeId == rightNodeId) {
            return;
        }
        if (leftNodeId > rightNodeId) {
            let aux = leftNodeId;
            leftNodeId = rightNodeId;
            rightNodeId = aux;
        }

        if (this.wallNodeLinks.has(leftNodeId) && this.wallNodeLinks.get(leftNodeId)?.includes(rightNodeId)) {
            return;
        }
        this.wallNodeLinks.get(leftNodeId).push(rightNodeId);
        const leftNode = this.wallNodes.get(leftNodeId)
        const rightNode = this.wallNodes.get(rightNodeId)
        let wall = new Wall(leftNode, rightNode)
        this.walls.push(wall)
        this.addChild(wall)
        this.drawWalls();
        return wall;
    }

    public removeWall(leftNode: number, rightNode: number) {

        const index = this.wallNodeLinks.get(leftNode).indexOf(rightNode);
        
        if (index != -1) {
            this.wallNodeLinks.get(leftNode).splice(index, 1);
            this.drawWalls();
        }
        let toBeRemoved = -1;
        for (let i = 0; i < this.walls.length; i++) {
            let wall = this.walls[i];
            if (wall.leftNode.getId() == leftNode && wall.rightNode.getId() == rightNode) {
                toBeRemoved = i;
                break;
            }
        }
        if (toBeRemoved != -1) {
            this.removeChild(this.walls[toBeRemoved]);
            this.walls.splice(toBeRemoved, 1);

        }
        console.log("tratate 2 left:", this.wallNodeLinks.get(leftNode));
        console.log("tratate 2 right:", this.wallNodeLinks.get(rightNode));

    }

    public getWall(leftNodeId:number, rightNodeId:number) {
        
        if (!this.wallNodeLinks.get(leftNodeId) || !this.wallNodeLinks.get(leftNodeId).includes(rightNodeId)) {
            return null;
        }

        for (let wall of this.walls) {
            if (wall.leftNode.getId() === leftNodeId && wall.rightNode.getId() === rightNodeId) {
                return wall;
            }
        }

        return null;
    }
    public drawWalls() {
        console.log("redraw")
        console.log(this.walls)
        this.walls.forEach(wall => {
            wall.drawLine();
        })
        // this.walls.length = 0;
        // console.log(this.wallNodes)
        // for (const src in this.wallNodeLinks) {
        //     for (const dest of this.wallNodeLinks[src]) {
        //         console.log(src, dest)
        //         const leftNode = this.wallNodes[parseInt(src)]
        //         const rightNode = this.wallNodes[dest]
        //         this.walls.push(new Wall(leftNode.x, leftNode.y, rightNode.x, rightNode.y, this.wallNodes[parseInt(src)], this.wallNodes[dest]))
        //     }
        // }
        // for (let wall of this.walls) {
        //     this.addChild(wall)
        // }



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
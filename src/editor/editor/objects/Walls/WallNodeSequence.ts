import { showNotification } from "@mantine/notifications";
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
        this.drawWalls();

        this.on("mousemove", this.drawWalls);
    }

    public setId(id:number) {
        WallNodeSequence.wallNodeId = id;
    }

    public getExteriorWalls(): Wall[] {
        return this.walls.filter(wall => wall.isExteriorWall)
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
        for (let node of nodes) {
            this.addNode(node.x, node.y, node.id);
        }
        for (let [src, dests] of nodeLinks) {
            for (const dest of dests) {
                this.addWall(src,dest)
            }
        }
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
            showNotification({
                title: 'Not permitted',
                color: 'red',
                message: 'Cannot delete node with walls attached. Please remove walls first.',
              })
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
        this.walls.forEach(wall => {
            wall.drawLine();
        })
    }
}
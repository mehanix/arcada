import { Container, Point } from "pixi.js";
import { FurnitureData } from "../../../stores/FurnitureStore";
import { FloorSerializable } from "../persistence/FloorSerializable";
import { FloorPlan } from "./FloorPlan";
import { Furniture } from "./Furniture";
import { Wall } from "./Walls/Wall";
import { WallNodeSequence } from "./Walls/WallNodeSequence";

export class Floor extends Container {

    public furnitureArray: Map<number, Furniture>;
    private wallNodeSequence: WallNodeSequence;

    constructor(floorData?: FloorSerializable, previousFloor?: Floor) {
        super();

        this.furnitureArray = new Map<number, Furniture>();
        this.wallNodeSequence = new WallNodeSequence();
        this.addChild(this.wallNodeSequence);
        if (floorData) {
            let nodeLinks = new Map<number, number[]>(floorData.wallNodeLinks)
            console.log("nodeLinks", nodeLinks)
            this.wallNodeSequence.load(floorData.wallNodes, nodeLinks);
            for (let fur of floorData.furnitureArray) {
                let furnitureData: FurnitureData = { //todo. nu e complet aici
                    _id: "",
                    name: "",
                    width: fur.width,
                    height: fur.height,
                    imagePath: fur.texturePath,
                    category: ""
                };
                let attachedTo = this.wallNodeSequence.getWall(fur.attachedToLeft, fur.attachedToRight)

                let object = new Furniture(furnitureData, fur.id, attachedTo)
                this.furnitureArray.set(fur.id, object);

                if (attachedTo != undefined) {
                    attachedTo.addChild(object)
                } else {
                    this.addChild(object)
                }
                object.position.set(fur.x, fur.y)
                object.rotation = fur.rotation;
                // this.loadFurniture(furniture);
            }
            return;
        }

        if (previousFloor) {
            let nodeCloneMap = new Map<number, number>();
            // first iteration, map previous node ids to new node ids as we're simply cloning them
            for (let wall of previousFloor.getExteriorWalls()) {
                [wall.leftNode, wall.rightNode].map((node) => {
                    let oldId = node.getId();
                    if (!nodeCloneMap.has(oldId)) {
                        nodeCloneMap.set(oldId, this.wallNodeSequence.getNewNodeId());
                        this.addNode(node.x, node.y,nodeCloneMap.get(oldId) )
                    }
                })
            }

            // now copy walls with respect to the node mapping
           previousFloor.getExteriorWalls().map(wall => {
               let newLeftId = nodeCloneMap.get(wall.leftNode.getId())
               let newRightId = nodeCloneMap.get(wall.rightNode.getId())

               let newWall = this.wallNodeSequence.addWall(newLeftId, newRightId);
               newWall.setIsExterior(true);
           })
        }
    }


    private getExteriorWalls() {
        return this.wallNodeSequence.getExteriorWalls();
    }

    public reset() {
        for (let id of this.furnitureArray.keys()) {
            this.removeFurniture(id);
        }
        this.wallNodeSequence.reset();
        this.furnitureArray = new Map<number, Furniture>();

    }
    public getWallNodeSequence() {
        return this.wallNodeSequence
    }

    public clearScreen() {
        for (let child of this.children) {
            child.visible = false;
        }
    }

    public addFurniture(obj: FurnitureData, id: number, attachedTo?: Wall, coords?: Point, attachedToLeft?: number, attachedToRight?: number) {

        let object = new Furniture(obj, id, attachedTo, attachedToLeft, attachedToRight)
        this.furnitureArray.set(id, object);

        if (attachedTo !== undefined) {
            attachedTo.addChild(object)
            object.position.set(coords.x, coords.y)
        } else {
            this.addChild(object)
            object.position.set(150, 150)
        }


        return id;
    }

    public serialize(): FloorSerializable {
        let plan = new FloorSerializable();
        let wallNodes = this.wallNodeSequence.getWallNodes();
        for (let node of wallNodes.values()) {
            plan.wallNodes.push(node.serialize());
        }

        // wall node links
        plan.wallNodeLinks = Array.from(this.wallNodeSequence.getWallNodeLinks().entries());
        // furniture
        let serializedFurniture = []
        for (let furniture of this.furnitureArray.values()) {
            serializedFurniture.push(furniture.serialize())

        }
        plan.furnitureArray = serializedFurniture;

        // plan.furnitureId = furnitureId;
        // plan.wallNodeId = wallNodeSequence.getWallNodeId();

        console.log("pre save:", plan)
        return plan;
    }
    public setFurniturePosition(id: number, x: number, y: number, angle?: number) {
        this.furnitureArray.get(id).position.set(x, y);
        if (angle) {
            this.furnitureArray.get(id).angle = angle;
        }
    }

    public removeFurniture(id: number) {

        if (this.furnitureArray.get(id).isAttached) {
            this.furnitureArray.get(id).parent.removeChild(this.furnitureArray.get(id))
        } else {
            this.removeChild(this.furnitureArray.get(id));
        }
        this.furnitureArray.get(id).destroy({
            children: true,
            texture: false,
            baseTexture: false

        });
        this.furnitureArray.delete(id);
    }

    public getObject(id: number) {
        return this.furnitureArray.get(id);
    }


    public redrawWalls() {
        this.wallNodeSequence.drawWalls();
    }


    public removeWallNode(nodeId: number) {

        console.log("remove wall node", nodeId, "from ", this.wallNodeSequence)
        if (this.wallNodeSequence.contains(nodeId)) {
            this.wallNodeSequence.remove(nodeId);
        }

    }

    public removeWall(wall: Wall) {
        let leftNode = wall.leftNode.getId();
        let rightNode = wall.rightNode.getId();

        if (this.wallNodeSequence.contains(leftNode)) {
            this.wallNodeSequence.removeWall(leftNode, rightNode);
        }
    }

    public addNode(x: number, y: number, id?:number) {
        return this.wallNodeSequence.addNode(x, y, id);

    }

    public addNodeToWall(wall: Wall, coords: Point) {
        let leftNode = wall.leftNode.getId();
        let rightNode = wall.rightNode.getId();
        // delete wall between left and right node
        this.removeWall(wall);
        // add node and connect walls to it
        let newNode = this.wallNodeSequence.addNode(coords.x, coords.y);
        let newNodeId = newNode.getId()
        this.wallNodeSequence.addWall(leftNode, newNodeId);
        this.wallNodeSequence.addWall(newNodeId, rightNode);

        return newNode;
    }

}
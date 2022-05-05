import { METER } from "../constants";
import { Furniture } from "../objects/Furniture";
import { WallNode } from "../objects/Walls/WallNode";
import { WallNodeSequence } from "../objects/Walls/WallNodeSequence";
import { FloorPlanSerializable } from "./FloorPlanSerializable";

// import { WallNode } from "../objects/Walls/WallNode";
import { IFurnitureSerializable } from "./IFurnitureSerializable";
import { INodeSerializable } from "./INodeSerializable";

export class Serializer {

    public constructor() {

    }

    public serialize(furnitureArray: Map<number, Furniture>, furnitureId: number, wallNodeSequence: WallNodeSequence) {
        let floorPlan = new FloorPlanSerializable();

        // wall nodes
        let wallNodes = wallNodeSequence.getWallNodes();
        console.log("the nodes:", wallNodes)
        for (let obj of wallNodes.values()) {
            let node = this.serializeNode(obj);
            floorPlan.wallNodes.push(node);
        }

        // wall node links
        floorPlan.wallNodeLinks = Array.from(wallNodeSequence.getWallNodeLinks().entries());
        // furniture
        let serializedFurniture = []
        for (let v of furnitureArray.values()) {
                serializedFurniture.push(this.serializeFurniture(v))
            
        }
        floorPlan.furnitureArray = serializedFurniture;

        floorPlan.furnitureId = furnitureId;
        floorPlan.wallNodeId = wallNodeSequence.getWallNodeId();

        console.log("pre save:", floorPlan)
        let resultString = JSON.stringify(floorPlan)
        return resultString
    }

    private serializeFurniture(obj: Furniture) {
        let res: IFurnitureSerializable;
        res = {
            x: obj.x,
            y: obj.y,
            height: obj.height / METER,
            width: obj.width / METER,
            id: obj.getId(),
            texturePath: obj.resourcePath,
            rotation: obj.rotation,
            attachedToLeft: obj.attachedToLeft,
            attachedToRight: obj.attachedToRight
        }


        return res;
    }

    private serializeNode(obj: WallNode) {
        let res: INodeSerializable;
        res = {
            id: obj.getId(),
            x: obj.x,
            y: obj.y
        }
        return res;
    }
}
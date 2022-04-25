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

    public serialize(furnitureArray: Record<number, Furniture>, furnitureId: number, wallNodeSequence: WallNodeSequence) {
        let floorPlan = new FloorPlanSerializable();

        // wall nodes
        let wallNodes = wallNodeSequence.getWallNodes();

        Object.entries(wallNodes).forEach(obj => {
            let node = this.serializeNode(obj[1]);
            floorPlan.wallNodes.push(node);
        })

        // wall node links
        floorPlan.wallNodeLinks = wallNodeSequence.getWallNodeLinks();
        // furniture
        let serializedFurniture = []
        for (let i = 0; i <= furnitureId; i++) {
            if (furnitureArray[i] != undefined) {
                serializedFurniture.push(this.serializeFurniture(furnitureArray[i]))
            }
        }
        floorPlan.furnitureArray = serializedFurniture;

        let resultString = JSON.stringify(floorPlan)
        return resultString
    }

    private serializeFurniture(obj: Furniture) {
        let res: IFurnitureSerializable;
        res = {
            x: obj.x,
            y: obj.y,
            height: obj.height,
            width: obj.width,
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
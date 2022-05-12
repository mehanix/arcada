import { Floor } from "../objects/Floor";
import { FloorPlanSerializable } from "./FloorPlanSerializable";

export class Serializer {


    public serialize(floors: Floor[], furnitureId:number) {
        let floorPlanSerializable = new FloorPlanSerializable();
        for (let floor of floors) {
            let floorSerializable = floor.serialize();
            floorPlanSerializable.floors.push(floorSerializable)

        }
        floorPlanSerializable.furnitureId = furnitureId;
        floorPlanSerializable.wallNodeId = floors[0].getWallNodeSequence().getWallNodeId();
        let resultString = JSON.stringify(floorPlanSerializable)
        return resultString
    }
}
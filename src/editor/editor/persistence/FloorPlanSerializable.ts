import { FloorSerializable } from "./FloorSerializable"

export class FloorPlanSerializable {
    floors: FloorSerializable[];
    public furnitureId: number;
    public wallNodeId: number;
    
    constructor() {
        this.floors = [];
    }
}
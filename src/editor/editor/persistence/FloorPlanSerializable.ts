import { IFurnitureSerializable } from "./IFurnitureSerializable";
import { INodeSerializable } from "./INodeSerializable";

export class FloorPlanSerializable {
    public furnitureArray: IFurnitureSerializable[];
    public wallNodes: INodeSerializable[];
    public wallNodeLinks: [number, number[]][];
    public furnitureId: number;
    public wallNodeId: number;
    
    public constructor() {
        this.furnitureArray = [];
        this.wallNodes = [];
        this.wallNodeLinks = [];
    
    }

}
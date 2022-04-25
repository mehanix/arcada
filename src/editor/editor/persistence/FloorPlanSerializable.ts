import { IFurnitureSerializable } from "./IFurnitureSerializable";
import { INodeSerializable } from "./INodeSerializable";

export class FloorPlanSerializable {
    public furnitureArray: IFurnitureSerializable[];
    public wallNodes: INodeSerializable[];
    public wallNodeLinks: Record<string, number[]>;

    public constructor() {
        this.furnitureArray = [];
        this.wallNodes = [];
        this.wallNodeLinks = {};
    }

}
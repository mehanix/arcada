import { IFurnitureSerializable } from "./IFurnitureSerializable";
import { INodeSerializable } from "./INodeSerializable";

export class FloorSerializable {
    public furnitureArray: IFurnitureSerializable[];
    public wallNodes: INodeSerializable[];
    public wallNodeLinks: [number, number[]][];
    
    public constructor() {
        this.furnitureArray = [];
        this.wallNodes = [];
        this.wallNodeLinks = [];
    
    }

}
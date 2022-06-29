export interface IFurnitureSerializable {
    id:number,
    texturePath:string,
    width:number,
    height:number,
    rotation:number,
    x:number,
    y:number,
    orientation:number,
    zIndex:number,
    attachedToLeft?:number,
    attachedToRight?:number
}
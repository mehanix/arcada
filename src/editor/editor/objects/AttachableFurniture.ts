import { Furniture } from "./Furniture";

export class AttachableFurniture extends Furniture {
    constructor(resourcePath: string, id: number, widthFactor:number, heightFactor:number) {
        super(resourcePath, id, widthFactor, heightFactor);

        this.on('mousedown', this.onMouseDownAttach)
        this.on('mousemove', this.onMouseMoveAttach)
    }

    private onMouseDownAttach() {

    }

    private onMouseMoveAttach() {
    }

}


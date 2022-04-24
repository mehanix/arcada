import { TransformLayer } from "../objects/TransformControls/TransformLayer";
import { WallNode } from "../objects/Walls/WallNode";
import { AddWallAction } from "./AddWallAction";

// tracks current action data
export class AddWallManager {
    

    private static instance:AddWallManager;

    public previousNode:WallNode;
    private constructor() {
        this.previousNode = undefined;
    }

    public step(node:WallNode) {
        console.log("STEP CU ", node.getId())
        if (this.previousNode === undefined) {
            console.log('a')
            this.previousNode = node;
            return;
        }

        if (this.previousNode.getId() === node.getId()) {
            console.log("suntem la fel")
            this.previousNode = undefined;
            return;
        } else {
            let wallAction = new AddWallAction(this.previousNode, node);
            wallAction.execute();
        }

        this.previousNode = node;
        
    }

    public unset() {
        this.previousNode = undefined;
    }
    public static get Instance()
    {
        return this.instance || (this.instance = new this());
    }

    public resetTools() {
        TransformLayer.Instance.deselect();
        this.unset();
    }
}


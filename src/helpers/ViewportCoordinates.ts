import { main } from "../editor/EditorRoot"

export function viewportX(x:number) {
    return x/main.scale.x  + main.corner.x;
}

export function viewportY(y:number) {
    return y/main.scale.y  + main.corner.y;
}
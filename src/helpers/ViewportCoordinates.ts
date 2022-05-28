import { main } from "../editor/EditorRoot"

export function viewportX(x:number, snap = true) {
    let newX = x/main.scale.x  + main.corner.x;
    if (snap) {
        newX -= newX % 10
    }
    return Math.trunc(newX);
}

export function viewportY(y:number, snap = true) {
    let newY = y/main.scale.y  + main.corner.y;
    if (snap) {
        newY -= newY % 10    
    }
    return Math.trunc(newY);
 
}
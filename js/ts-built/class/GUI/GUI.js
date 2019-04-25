import { UserEvents } from "../Player/UserEvents";
import { UMI } from "../Logic/UMI";
export class UI {
    constructor() {
    }
    static action() {
        if (UserEvents.wheelDown) {
            UMI.setZoom(-5);
            UserEvents.wheelDown = false;
        }
        else if (UserEvents.wheelUp) {
            UMI.setZoom(5);
            UserEvents.wheelUp = false;
        }
    }
}

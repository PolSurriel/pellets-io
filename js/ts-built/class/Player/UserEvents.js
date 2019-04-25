import { UMI } from '../Logic/UMI.js';
import { Chat } from '../GUI/Chat.js';
import { userKeyUp, userKeyDown, mouseLeftDown, mouseLeftUp } from '../EventListeners/Socket.js';
import { shareMousePosition } from '../../match.js';
var UserEvents = (function () {
    function UserEvents() {
    }
    UserEvents.playingKeyDown = function (kCode) {
        if (UserEvents.onChat) {
            if (kCode == 16)
                this.wShift = true;
            else if (kCode == 20)
                this.wBloq = !this.wBloq;
            else if (kCode == 13)
                Chat.send();
            else if (kCode == 27)
                UserEvents.onChat = !UserEvents.onChat;
            else if (kCode == 8)
                Chat.deleteLastChar();
            else {
                if (this.wShift)
                    Chat.add(String.fromCharCode(kCode));
                else if (this.wBloq)
                    Chat.add(String.fromCharCode(kCode));
                else
                    Chat.add(String.fromCharCode(kCode).toLocaleLowerCase());
            }
        }
        else {
            userKeyDown(kCode);
        }
        switch (kCode) {
            case (this.UP):
            case (this.CHAR_UP):
                this.up = true;
                this.nega_up = false;
                this.nega_down = true;
                break;
            case (this.DOWN):
            case (this.CHAR_DOWN):
                this.down = true;
                this.nega_down = false;
                this.nega_up = true;
                break;
            case (this.LEFT):
            case (this.CHAR_LEFT):
                this.left = true;
                this.nega_left = false;
                this.nega_right = true;
                break;
            case (this.RIGHT):
            case (this.CHAR_RIGHT):
                this.right = true;
                this.nega_right = false;
                this.nega_left = true;
                break;
            case (this.SPACE):
                this.hab2 = true;
                break;
            case (this.F):
                this.hab3 = true;
                break;
            case (this.E):
                UserEvents.hab4 = true;
                break;
            case (this.T):
                if (!UserEvents.onChat)
                    UserEvents.onChat = !UserEvents.onChat;
                break;
        }
    };
    UserEvents.playingKeyUp = function (kCode) {
        userKeyUp(kCode);
        if (kCode == 16)
            this.wShift = false;
        switch (true) {
            case (kCode == this.UP || kCode == this.CHAR_UP):
                this.up = false;
                this.nega_down = false;
                break;
            case (kCode == this.DOWN || kCode == this.CHAR_DOWN):
                this.down = false;
                this.nega_up = false;
                break;
            case (kCode == this.LEFT || kCode == this.CHAR_LEFT):
                this.left = false;
                this.nega_right = false;
                break;
            case (kCode == this.RIGHT || kCode == this.CHAR_RIGHT):
                this.right = false;
                this.nega_left = false;
                break;
            case (kCode == 187):
                this.wheelUp = true;
                break;
            case (kCode == 189):
                this.wheelDown = true;
        }
    };
    UserEvents.playingMouseMove = function (e, rect) {
        if (this.clickOn())
            shareMousePosition(e.clientX, e.clientY, this.fixedPoint);
        this.cx = UMI.getUMI(e.clientX - rect.left);
        this.cy = UMI.getUMI(e.clientY - rect.top);
    };
    UserEvents.getCX = function () {
        return this.cx;
    };
    UserEvents.getCY = function () {
        return this.cy;
    };
    UserEvents.clickOn = function () {
        return this.clicked;
    };
    UserEvents.playingMouseDown = function () {
        mouseLeftDown(this.cx, this.cy);
        this.clicked = true;
    };
    UserEvents.playingRigthMouseDown = function () {
        this.hab1 = true;
    };
    UserEvents.playingMouseUp = function () {
        mouseLeftUp();
        this.clicked = false;
    };
    UserEvents.UP = 38;
    UserEvents.DOWN = 40;
    UserEvents.LEFT = 37;
    UserEvents.RIGHT = 39;
    UserEvents.CHAR_UP = 87;
    UserEvents.CHAR_DOWN = 83;
    UserEvents.CHAR_LEFT = 65;
    UserEvents.CHAR_RIGHT = 68;
    UserEvents.E = 69;
    UserEvents.F = 70;
    UserEvents.SPACE = 32;
    UserEvents.T = 84;
    UserEvents.up = false;
    UserEvents.down = false;
    UserEvents.left = false;
    UserEvents.right = false;
    UserEvents.nega_up = false;
    UserEvents.nega_down = false;
    UserEvents.nega_left = false;
    UserEvents.nega_right = false;
    UserEvents.ESC = 27;
    UserEvents.esc = false;
    UserEvents.hab1 = false;
    UserEvents.hab2 = false;
    UserEvents.hab3 = false;
    UserEvents.hab4 = false;
    UserEvents.cx = 0;
    UserEvents.cy = 0;
    UserEvents.fixedPoint = [0, 0];
    UserEvents.clicked = false;
    UserEvents.wheelUp = false;
    UserEvents.wheelDown = false;
    UserEvents.MainPlayer = true;
    UserEvents.onChat = false;
    UserEvents.wShift = false;
    UserEvents.wBloq = false;
    return UserEvents;
}());
export { UserEvents };

import { UserEvents } from '../Player/UserEvents.js';
import { shareMousePosition, sendMouseRightDown } from '../../match.js';
var MatchEventListeners = (function () {
    function MatchEventListeners() {
    }
    MatchEventListeners.start = function (canvas) {
        document.onkeydown = function (e) {
            UserEvents.playingKeyDown(e.keyCode);
        };
        document.onkeyup = function (e) {
            UserEvents.playingKeyUp(e.keyCode);
        };
        canvas.onmousemove = function (e) {
            UserEvents.playingMouseMove(e, canvas.getBoundingClientRect());
        };
        canvas.onmousedown = function (e) {
            if (e.button == 0) {
                shareMousePosition(e.clientX, e.clientY, UserEvents.fixedPoint);
                UserEvents.playingMouseDown();
            }
            else if (e.button == 2) {
                UserEvents.playingRigthMouseDown();
                sendMouseRightDown(e.clientX, e.clientY, UserEvents.fixedPoint);
            }
        };
        canvas.onmouseup = function () {
            UserEvents.playingMouseUp();
        };
        function eventsIterator(objs) {
            objs.forEach(function (obj) {
                obj.colision();
            });
        }
    };
    return MatchEventListeners;
}());
export { MatchEventListeners };

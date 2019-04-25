import { UserEvents } from '../class/Player/UserEvents.js';
var MatchEventListener = /** @class */ (function () {
    function MatchEventListener() {
    }
    MatchEventListener.start = function (canvas) {
        document.onkeydown = function (e) {
            UserEvents.playingKeyDown(e.keyCode);
        };
        document.onkeyup = function (e) {
            UserEvents.playingKeyUp(e.keyCode);
        };
        canvas.onmousemove = function (e) {
            UserEvents.playingMouseMove(e, canvas.getBoundingClientRect());
        };
        canvas.onmousedown = function () {
            UserEvents.playingMouseDown();
        };
        canvas.onmouseup = function () {
            UserEvents.playingMouseUp();
        };
        function eventsIterator(objs) {
            objs.forEach(function (obj) {
                obj.colision();
            });
        }
        function clearCanvas(ctx) {
            ctx.fillRect(0, 0, 300, 150);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
    return MatchEventListener;
}());
export { MatchEventListener };

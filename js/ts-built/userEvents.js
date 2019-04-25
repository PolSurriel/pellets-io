var UserEvents = /** @class */ (function () {
    function UserEvents() {
    }
    UserEvents.playingKeyEvent = function (event) {
        var kCode = event.keyCode;
        switch (kCode) {
            case this.UP | this.CHAR_UP:
                break;
            case this.DOWN | this.CHAR_DOWN:
                break;
            case this.LEFT | this.CHAR_LEFT:
                break;
            case this.RIGHT | this.CHAR_RIGHT:
                break;
        }
    };
    UserEvents.playingMouseEvent = function () {
    };
    /**KEY CODES */
    UserEvents.UP = 38;
    UserEvents.DOWN = 40;
    UserEvents.LEFT = 37;
    UserEvents.RIGHT = 39;
    UserEvents.CHAR_UP = 87;
    UserEvents.CHAR_DOWN = 83;
    UserEvents.CHAR_LEFT = 65;
    UserEvents.CHAR_RIGHT = 68;
    return UserEvents;
}());
export { UserEvents };

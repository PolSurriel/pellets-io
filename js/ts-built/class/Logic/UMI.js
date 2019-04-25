var UMI = (function () {
    function UMI() {
    }
    UMI.setEquivalence = function (px, pxHeight) {
        this.umiEquivalence = ((this.umisOnScreenWidth * 100) / this.zoom) / px;
        this.currentEquivalence = this.umiEquivalence;
        this.umisOnScreenHeight = pxHeight * this.currentEquivalence;
        if (this.screen !== null)
            this.screen.centerObjReference();
    };
    UMI.getUMIsWidth = function () {
        return this.currentEquivalence * innerWidth;
    };
    UMI.getUMIsHeight = function () {
        return this.currentEquivalence * innerHeight;
    };
    UMI.setZoomValue = function (zoom) {
        this.zoom = zoom;
        this.currentEquivalence = (this.umiEquivalence / 100) * this.zoom;
    };
    UMI.setZoom = function (zoom) {
        if (zoom < 0 && this.zoom > 110 || zoom > 0 && this.zoom < 150) {
            this.zoom += zoom;
            this.currentEquivalence = (this.umiEquivalence / 100) * this.zoom;
        }
        if (this.screen !== null)
            this.screen.centerObjReference();
    };
    UMI.setFPS = function (FPS) {
        this.FPS = FPS;
        this.relativeTimeUnitPerSecond = this.speedEquivalence / FPS;
    };
    UMI.getPX = function (umi) {
        return Math.round(umi / (this.currentEquivalence));
    };
    UMI.getUMI = function (px) {
        return px * this.currentEquivalence;
    };
    UMI.getUMIsOutOfRange = function () {
        return this.umisOnScreenWidth * 4;
    };
    UMI.getSpeed = function (speed) {
        return (speed * this.relativeTimeUnitPerSecond);
    };
    UMI.screenX = function (x) {
        return this.getPX(this.screen.getX() + x);
    };
    UMI.screenY = function (y) {
        return this.getPX(this.screen.getY() + y);
    };
    UMI.screenXUMI = function (x) {
        return this.screen.getX() + x;
    };
    UMI.screenYUMI = function (y) {
        return this.screen.getY() + y;
    };
    UMI.setScreen = function (screen) {
        this.screen = screen;
    };
    UMI.refX = function () {
        return this.getPX(this.screen.refX());
    };
    UMI.refY = function () {
        return this.getPX(this.screen.refY());
    };
    UMI.refXUMI = function () {
        return this.screen.refX();
    };
    UMI.refYUMI = function () {
        return this.screen.refY();
    };
    UMI.parallaxBackgroundX = function () {
        return this.screen.reverseRefX();
    };
    UMI.parallaxBackgroundY = function () {
        return this.screen.reverseRefY();
    };
    UMI.screenFollow = function () {
        this.screen.follow();
    };
    UMI.umisOnScreenWidth = 2000;
    UMI.speedEquivalence = 120;
    UMI.RADIANSOF180 = 180 * Math.PI / 180;
    UMI.RADIANSOF90 = 90 * Math.PI / 180;
    UMI.zoom = 100;
    UMI.screen = null;
    return UMI;
}());
export { UMI };

var UMI = /** @class */ (function () {
    function UMI() {
    }
    UMI.setEquivalence = function () {
        this.umiEquivalence = this.umisOnScreenWidth / this.widthScreen;
    };
    UMI.setWidth = function (w) {
        this.widthScreen = w;
        this.setEquivalence();
    };
    UMI.getPX = function (umi) {
        return umi / this.umiEquivalence;
    };
    UMI.getUMI = function (px) {
        return px * this.umiEquivalence;
    };
    /** Same that numer of px on 1umi = 1px */
    UMI.umisOnScreenWidth = 1080;
    return UMI;
}());
export { UMI };

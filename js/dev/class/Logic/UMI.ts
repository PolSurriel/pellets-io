import { Screen } from './Screen.js';

export class UMI {

    /** Same that numer of px on 1umi = 1px */
    private static umisOnScreenWidth:number = 2000;
    private static umiEquivalence:number;
    private static widthScreen:number;
    private static FPS:number;
    private static speedEquivalence:number = 120;
    private static relativeTimeUnitPerSecond:number;

    public static readonly RADIANSOF180 = 180 * Math.PI / 180;
    public static readonly RADIANSOF90 = 90 * Math.PI / 180;
    private static zoom = 100;

    private static currentEquivalence;

    private static screen:Screen = null;

    private static umisOnScreenHeight;


    public static setEquivalence(px:number, pxHeight:number){
        this.umiEquivalence = ((this.umisOnScreenWidth*100)/this.zoom) / px;
        this.currentEquivalence = this.umiEquivalence;

        this.umisOnScreenHeight = pxHeight*this.currentEquivalence;

        if(this.screen !== null) this.screen.centerObjReference();
    }

    public static getUMIsWidth(){
        return this.currentEquivalence * innerWidth;
    }

    public static getUMIsHeight(){
        return this.currentEquivalence * innerHeight;
    }
    
    public static setZoomValue(zoom){
        this.zoom = zoom;
        this.currentEquivalence = (this.umiEquivalence/100)*this.zoom;
    }

    public static setZoom(zoom){
        if(zoom < 0 && this.zoom > 110 || zoom > 0 && this.zoom < 150){
            this.zoom += zoom;
            this.currentEquivalence = (this.umiEquivalence/100)*this.zoom;
            
        }

        if(this.screen !== null) this.screen.centerObjReference();
        
    }

    public static setFPS(FPS:number){
        this.FPS = FPS;
        this.relativeTimeUnitPerSecond = this.speedEquivalence / FPS;
    }

    public static getPX(umi:number):number {
        return Math.round(umi/(this.currentEquivalence));
    }

    public static getUMI(px:number):number {
        return px*this.currentEquivalence;
    }

    public static getUMIsOutOfRange(){
        return this.umisOnScreenWidth * 4;
    }

    public static getSpeed(speed:number){
        return (speed * this.relativeTimeUnitPerSecond) ;
    }

    public static screenX(x){
        return this.getPX(this.screen.getX() + x);
    }

    public static screenY(y){
        return this.getPX(this.screen.getY() + y);
    }

    public static screenXUMI(x){
        return this.screen.getX() + x;
    }

    public static screenYUMI(y){
        return this.screen.getY() + y;
    }

    public static setScreen(screen:Screen){
        this.screen = screen;
    }

    public static refX(){
        return this.getPX(this.screen.refX());
    }

    public static refY(){
        return this.getPX(this.screen.refY());
    }

    public static refXUMI(){
        return this.screen.refX();
    }

    public static refYUMI(){
        return this.screen.refY();
    }

    public static parallaxBackgroundX(){
        return this.screen.reverseRefX();
    }

    public static parallaxBackgroundY(){
        return this.screen.reverseRefY();
    }

    public static screenFollow(){
        this.screen.follow();
    }
}



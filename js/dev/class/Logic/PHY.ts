import { UserEvents } from '../Player/UserEvents.js';
import { UMI } from './UMI.js';

export class PHY {

    public static degreesToRadians(degrees:number){
        return degrees/57.2957795;
    }

    public static radiansToDegrees(radians:number){
        return radians*57.2957795;
    }


    public static littlePathAngles(a1, a2){
        var path = PHY.pathAngles(a1, a2);
        return (path <= 180) ? path : 360 - path;
    }

    /*
        Return tangencial points of Cicle from a rect.

        P is a point of rect. Has x and y
        C is a the point of rect who has a r (radio) and it's the center of a cirlce
        CP is the distance between P and C.

    */
    public static getTangencialPointsOfCircleByRect(xP:number, yP:number, xC:number, yC:number, radio:number):Array<Array<number>>{
        var mCP = (yP - yC) / (xP - xC);
        var CP = PHY.getDistanceBetween(xP, yP, xC, yC);
        var xM = xC + (xP - xC)*(Math.pow((radio/CP),2));
        var yM = yC + (yP - yC)*(Math.pow((radio/CP),2));
        var xT1 = xM + mCP * radio * Math.sqrt( (1-(Math.pow((radio/CP),2))) / (1+ (mCP*mCP)) );
        var yT1 = yM - ( (xT1 - xM) / mCP);
        var xT2 = xM - mCP * radio * Math.sqrt( (1-(Math.pow((radio/CP),2))) / (1+ (mCP*mCP)) );
        var yT2 = yM - ( (xT2 - xM) / mCP);

        return [[xT1, yT1], [xT2, yT2]];
    }

    /**
     * Returns the vector directo from a rect.
     * 
     * 
     * Rect = pointA[x1, y1], pointB[x2, y2]
     */
    public static getVDirector(x1:number, y1:number, x2:number, y2:number):Array<number>{
        return [x1-x2, y1-y2];        
    }
    
    /**
     * Find a point of rect with his x coordinates and his coordinates.
     */
    public static getNextXPointOfRect(v1:number, v2:number, y1:number, x1:number, y2:number):number{
        return ( (-v1*y1) + (v1*y2) + (v2*x1) ) /v2;
    }

    /**
     * 
     * Rotate a point around other (Origin)
     * 
     */
    public static rotatePoint(pos_Ox:number, pos_Oy:number, x:number, y:number, angleRadians:number):Array<number>{
        
        var a = Math.abs(pos_Oy - y);
        var b = Math.abs(pos_Ox - x);

        var r = Math.sqrt((b*b) + (a*a));
        
        var new_x = pos_Ox + Math.cos(angleRadians) * r;
        var new_y = pos_Oy - Math.sin(angleRadians) * r;
        
        return [new_x, new_y];
    }


    /**
     * return if a point is inside a polygon in a boolean expression.
     */
    public static insidepPoly(point, poly):boolean {
        var x = point[0], y = point[1];
    
        var inside = false;
        for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            var xi = poly[i][0], yi = poly[i][1];
            var xj = poly[j][0], yj = poly[j][1];
    
            var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
    
        return inside;
    };

   
    /**
     * return the distance between two points
     */
    public static getDistanceBetween(x1, y1, x2, y2){
        var lado1 = Math.abs(y1 - y2);
        var lado2 = Math.abs(x1 - x2);

        return Math.sqrt((lado1 * lado1) + (lado2 * lado2));
    }

    /**
     * increment the length of a coordinate of rect.
     */
    public static nextPointByK(distance:number, cord:number, vdCord:number){
        return distance*vdCord+cord; 
    }

    /**
     * return tanglencial points of a polygon from rect.
     */
    public static getTangencialPointsOfPolygonByRect(points, AB){
        var i,d;
        var pjP = AB[0];
        
        var angles = new Array();
        points.forEach(point => {
            angles.push((-Math.atan2(pjP[1] - point[1], pjP[0] - point[0])+UMI.RADIANSOF180)*57.2957795);
        });
        
        var maxDif = 0;
        for (var inc1 = 0; inc1 < angles.length; inc1++) {
            for (var inc2 = 0; inc2 < angles.length; inc2++) {
                var dif = PHY.pathAngles(angles[inc1], angles[inc2]);
                if(dif > 180) dif = 360 - dif;

                if(dif > maxDif){
                    maxDif = dif;
                    i = points[inc1];
                    d = points[inc2];
                }
            }
        }
        
        var ia = PHY.plusAngles( -Math.atan2(AB[0][1] - i[1], AB[0][0] - i[0])*57.2957795, 180)/57.2957795;
        var id = PHY.plusAngles( -Math.atan2(AB[0][1] - d[1], AB[0][0] - d[0])*57.2957795, 180)/57.2957795;
        return [i, d, ia, id];


    }

    /**
     * return the difference of two angles in degrees
     */
    public static angleDifference(angle1:number, angle2:number):number{
        return Math.abs((angle1 + 180 - angle2) % 360 - 180);
    }

    /**
     * Plus two angles in degrees.
     */
    public static plusAngles(angle1:number, angle2:number):number{
        var sum = angle1+angle2;
        return (sum < 360) ? sum : sum % 360;
    }

    /**
     * return the path/difference from a angle to other 
     */
    public static pathAngles(a1, a2){
        return (PHY.plusAngles(a1, PHY.angleDifference(a1,a2)) <= 180) ? PHY.angleDifference(a1,a2) : PHY.angleDifference(a1,a2);
    }

    /**
     * Return tha angle from a rect
     */
    public static angleFromRect(p1, p2){
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 360 / Math.PI;
    }

    /**
      
     */
    public static nextPoitOfRectUMI(a:Array<number>, b:Array<number>, inc:number){
        var newB = [b[0]+inc, a[1]];
        var ABa = PHY.angleFromRect({"x":a[0],"y":a[1]}, {"x":b[0],"y":b[1]});

        newB = PHY.rotatePoint(a[0], a[1], b[0], b[1], ABa/57.2957795);

        return newB;
    }

    public static createRectWithAngle(point, length, angle):Array<number>{ //angle in radiants
        var b = [point[0]+length, point[1]];
        return PHY.rotatePoint(point[0], point[1], b[0], b[1], angle);
    }


    
}


import { UMI } from './UMI.js';
var PHY = (function () {
    function PHY() {
    }
    PHY.degreesToRadians = function (degrees) {
        return degrees / 57.2957795;
    };
    PHY.radiansToDegrees = function (radians) {
        return radians * 57.2957795;
    };
    PHY.littlePathAngles = function (a1, a2) {
        var path = PHY.pathAngles(a1, a2);
        return (path <= 180) ? path : 360 - path;
    };
    PHY.getTangencialPointsOfCircleByRect = function (xP, yP, xC, yC, radio) {
        var mCP = (yP - yC) / (xP - xC);
        var CP = PHY.getDistanceBetween(xP, yP, xC, yC);
        var xM = xC + (xP - xC) * (Math.pow((radio / CP), 2));
        var yM = yC + (yP - yC) * (Math.pow((radio / CP), 2));
        var xT1 = xM + mCP * radio * Math.sqrt((1 - (Math.pow((radio / CP), 2))) / (1 + (mCP * mCP)));
        var yT1 = yM - ((xT1 - xM) / mCP);
        var xT2 = xM - mCP * radio * Math.sqrt((1 - (Math.pow((radio / CP), 2))) / (1 + (mCP * mCP)));
        var yT2 = yM - ((xT2 - xM) / mCP);
        return [[xT1, yT1], [xT2, yT2]];
    };
    PHY.getVDirector = function (x1, y1, x2, y2) {
        return [x1 - x2, y1 - y2];
    };
    PHY.getNextXPointOfRect = function (v1, v2, y1, x1, y2) {
        return ((-v1 * y1) + (v1 * y2) + (v2 * x1)) / v2;
    };
    PHY.rotatePoint = function (pos_Ox, pos_Oy, x, y, angleRadians) {
        var a = Math.abs(pos_Oy - y);
        var b = Math.abs(pos_Ox - x);
        var r = Math.sqrt((b * b) + (a * a));
        var new_x = pos_Ox + Math.cos(angleRadians) * r;
        var new_y = pos_Oy - Math.sin(angleRadians) * r;
        return [new_x, new_y];
    };
    PHY.insidepPoly = function (point, poly) {
        var x = point[0], y = point[1];
        var inside = false;
        for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            var xi = poly[i][0], yi = poly[i][1];
            var xj = poly[j][0], yj = poly[j][1];
            var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect)
                inside = !inside;
        }
        return inside;
    };
    ;
    PHY.getDistanceBetween = function (x1, y1, x2, y2) {
        var lado1 = Math.abs(y1 - y2);
        var lado2 = Math.abs(x1 - x2);
        return Math.sqrt((lado1 * lado1) + (lado2 * lado2));
    };
    PHY.nextPointByK = function (distance, cord, vdCord) {
        return distance * vdCord + cord;
    };
    PHY.getTangencialPointsOfPolygonByRect = function (points, AB) {
        var i, d;
        var pjP = AB[0];
        var angles = new Array();
        points.forEach(function (point) {
            angles.push((-Math.atan2(pjP[1] - point[1], pjP[0] - point[0]) + UMI.RADIANSOF180) * 57.2957795);
        });
        var maxDif = 0;
        for (var inc1 = 0; inc1 < angles.length; inc1++) {
            for (var inc2 = 0; inc2 < angles.length; inc2++) {
                var dif = PHY.pathAngles(angles[inc1], angles[inc2]);
                if (dif > 180)
                    dif = 360 - dif;
                if (dif > maxDif) {
                    maxDif = dif;
                    i = points[inc1];
                    d = points[inc2];
                }
            }
        }
        var ia = PHY.plusAngles(-Math.atan2(AB[0][1] - i[1], AB[0][0] - i[0]) * 57.2957795, 180) / 57.2957795;
        var id = PHY.plusAngles(-Math.atan2(AB[0][1] - d[1], AB[0][0] - d[0]) * 57.2957795, 180) / 57.2957795;
        return [i, d, ia, id];
    };
    PHY.angleDifference = function (angle1, angle2) {
        return Math.abs((angle1 + 180 - angle2) % 360 - 180);
    };
    PHY.plusAngles = function (angle1, angle2) {
        var sum = angle1 + angle2;
        return (sum < 360) ? sum : sum % 360;
    };
    PHY.pathAngles = function (a1, a2) {
        return (PHY.plusAngles(a1, PHY.angleDifference(a1, a2)) <= 180) ? PHY.angleDifference(a1, a2) : PHY.angleDifference(a1, a2);
    };
    PHY.angleFromRect = function (p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 360 / Math.PI;
    };
    PHY.nextPoitOfRectUMI = function (a, b, inc) {
        var newB = [b[0] + inc, a[1]];
        var ABa = PHY.angleFromRect({ "x": a[0], "y": a[1] }, { "x": b[0], "y": b[1] });
        newB = PHY.rotatePoint(a[0], a[1], b[0], b[1], ABa / 57.2957795);
        return newB;
    };
    PHY.createRectWithAngle = function (point, length, angle) {
        var b = [point[0] + length, point[1]];
        return PHY.rotatePoint(point[0], point[1], b[0], b[1], angle);
    };
    return PHY;
}());
export { PHY };

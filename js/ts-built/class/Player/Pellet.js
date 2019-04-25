var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { PHY } from '../Logic/PHY.js';
import { Laser } from './Laser.js';
import { Circle } from '../Element/Circle.js';
import { Rect } from '../Element/Rect.js';
import { Polygon } from '../Element/Polygon.js';
import { UMI } from '../Logic/UMI.js';
import { UI } from '../GUI/UI.js';
import { Sonar } from './Abilities/Sonar.js';
import { Shield } from './Abilities/Shield.js';
import { Teleport } from './Abilities/Teleport.js';
import { Blind } from './Abilities/Blind.js';
import { Player } from './Player.js';
import { Sound } from '../Element/Sound.js';
var Pellet = (function (_super) {
    __extends(Pellet, _super);
    function Pellet(x, y, color, img) {
        var _this = _super.call(this, x, y, 25, color, img) || this;
        _this.sounds = {
            plop: new Sound('../js/sounds/plop.wav'),
            killBonus: new Sound('../js/sounds/killBonus.wav')
        };
        _this.speed = UMI.getSpeed(4.25);
        _this.prev_col_x = 0;
        _this.prev_col_Y = 0;
        _this.laser_color = '#db3097';
        _this.points = [];
        _this.habilityInc = UMI.getSpeed(4);
        _this.habilityCount = 3;
        _this.restablishHabilityCount = 0;
        _this.focus = false;
        _this.hab1 = new Teleport();
        _this.hab2 = new Sonar();
        _this.hab3 = new Blind();
        _this.getBlind = function () { return this.hab3.getBlind(); };
        _this.hab4 = new Shield();
        _this.viewField = null;
        _this.maxDamage = 200;
        _this.damageSpeed = UMI.getSpeed(1);
        _this.alive = true;
        _this.drawShape = function (ctx) {
            if (this.alive) {
                if (this.hab4.doing()) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = "#4286f4";
                    ctx.strokeStyle = "#4286f4";
                    ctx.lineWidth = 6;
                }
                ctx.lineWidth = 10;
                ctx.strokeStyle = this.color;
                ctx.beginPath();
                ctx.stroke();
                ctx.arc(UMI.screenX(this.getX()), UMI.screenY(this.getY()), UMI.getPX(this.radio), 0, this.eAngle);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        };
        _this.currentRadio = 25;
        _this.laser = new Laser(_this.laser_color);
        var point = [_this.getRadio(), 0];
        _this.points.push(point);
        for (var i = 0; i < 360; i += 5) {
            point = PHY.rotatePoint(0, 0, point[0], point[1], i * Math.PI / 180);
            _this.points.push(point);
        }
        return _this;
    }
    Pellet.prototype.teleporting = function () { return this.hab1.doing(); };
    Pellet.prototype.sonarActive = function () {
        return this.hab2.doing();
    };
    Pellet.prototype.setMainPlayer = function (r) {
        this.hab4.setMainPlayer(r);
    };
    Pellet.prototype.getPoints = function () { };
    Pellet.prototype.colision = function (obj) {
        this.laser.colision(obj, this.getX(), this.getY());
        var r;
        if (obj instanceof Rect) {
            r = this.colisionRect(obj);
            if (r)
                this.colisionReact = this.colisionReactRect;
        }
        else if (obj instanceof Circle || obj instanceof Player) {
            r = this.colisionCircle(obj, this.getX(), this.getY());
            if (r)
                this.colisionReact = this.colisionReactCircle;
        }
        else if (obj instanceof Polygon) {
            r = this.colisionRect(obj);
            if (!r)
                r = this.colisionPolygon(obj);
            if (r)
                this.colisionReact = this.colisionReactPolygon;
        }
        if (this.teleporting()) {
            this.colisionReact = this.teleportingColisionReact;
        }
        return r;
    };
    Pellet.prototype.setBlinded = function () {
        this.hab3.setBlinded();
    };
    Pellet.prototype.blinded = function () {
        return this.hab3.getBlinded();
    };
    Pellet.prototype.teleportingColisionReact = function (obj) {
        var dest = [this.getX(), this.getY()];
        var origin = [this.prev_col_x, this.prev_col_Y];
        var a = (-Math.atan2(dest[1] - origin[1], dest[0] - origin[0]) + UMI.RADIANSOF180);
        if (obj instanceof Circle) {
            var np = PHY.createRectWithAngle([obj.getX(), obj.getY()], obj.getRadio() * 1.3, a);
            this.setX(np[0]);
            this.setY(np[1]);
        }
        else if (obj instanceof Rect) {
            this.teleportingColisionReact(new Polygon(obj.getX(), obj.getY(), [[0, 0], [0 + obj.getWidth(), 0], [0 + obj.getWidth(), 0 + obj.getHeight()], [0, 0 + obj.getHeight()]], ""));
        }
        else {
            var dist = 1;
            while (this.colisionPolygon(obj)) {
                var np = PHY.createRectWithAngle(dest, dist, a);
                this.setX(np[0]);
                this.setY(np[1]);
                dist++;
            }
        }
    };
    Pellet.prototype.setFocus = function (focus) {
        this.focus = focus;
    };
    Pellet.prototype.colisionReactRect = function (obj) {
        if (this.prev_col_x + this.getRadio() < obj.getX()) {
            this.setX(obj.getX() - this.getRadio() - 1);
        }
        else if (this.prev_col_x - this.getRadio() > obj.getX() + obj.getWidth()) {
            this.setX(obj.getX() + obj.getWidth() + this.getRadio() + 1);
        }
        else if (this.prev_col_Y + this.getRadio() < obj.getY()) {
            this.setY(obj.getY() - this.getRadio() - 1);
        }
        else {
            this.setY(obj.getY() + obj.getHeight() + this.getRadio() + 1);
        }
    };
    Pellet.prototype.standartColionReact = function () {
        this.setX(this.prev_col_x);
        this.setY(this.prev_col_Y);
    };
    Pellet.prototype.colisionReactCircle = function (obj) {
        var speedy = this.speed / 1.8;
        if (this.controllerData.right) {
            if (this.getY() < obj.getY()) {
                this.setX(this.getX() - speedy);
                while (this.colisionCircle(obj, this.getX(), this.getY()))
                    this.setY(this.getY() - this.speed / 4);
            }
            else {
                this.setX(this.getX() - speedy);
                while (this.colisionCircle(obj, this.getX(), this.getY()))
                    this.setY(this.getY() + this.speed / 4);
            }
        }
        else if (this.controllerData.left) {
            if (this.getY() < obj.getY()) {
                this.setX(this.getX() + speedy);
                while (this.colisionCircle(obj, this.getX(), this.getY()))
                    this.setY(this.getY() - this.speed / 4);
            }
            else {
                this.setX(this.getX() + speedy);
                while (this.colisionCircle(obj, this.getX(), this.getY()))
                    this.setY(this.getY() + this.speed / 4);
            }
        }
        else if (this.controllerData.down) {
            if (this.getX() > obj.getX()) {
                this.setX(this.getX() + speedy);
                while (this.colisionCircle(obj, this.getX(), this.getY()))
                    this.setY(this.getY() - this.speed / 4);
            }
            else {
                this.setX(this.getX() - speedy);
                while (this.colisionCircle(obj, this.getX(), this.getY()))
                    this.setY(this.getY() - this.speed / 4);
            }
        }
        else {
            if (this.getX() > obj.getX()) {
                this.setX(this.getX() + speedy);
                while (this.colisionCircle(obj, this.getX(), this.getY()))
                    this.setY(this.getY() + this.speed / 4);
            }
            else {
                this.setX(this.getX() - speedy);
                while (this.colisionCircle(obj, this.getX(), this.getY()))
                    this.setY(this.getY() + this.speed / 4);
            }
        }
    };
    Pellet.prototype.colisionReactPolygon = function (obj) {
        var speedy = this.speed / 1.8;
        var minusSpeed = this.speed / 1.1;
        if (this.controllerData.right) {
            this.setX(this.getX() - minusSpeed);
            this.setY(this.getY() - speedy);
            if (this.colision(obj)) {
                this.setY(this.getY() + (speedy * 2));
            }
        }
        else if (this.controllerData.left) {
            this.setX(this.getX() + minusSpeed);
            this.setY(this.getY() - speedy);
            if (this.colision(obj)) {
                this.setY(this.getY() + (speedy * 2));
            }
        }
        else if (this.controllerData.down) {
            this.setY(this.getY() - minusSpeed);
            this.setX(this.getX() - speedy);
            if (this.colision(obj)) {
                this.setX(this.getX() + (speedy * 2));
            }
        }
        else {
            this.setY(this.getY() + minusSpeed);
            this.setX(this.getX() - speedy);
            if (this.colision(obj)) {
                this.setX(this.getX() + (speedy * 2));
            }
        }
        if (this.colision(obj)) {
            this.standartColionReact();
        }
    };
    Pellet.prototype.colisionRect = function (obj) {
        var x = this.getX();
        var y = this.getY();
        return (x + this.getRadio() > obj.getX())
            &&
                (x - this.getRadio() < obj.getX() + obj.getWidth())
            &&
                (y + this.getRadio() > obj.getY())
            &&
                (y - this.getRadio() < obj.getY() + obj.getHeight());
    };
    Pellet.prototype.colisionCircle = function (obj, x, y) {
        return PHY.getDistanceBetween(x, y, obj.getX(), obj.getY()) - this.getRadio() < obj.getRadio();
    };
    Pellet.prototype.colisionPolygon = function (obj) {
        var conditions = [];
        var r = false;
        var x = this.getX();
        var y = this.getY();
        for (var i = 0; !r && i < this.points.length; i++) {
            r = PHY.insidepPoly([x + this.points[i][0], y + this.points[i][1]], obj.getPoints());
        }
        return r;
    };
    Pellet.prototype.colisionComplex = function (obj) {
        return true;
    };
    Pellet.prototype.damage = function () {
        var r = false;
        if (this.getRadio() < 30)
            this.setRadio(this.getRadio() + this.damageSpeed * 8);
        else if (this.getRadio() < 40)
            this.setRadio(this.getRadio() + this.damageSpeed * 4);
        else
            this.setRadio(this.getRadio() + this.damageSpeed * 1.25);
        if (this.controllerData.MainPlayer)
            UI.incDamage();
        if (this.getRadio() > 100 && this.alive) {
            this.die();
            r = !this.controllerData.MainPlayer;
        }
        return r;
    };
    Pellet.prototype.inShield = function () {
        return this.hab4.doing();
    };
    Pellet.prototype.die = function () {
        this.alive = false;
        this.sounds.plop.play();
        if (!this.controllerData.MainPlayer)
            this.sounds.killBonus.play();
        this.setX(10000);
        this.setY(10000);
        if (this.controllerData.MainPlayer)
            UI.siwtchDeathScreen();
    };
    Pellet.prototype.getShieldPoints = function () {
        return this.hab4.getShieldPoints();
    };
    Pellet.prototype.action = function (controllerData) {
        if (this.getRadio() > 25) {
            if (this.getRadio() < 50)
                this.setRadio(this.getRadio() - this.damageSpeed / 3.5);
            else
                this.setRadio(this.getRadio() - this.damageSpeed / 1.7);
        }
        UI.decDamage();
        this.controllerData = controllerData;
        this.doAbilities();
        this.move();
        if (!this.teleporting())
            this.laser.action(controllerData);
        if (this.hab1.doing())
            this.hab1.updateStatus(this);
        if (this.hab2.doing())
            this.hab2.updateStatus(this);
        if (this.hab3.doing())
            this.hab3.updateStatus(this);
        if (this.hab4.doing())
            this.hab4.updateStatus(this);
    };
    Pellet.prototype.littleAction = function (controllerData) {
        this.controllerData = controllerData;
        this.laser.action(controllerData);
        if (this.hab1.doing())
            this.hab1.updateStatus(this);
        if (this.hab2.doing())
            this.hab2.updateStatus(this);
        if (this.hab3.doing())
            this.hab3.updateStatus(this);
        if (this.hab4.doing())
            this.hab4.updateStatus(this);
        if (this.habilityCount < 3) {
            if (this.restablishHabilityCount < 1000)
                this.restablishHabilityCount += this.habilityInc;
            else {
                this.habilityCount++;
                this.restablishHabilityCount = 0;
            }
        }
    };
    Pellet.prototype.doAbilities = function () {
        if (this.habilityCount > 0) {
            if (this.controllerData.hab1) {
                if (this.hab1.do())
                    this.habilityCount--;
            }
        }
        if (this.habilityCount > 2) {
            if (this.controllerData.hab2) {
                if (this.hab2.do())
                    this.habilityCount -= 2;
            }
        }
        if (this.habilityCount > 1) {
            if (this.controllerData.hab4) {
                if (this.hab4.do())
                    this.habilityCount -= 2;
            }
            if (this.controllerData.hab3) {
                if (this.hab3.do())
                    this.habilityCount -= 2;
            }
        }
        if (this.habilityCount < 3) {
            if (this.restablishHabilityCount < 1000)
                this.restablishHabilityCount += this.habilityInc;
            else {
                this.habilityCount++;
                this.restablishHabilityCount = 0;
            }
        }
    };
    Pellet.prototype.isAlive = function () {
        return this.alive;
    };
    Pellet.prototype.getFX = function () {
        return this.controllerData;
    };
    Pellet.prototype.reborn = function () {
        this.alive = true;
    };
    Pellet.prototype.move = function () {
        this.prev_col_x = this.getX();
        this.prev_col_Y = this.getY();
        if (this.controllerData.up && !this.controllerData.nega_up)
            if (this.controllerData.left || this.controllerData.right) {
                this.setY(this.getY() - (this.speed / 1.4));
            }
            else {
                this.setY(this.getY() - this.speed);
            }
        if (this.controllerData.down && !this.controllerData.nega_down)
            if (this.controllerData.left || this.controllerData.right) {
                this.setY(this.getY() + (this.speed / 1.4));
            }
            else {
                this.setY(this.getY() + this.speed);
            }
        if (this.controllerData.left && !this.controllerData.nega_left)
            if (this.controllerData.up || this.controllerData.down) {
                this.setX(this.getX() - (this.speed / 1.4));
            }
            else {
                this.setX(this.getX() - this.speed);
            }
        if (this.controllerData.right && !this.controllerData.nega_right)
            if (this.controllerData.up || this.controllerData.down) {
                this.setX(this.getX() + (this.speed / 1.4));
            }
            else {
                this.setX(this.getX() + this.speed);
            }
    };
    Pellet.prototype.drawBlind = function (ctxFG, w, h) {
        if (this.alive)
            this.hab3.drawBlind(ctxFG, w, h);
    };
    Pellet.prototype.drawBlinded = function (ctxFG, w, h) {
        if (this.alive)
            this.hab3.drawBlinded(ctxFG, w, h);
    };
    Pellet.prototype.setViewField = function (vf) {
        this.viewField = vf;
    };
    Pellet.prototype.getPrevX = function () {
        return this.prev_col_x;
    };
    Pellet.prototype.getPrevY = function () {
        return this.prev_col_Y;
    };
    Pellet.prototype.draw = function (ctx) {
        if (this.alive) {
            if (this.hab3.doing())
                this.hab3.draw(ctx, this.getX(), this.getY());
            this.laser.draw(ctx, this.getX(), this.getY());
            this.drawShape(ctx);
            if (this.hab2.doing())
                this.hab2.draw(ctx, this.getX(), this.getY());
            if (this.hab4.doing()) {
                this.hab4.draw(ctx, this.getX(), this.getY());
                if (!this.controllerData.MainPlayer) {
                    ctx.shadowBlur = 0;
                }
            }
        }
    };
    Pellet.prototype.drawAbilities = function (ctx) {
        if (this.alive) {
            if (this.hab3.doing())
                this.hab3.draw(ctx, this.getX(), this.getY());
            if (this.hab2.doing())
                this.hab2.draw(ctx, this.getX(), this.getY());
            if (this.hab4.doing()) {
                this.hab4.draw(ctx, this.getX(), this.getY());
                if (!this.controllerData.MainPlayer) {
                    ctx.shadowBlur = 0;
                }
            }
        }
    };
    Pellet.prototype.getAbilityCount = function () {
        return this.habilityCount;
    };
    Pellet.prototype.getRestablishAbilityCount = function () {
        return this.restablishHabilityCount;
    };
    Pellet.prototype.drawRestField = function (ctx) {
        if (this.hab4.doing()) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#4286f4";
            ctx.strokeStyle = "#4286f4";
            ctx.lineWidth = 6;
        }
        if (this.alive)
            this.viewField.drawRestField(ctx);
    };
    Pellet.prototype.drawBySonar = function (ctx, op) {
        ctx.globalAlpha = op;
        this.drawShape(ctx);
        ctx.globalAlpha = 1;
    };
    return Pellet;
}(Circle));
export { Pellet };

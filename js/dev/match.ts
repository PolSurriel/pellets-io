import { Pellet } from './class/Player/Pellet.js';
import { MatchEventListeners } from './class/EventListeners/MatchEventListeners.js';
import { initSocket, sharePositions, sendMousePosition, mouseRightDown, sendDamageToEnemy, requestRespawn, sendBlind } from './class/EventListeners/Socket.js';
import { UMI } from './class/Logic/UMI.js';
import { Screen } from './class/Logic/Screen.js';
import { Cursor } from './class/GUI/Cursor.js';
import { Rect } from './class/Element/Rect.js';
import { Circle } from './class/Element/Circle.js';
import { Polygon } from './class/Element/Polygon.js';
import { DefaultBackground } from './class/Element/DefaultBackground.js';
import { UI } from './class/GUI/UI.js';
import { Player } from './class/Player/Player.js';
import { UserEvents } from './class/Player/UserEvents.js';
import { IndHability } from './class/GUI/IndHability.js';
import { Path } from './class/Logic/Path.js';
import { Chat } from './class/GUI/Chat.js';
import { PlayerDataController } from './class/Player/PlayerDataController.js';
import { PHY } from './class/Logic/PHY.js';
import { Image } from './class/Element/Image.js';

initSocket();

var FPS = 60;

var data = null;

var enemys = new Array();
var blinded = false;

var elements = [];
var dynamicElements = [];
var staticElements = [];
var colisionableElements = [];
var colisionReactElements = [];
var shadowElements = [];
var actionElements = [];

UMI.setFPS(FPS);
UMI.setEquivalence(1080, 400);

var canvas:any = document.getElementById('canvas');
var BG:any = document.getElementById('BG');
var FG:any = document.getElementById('FG');
var GUI:any = document.getElementById('GUI');
var ctx=canvas.getContext("2d");
var ctxBG = BG.getContext("2d");
var ctxFG = FG.getContext("2d");
var ctxGUI = GUI.getContext("2d");

MatchEventListeners.start(GUI);

var path:Path = null;
var bg = new DefaultBackground(0, 0, UMI.getUMIsOutOfRange() , UMI.getUMIsOutOfRange());
var pj:Player = createElement( new Player(UserEvents, Math.floor((Math.random() * 1000)), 10000, '#f4dc42'), 'dynamic', false, true, false );
var screen = new Screen(pj, true);
UMI.setScreen(screen);

//circles
createElement(new Circle(600, 300, 50, 'red'), 'static', true, false, true);
createElement(new Circle(1200, 500, 100, 'red'), 'static', true, false, true);
createElement(new Circle(-500, 0, 25, 'red'), 'static', true, false, true);
createElement(new Circle(900, -550, 95, 'red'), 'static', true, false, true);
createElement(new Circle(-900, 1000, 35, 'red'), 'static', true, false, true);
createElement(new Circle(-900, 890, 60, 'red'), 'static', true, false, true);
createElement(new Circle(-970, 1085, 60, 'red'), 'static', true, false, true);
createElement(new Circle(-830, 1085, 60, 'red'), 'static', true, false, true);
createElement(new Circle(-1005, 960, 60, 'red'), 'static', true, false, true);
createElement(new Circle(-795, 960, 60, 'red'), 'static', true, false, true);

//polygons
createElement(new Polygon(450, -400, [ [50,50],[55,200],[0,140] ], 'red'), 'static', true, false, true);

createElement(new Polygon(1600, -300, [ [900,400],[300,700],[400,500] ], 'red'), 'static', true, false, true);
createElement(new Polygon(1600, -300, [ [50,300],[900,400],[400,500],[200,400] ], 'red'), 'static', true, false, true);
createElement(new Polygon(1600, -300, [ [50,300], [200,400],[300,1100] ], 'res'), 'static', true, false, true);

createElement(new Polygon(-1000, 300, [ [100,148],[15,200],[50,138] ], 'red'), 'static', true, false, true);
createElement(new Polygon(-1000, 300, [ [20,60],[90,10],[200,50],[100,150],[50,140] ], 'red'), 'static', true, false, true);

createElement(new Polygon(-500, -500, [ [50,90],[90,10],[100,105],[50,140] ], 'red'), 'static', true, false, true);
createElement(new Polygon(-500, -500, [ [100,100],[200,150],[220,200],[50,140] ], 'red'), 'static', true, false, true);

createElement(new Polygon(-1100, -800, [ [60,220],[160,240],[180,140]], 'red'), 'static', true, false, true);
createElement(new Polygon(-1100, -800, [ [100,201],[180,140],[120,80],[60,22] ], 'red'), 'static', true, false, true);

createElement(new Polygon(-300, 250, [ [91,89],[221,200],[50,140] ], 'red'), 'static', true, false, true);
createElement(new Polygon(-300, 250, [ [90,90],[90,0],[220,200] ], 'red'), 'static', true, false, true);


createElement(new Polygon(450, -400, [ [50,50],[50,50],[50,50],[50,50],[55,200],[0,140] ], 'red'), 'static', false, false, false);
createElement(new Polygon(-1000, 300, [ [20,60],[90,10],[200,50],[100,150],[15,200],[50,140] ], 'red'), 'static', false, false, false);
createElement(new Polygon(-500, -500, [ [50,90],[90,10],[100,100],[200,150],[220,200],[50,140] ], 'red'), 'static', false, false, false);
createElement(new Polygon(-300, 250, [ [90,90],[90,0],[90,0],[90,0],[220,200],[50,140] ], 'red'), 'static', false, false, false);
createElement(new Polygon(1600, -300, [ [50,300],[900,400],[300,700],[400,500],[200,400],[300,1100] ], 'red'), 'static', false, false, false);
createElement(new Polygon(-1100, -800, [ [100,200],[60,220],[160,240],[180,140],[120,80],[60,22] ], 'red'), 'static', false, false, false);




//rectangles
createElement(new Rect(100, -400, 75, 400, 'red'), 'static', true, false, true);
createElement(new Rect(-600, 350, 15, 250, 'red'), 'static', true, false, true);
createElement(new Rect(800, -200, 400, 100, 'red'), 'static', true, false, true);
createElement(new Rect(1500, -1000, 400, 50, 'red'), 'static', true, false, true);
createElement(new Rect(1900, -1000, 50, 400, 'red'), 'static', true, false, true);
createElement(new Rect(-1800, -300, 100, 1000, 'red'), 'static', true, false, true);
createElement(new Rect(400, 1000, 1000, 80, 'red'), 'static', true, false, true);
createElement(new Rect(-600, -1000, 570, 30, 'red'), 'static', true, false, true);
createElement(new Rect(-100, -1300, 70, 300, 'red'), 'static', true, false, true);



createElement(new Rect(900, 400, 300, 200, 'red'), 'static', true, false, true);
//createElement(new Circle(900, 100, 100, 'red'), 'static', true, false, true);
createElement(new Polygon(400, 550, [ [10,50],[70,30],[200,5],[150,100],[15,200],[0,140] ], 'red'), 'static', true, false, true);




/*
createElement(new Polygon(0, 0, [ [262,0], [140, 80], [100,200] ], 'rgba(0,0,0,0)'), 'static', false, false, true);
createElement(new Polygon(0, 0, [ [95,170],[50,600], [90,400]  ], 'rgba(0,0,0,0)'), 'static', false, false, true);
createElement(new Polygon(0, 0, [ [50,600], [179,739], [90,400]  ], 'rgba(0,0,0,0)'), 'static', false, false, true);

createElement(new Polygon(0, 0, [ [561,429],[695,293],[600, 300]  ], 'rgba(0,0,0,0)'), 'static', false, false, true);

createElement(new Polygon(0, 0, [ [820, 183], [220, 50]  ], 'rgba(0,0,0,0)'), 'static', false, false, true);

createElement(new Polygon(0, 0, [ [120, 703], [100, 603]   ], 'rgba(0,0,0,0)'), 'static', false, false, true);
createElement(new Polygon(0, 0, [ [54, 629], [54, 503]   ], 'rgba(0,0,0,0)'), 'static', false, false, true);

createElement(new Circle(780, 710, 45, 'red'), 'rgba(0,0,0,0)', true, false, true);
var logo = new Image(0, 0, '../js/img/logo.png', 720, 600);
var title = new Image(150, 800, '../js/img/title.png', 400, 80);
*/

var screenTeleport = false;
bg.draw(ctxBG);
staticElements.forEach(element => { element.draw(ctxFG); });
var ARD = setInterval(function(){
    //ACTION
    UI.action(bg, ctxBG, staticElements, ctxFG,canvas);
    actionElements.forEach(aElement => { aElement.action(); });
    enemys.forEach(enemy => { enemy.ply.action() });
    
    if(pj.teleporting()){
        if(!screenTeleport){
            path = new Path([pj.getX(), pj.getY()], pj, 17); //25
            UMI.setScreen(new Screen(path, true));
            screenTeleport = true;
        }
        path.move()
        
    }else if(screenTeleport && path.travelFinished()){
        UMI.setScreen(screen);
        screenTeleport = false;
        path = null;
    }
    if(path !== null) path.move();
    

    //REACT
    colisionReactElements.forEach(rElement => {
        colisionableElements.forEach(element => {
            if(rElement.colision(element)) rElement.colisionReact(element);
        });
        enemys.forEach(enemy => {
            if(rElement.colision(enemy.ply)) rElement.colisionReact(enemy.ply);
        });
    });

    enemys.forEach(enemy => {
        colisionableElements.forEach(element => {
            if(enemy.ply.colision(element)) enemy.ply.colisionReact(element);
        });
        if(enemy.ply.colision(pj)) enemy.ply.colisionReact(pj);
    });
    

    

    pj.cleanShadows();
    shadowElements.forEach(sElement => { pj.updateShadow(sElement) });
    enemys.forEach(enemy => { pj.updateShadow(enemy.ply) });

    if(pj.getY() < 9000 && (pj.getX() < -2500 || pj.getX() > 3000 || pj.getY() > 1800 || pj.getY() < -1800 && pj.getY() < 9000)) pj.damage();
    

}, 1000/FPS);

//DRAW
setInterval(function() {
    bg.draw(ctxBG);

    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    
    dynamicElements.forEach(element => { element.draw(ctx); });
    enemys.forEach(enemy => { if( pj.iSee(enemy.ply)) enemy.ply.draw(ctx);});
    staticElements.forEach(element => { element.draw(ctx); });

    //logo.draw(ctx);
    //title.draw(ctx);
    

    pj.drawRestField(ctx);
    pj.drawAbilities(ctx);
    pj.drawShape(ctx);
    enemys.forEach(enemy => { 
                              if(pj.sonarActive()) enemy.ply.drawBySonar(ctx, pj.getSonarOpacity())
                              if(enemy.ply.sonarActive()) enemy.ply.drawBySonar(ctx, enemy.ply.getSonarOpacity())
                            });
    
    
    



    ctxGUI.clearRect(0,0,GUI.width,GUI.height);
    Cursor.draw(ctxGUI);
    UI.drawGard(ctxGUI, GUI.width, GUI.height);
    IndHability.draw(ctxGUI);
    
    ctxFG.clearRect(0,0,canvas.width,canvas.height);
    if(pj.getBlind()){
        pj.drawBlind(ctxFG,canvas.width,canvas.height);
        enemys.forEach(enemy => { 
            if(Circle.colision(enemy.ply, pj.getX(), pj.getY(), 180)){
                sendBlind(enemy.id);
            }
        });
    } 
    
    if(blinded){
        pj.setBlinded();
        pj.drawBlinded(ctxFG,canvas.width,canvas.height);
        blinded = pj.blinded();
    }

    Chat.draw(ctxGUI, canvas.width,canvas.height);
    UI.drawBetaInfo(ctxGUI);

}, 1000/FPS);



function createElement(element:any, typeOfDraw:string, colisionable:boolean, colisionReact:boolean, hasShadow:boolean){
    elements.push(element);

    if (typeOfDraw.toLowerCase() == 'dynamic'){
        dynamicElements.push(element);
        actionElements.push(element);
    } else if (typeOfDraw.toLowerCase() == 'static') staticElements.push(element);
    
    if (colisionable) colisionableElements.push(element);
    if(colisionReact) colisionReactElements.push(element);
    if(hasShadow) shadowElements.push(element);

    return element;
}



function resize(n){

    UMI.setEquivalence(0, 0);
    UMI.setZoomValue(100);
    UMI.setZoom(n);

    canvas.height = window.innerWidth;
    BG.height = window.innerWidth;
    FG.height = window.innerWidth;
    GUI.height = window.innerWidth;

    canvas.height = window.innerHeight;
    BG.height = window.innerHeight;
    FG.height = window.innerHeight;
    GUI.height = window.innerHeight;

    UMI.setEquivalence(innerWidth, innerHeight);
    UMI.setZoomValue(130);
    UMI.setZoom(n);
    
    bg.draw(ctxBG);
    staticElements.forEach(element => { element.draw(ctxFG); });
}

window.onresize = function(){
    resize(20);   
}

resize(40);


export function setBlinded(){
    blinded = true;
}

export function addEnemy(id){
    enemys.push( { 
        id:id,
        ply:new Player(new PlayerDataController() , 0, 0, '#f4dc42')
    } );

    enemys[enemys.length-1].ply.setId(id);
}

export function setPositionToEnemy(enemyData){
    enemys.forEach(enemy => {
        if(enemy.id == enemyData.id){
            enemy.ply.setX(enemyData.x);
            enemy.ply.setY(enemyData.y);
        }
        
    });
}

export function deleteEnemy(id){
    for (var i = 0; i < enemys.length; i++) {
        if(enemys[i].id == id) {
            enemys.splice(i, 1);
        }
    }
}

export function enemyKeyUp(id, kCode){
    for (var i = 0; i < enemys.length; i++) {
        if(enemys[i].id == id) {
            enemys[i].ply.getDataController().playingKeyUp(kCode);
        }
    }
}

export function enemyKeyDown(id, kCode){
    for (var i = 0; i < enemys.length; i++) {
        if(enemys[i].id == id) {
            enemys[i].ply.getDataController().playingKeyDown(kCode);
        }
    }
}

export function enemyMouseLeftDown(id, x, y){
    for (var i = 0; i < enemys.length; i++) {
        if(enemys[i].id == id) {
            enemys[i].ply.getDataController().cx = x;
            enemys[i].ply.getDataController().cy = y;
            enemys[i].ply.getDataController().playingMouseDown();
        }
    }
}

export function enemyMouseLeftUp(id){
    for (var i = 0; i < enemys.length; i++) {
        if(enemys[i].id == id) {
            enemys[i].ply.getDataController().playingMouseUp();
        }
    }
}

export function setMousePosition(id, x, y, pjx, pjy, ca, fx){
    for (var i = 0; i < enemys.length; i++) {
        if(enemys[i].id == id) {
            enemys[i].ply.getDataController().setMousePosition(x,y, pjx, pjy, ca, fx);
        }
    }
}

export function shareMousePosition(x, y, fx){
    sendMousePosition(x, y, pj.getX(), pj.getY(), UserEvents.ca, fx);
    
}

export function setMouseRightUp(id, x, y, pjx, pjy, ca, fx, distance){
    for (var i = 0; i < enemys.length; i++) {
        if(enemys[i].id == id) {
            enemys[i].ply.getDataController().setMousePosition(x,y, pjx, pjy, ca, fx);
            enemys[i].ply.getDataController().distance = distance;
            enemys[i].ply.getDataController().playingRigthMouseDown();
        }
    }
}

export function setDamage(){
    pj.damage();
}
export function setDamageTo(id){
    for (var i = 0; i < enemys.length; i++) {
        if(enemys[i].id == id) {
            enemys[i].ply.damage();
        }
    }
}

export function sendDamageTo(id){
    sendDamageToEnemy(id, pj.getX(), pj.getY(), UserEvents.ca);
}

export function sendMouseRightDown(x, y, fx){
    var distance = PHY.getDistanceBetween(UMI.screenXUMI(pj.getX()), UMI.screenYUMI(pj.getY()), x, y)-45
    mouseRightDown(x, y, pj.getX(), pj.getY(), UserEvents.ca, fx, distance);
}

export function respawn(x, y){
    pj.respawn(x, y);
}

export function respawnEnemy(id, x, y){
    for (var i = 0; i < enemys.length; i++) {
        if(enemys[i].id == id) {
            enemys[i].ply.respawn(x, y);
        }
    }
}

export function death(){
    for (let i = 0; i < 1000; i++) {
        pj.damage();
    }
    
}

window.onload = function(){
    requestRespawn();
}

setInterval(function() {
    sharePositions(pj.getX(), pj.getY());
}, 1000);




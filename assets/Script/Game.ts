// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {GameFsm,GameFsmListener} from "./logic/game-fsm";

const {ccclass, property} = cc._decorator;


@ccclass
export default class Game extends cc.Component implements GameFsmListener {


    @property(cc.Node)
    assestMngNode:cc.Node = null

    

    onEnterBetState() {
        throw new Error("Method not implemented.");
    }
    onExitBetState() {
        throw new Error("Method not implemented.");
    }
    onEnterDealState() {
        throw new Error("Method not implemented.");
    }
    onEnterPlayersTurnState() {
        throw new Error("Method not implemented.");
    }
    onExitPlayerTurnState() {
        throw new Error("Method not implemented.");
    }
    onEnterDealersTurnState() {
        throw new Error("Method not implemented.");
    }
    OnEnterEndState() {
        throw new Error("Method not implemented.");
    }

    
    fsm:GameFsm


    // LIFE-CYCLE CALLBACKS:

    onLoad () {


        this.fsm = new GameFsm(this)


    }



    start () {

    }

    // update (dt) {}
}

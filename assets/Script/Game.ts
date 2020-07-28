// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {GameFsm,GameFsmListener} from "./logic/game-fsm";
import Descks from "./data/Decks";
import Player from "./Player"
const {ccclass, property} = cc._decorator;


@ccclass
export default class Game extends cc.Component implements GameFsmListener {


    // 用户的锚点，用于获取坐标，设置Player上去
    @property([cc.Node])
    playerAnchors:cc.Node[] = null


    @property(cc.Node)
    assestMngNode:cc.Node = null

    @property
    numberOfDecks = 1 //有多少副牌


    @property(cc.Prefab)
    playerPrefab:cc.Prefab = null //玩家预制体



    // 进入下注状态
    onEnterBetState() {
        this.decks.reset()

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
    decks:Descks //牌
    player:Player //玩家
    testPlayers = []
    // LIFE-CYCLE CALLBACKS:

    onLoad () {


        this.fsm = new GameFsm(this)
        
        this.decks = new Descks(this.numberOfDecks)
        


    }

    // 创建玩家
    createPlayers() {

        for(let i =0;i<5;i+=1){

            let player = cc.instantiate(this.playerPrefab)
            // 设置位置到锚点的位置
            let playerPos = this.playerAnchors[i].getPosition()



        }

    }


    start () {

    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * game 状态的UI
 */


@ccclass
export default class InGameUI extends cc.Component {

    
    // 结算后显示的，开始下注按钮
    @property(cc.Node) btnStartBet:cc.Node


    // bet 状态
    @property(cc.Node) betStateUI:cc.Node
    // 游戏状态
    @property(cc.Node) gameStateUI:cc.Node

    @property(cc.Node) resultUI:cc.Node
    @property(cc.Label) resultText:cc.Label




    // 进入玩家回合时。显示 停牌，要牌，双倍那个UI
    showGameUI() {

        // this.betStateUI.active =
        this.gameStateUI.active = true;
        this.resultUI.active = false;
        this.btnStartBet.active = false;

    }

    showBetUI() {
        this.gameStateUI.active = false;
        this.resultUI.active = false;
        this.btnStartBet.active = false;
    }

    // 结算
    showEndUI() {
        
        this.gameStateUI.active = false;
        this.resultUI.active = true;
        this.btnStartBet.active = true;
    }



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}

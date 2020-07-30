// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResulStatetUI from "./ResulStatetUI";
import { OutCome } from "../logic/BlackJack";
import BetChipUI from "./BetChipUI";

const {ccclass, property} = cc._decorator;

/**
 * 对应Game，根据状态显示隐藏组件
 */


@ccclass
export default class GameUI extends cc.Component {

    
   


    // bet 状态
    @property(cc.Node) betStateUI:cc.Node
    // 游戏状态
    @property(cc.Node) gameStateUI:cc.Node
    // 结算状态
    @property(ResulStatetUI) resultStateUI:ResulStatetUI

    @property(BetChipUI) betChipUI:BetChipUI



    // 进入玩家回合时。显示 停牌，要牌，双倍那个UI
    showGameUI() {

        // this.betStateUI.active =
        this.gameStateUI.active = true;
        this.resultStateUI.hide()

        this.betStateUI.active = false;
        

    }

    showBetUI() {
        this.betChipUI.resetTossedChips()
        this.gameStateUI.active = false;
        this.resultStateUI.hide()
        this.betStateUI.active = true;
    }

    // 结算，显示结果
    showEndUI(outCome:OutCome) {    
        
        this.gameStateUI.active = false;
        this.resultStateUI.show()
        this.resultStateUI.setResult(outCome)

        this.betStateUI.active = false;

    }



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}

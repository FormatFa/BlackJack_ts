// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { OutCome } from "../logic/BlackJack";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResulStatetUI extends cc.Component {

    @property(cc.Label)
    tipLabel: cc.Label = null;

     // 结算后显示的，开始下注按钮
     @property(cc.Node) btnStartBet:cc.Node

    // 各个player的结果

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    show() {
        this.node.active = true;
        this.btnStartBet.active = true;
        
    }
    hide() {
        this.node.active = false;
        this.btnStartBet.active = false;
    }
    // 显示最后的结果
    setResult(outCome:OutCome) {

        // 展示文字
        switch(outCome) {
            case OutCome.Win:
                this.tipLabel.string = "Win !"
                break;
            case OutCome.Lose:
                this.tipLabel.string = "Lose !"
                break;
            case OutCome.Tie:
                this.tipLabel.string ="Tie !"
                break;
        }

    }
    start () {

    }

    // update (dt) {}
}

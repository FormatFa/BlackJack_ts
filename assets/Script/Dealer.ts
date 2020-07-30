// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Actor from "./data/Actor";
import { BlackJack } from "./logic/BlackJack";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Dealer extends Actor {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }


    //  庄家获取bestpoint时，需要加上暗牌的
    bestPoint():number {
        let cards = this.holeCard?[this.holeCard].concat(this.cards):this.cards
        let min_max = BlackJack.getMinMaxPoint(cards);
        return min_max.max;
    }
    init() {
        super.init()
        
        // 初始化庄家的，设置render里的actor
        this.renderer.initDealer()
    }

    // update (dt) {}
}

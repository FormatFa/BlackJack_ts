// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Actor from "./data/Actor";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends Actor {


    // 下注的钱
    stakeNum = 0
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    //  下注
    addStake(stake:number) {

        this.stakeNum += stake
        this.updateStake()
    }

    // 更新投注的文字
    updateStake() {

        this.renderer.stakeNumLabel.string = "投注:"+this.stakeNum
    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
/* 金币的脚本组件 ，挂着chip预制体上*/
@ccclass
export default class ChipToss extends cc.Component {

    
    
    @property(cc.Animation)
    animation:cc.Animation
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // 播放动画
    play () {
        this.animation.play("chiptoss")
    }
    // update (dt) {}
}

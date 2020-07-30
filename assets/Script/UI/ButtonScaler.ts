// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 按钮变大，变小
 */
@ccclass
export default class ButtonScaler extends cc.Component {

    @property
    transDuration = 1

    @property
    pressedScale = 0.5


    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        let pressDownAction  = cc.scaleTo(this.transDuration,this.pressedScale)
        let pressUpAction = cc.scaleTo(this.transDuration,1)

        this.node.on(cc.Node.EventType.TOUCH_START,()=>{
            this.node.stopAllActions()
            this.node.runAction(pressDownAction)
        })
        let touchDone = ()=>{
            this.node.stopAllActions()
            this.node.runAction(pressUpAction)
        }
        this.node.on(cc.Node.EventType.TOUCH_END,touchDone)
    }

    start () {

    }

    // update (dt) {}
}

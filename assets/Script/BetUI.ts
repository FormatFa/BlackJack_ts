// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChipToss from "./ChipToss";
import { number } from "yargs";
import Game from "./Game";

const {ccclass, property} = cc._decorator;

/**
 * 投的金币 相关的界面处理
 * 
 * 设置金币在投注按钮，调用投注动画,飞到桌子的指定位置
 */
@ccclass
export default class BetUI extends cc.Component {

    // 金币的预制体
    @property(cc.Prefab)
    chipPrefab:cc.Prefab = null

    // 金币按钮。
    @property([cc.Node])
    btnChips:cc.Node[] = []

    // 金币按钮对应的值
    @property([cc.Integer])
    chipValues:number[] = []

    // 金币的位置
    @property(cc.Node)
    chipAnchor:cc.Node = null


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 注册按钮事件
        this._registerButton()
        cc.log("注册Bet ui按钮事件..")

    }
    _registerButton() {
        this.btnChips.forEach((btn,index)=>{

            btn.on(cc.Node.EventType.TOUCH_START,()=>{
                // TODO 调用game 添加stake
                console.log(`btn:${index} touch start..`)
                Game.instance.addStake(this.chipValues[index])
                this.playAddChip()

            })
        })
    }


    // 生成金币，显示投金币到桌子上的效果 ， 在锚点附近
    // TODO 随机位置
    playAddChip() {

        // 不重叠在一起，随机生成下
        let startPos = cc.v2(-50+(Math.random()*100),-50+(Math.random()*100))
        let chip = cc.instantiate(this.chipPrefab)

        this.chipAnchor.addChild(chip)
        // 设置chip初始位置，相对于chipAnchor
        chip.setPosition(startPos)
        
        let chipToss = chip.getComponent(ChipToss)
        chipToss.play()

    }


    // 清空已经添加的
    // TODO 调用game清空
    resetChips() {

        this.chipAnchor.removeAllChildren() //删除所有锚点下的
    }

    start () {

    }

    // update (dt) {}
}

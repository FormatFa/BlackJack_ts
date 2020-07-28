// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import PlayerInfo from "../data/PlayerInfo";
import Actor from "../data/Actor";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ActorRender extends cc.Component {

    // playerinfo节点
    @property(cc.Node)
    playerInfo: cc.Node = null ;

    // 名字标签
    @property(cc.Label)
    playerNameLabel:cc.Label = null
    

    // 对应的Actor
    actor:Actor

    /**
     * 初始化数据，用于渲染player节点
     * @param playerInfo 
     * @param playerPosition 
     * @param stakePos 
     * @param turnDuration 
     */

    init(playerInfo:PlayerInfo,playerPosition:cc.Vec2,stakePos:cc.Vec2,turnDuration:number) {

        this.actor = this.getComponent(Actor)

        // 设置节点的位置
        this.playerInfo.setPosition(playerPosition)

        this.playerNameLabel.string = this.playerInfo.name

    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import PlayerInfo from "../data/PlayerInfo";
import Actor from "../data/Actor";
import { Card } from "../data/Card";
import CardRender from "./CardRender";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ActorRender extends cc.Component {

    @property(cc.Prefab) cardPrefab:cc.Prefab =  null

    // playerinfo节点
    @property(cc.Node)
    playerInfo: cc.Node = null ;

    // 名字标签
    @property(cc.Label)
    playerNameLabel:cc.Label = null
    

    // 下注了多少的文字
    @property(cc.Label) stakeNumLabel:cc.Label = null

    @property(cc.Node) anchorCards:cc.Node = null //卡牌的位置
    @property cardSpace= 60 //卡牌的距离

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
        // this.playerInfo.setPosition(playerPosition)

        this.playerNameLabel.string = this.playerInfo.name

    }
    // 初始化庄家的
    initDealer() {
        this.actor = this.getComponent(Actor)   
    }

    /**
     *  抽卡时调用，更新ui
     * @param card 卡片
     * @param show 
     */
    onDeal(card:Card,show:boolean) {

        // 生成卡片
        let cardNode = cc.instantiate(this.cardPrefab)

        // 设置位置
        cardNode.setPosition( cc.v2(this.actor.cards.length*this.cardSpace) )


        this.anchorCards.addChild(cardNode)

        // 渲染数据进去
        let render = cardNode.getComponent(CardRender)

        render.init(card)
        render.reveal(show)
    }

    // 揭示暗牌后，设置为显示
    onReveal() {
        console.log("揭示暗牌.....")
        // TODO 这里获取到的是第一个?
        let firstCard = cc.find("cardPrefab",this.anchorCards)
        let cardRenderfirst= firstCard.getComponent(CardRender)
        console.log(firstCard)
        cardRenderfirst.reveal(true)



    }


    // TODO 更新a状态

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}

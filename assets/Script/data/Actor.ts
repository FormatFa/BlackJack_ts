// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ActorRender from "../render/ActorRender";
import { Card } from "./Card";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Actor extends cc.Component {

   

    renderer:ActorRender = null //渲染的，



    // 手上的牌,值是id
    cards:Card[] = []

    // 暗牌
    holeCard:Card  = null

    // 添加一张牌到手上
    addCard(card:Card) {

        this.cards.push(card)
        // 通知渲染卡片
        this.renderer.onDeal(card,true)
        // TODO 检查是否bust


    }
    
    // 添加一张hole card
    addHoleCard(card:Card) {
        this.holeCard = card;

        // 渲染数据,不显示牌
        this.renderer.onDeal(card,false);
    }

    // 显示暗牌，将暗牌添加到cards，后更新
    revealHoldCard() {
        if(this.holeCard!=null) {
            this.cards.unshift(this.holeCard)
            // 删掉暗牌
            this.holeCard= null
            this.renderer.onReveal()
        }   
        // 更新
        // this.renderer.onDeal(this.holeCard,true)
        
    }


    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    init() {
        this.renderer = this.getComponent(ActorRender)
        // 初始化庄家的，设置render里的actor
        this.renderer.initDealer()
    }
    start () {

    }

    // update (dt) {}
}

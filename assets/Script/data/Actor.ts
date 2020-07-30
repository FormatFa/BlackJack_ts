// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ActorRender from "../render/ActorRender";
import { Card } from "./Card";
import { Hand, BlackJack } from "../logic/BlackJack";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Actor extends cc.Component {

   
    renderer:ActorRender = null //渲染用户prefab


    // 手上的牌
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

        // 渲染这张卡牌数据,不显示牌
        this.renderer.onDeal(card,false);
    }

    // 显示暗牌，将暗牌添加到cards，后更新
    revealHoldCard() {
        if(this.holeCard!=null) {
            this.cards.unshift(this.holeCard)

            this.holeCard= null
            this.renderer.onReveal()
        }        
    }


    // 获取最大的点数
    bestPoint():number {
        let min_max = BlackJack.getMinMaxPoint(this.cards);
        return min_max.max;
        
    }
    // 获取牌型。
    hand():Hand {

        let count = this.cards.length;
        if(this.holeCard)count++;

        if(count>=5) {
            return Hand.FiveCard;
        }

        if(count==2&&this.bestPoint()==21) {
            return Hand.BlackJack;
        }
        return Hand.Normal
        
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    init() {
        this.renderer = this.getComponent(ActorRender)
    }
    // 清空牌
    resetCard() {
        this.cards = []
        this.renderer.resetCard()
    }
    start () {

    }

    // update (dt) {}
}

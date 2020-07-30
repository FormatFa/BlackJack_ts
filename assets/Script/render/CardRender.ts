// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Card } from "../data/Card";

const {ccclass, property} = cc._decorator;

// card prefab的
@ccclass
export default class CardRender extends cc.Component {

    
    // 点数
    @property(cc.Label) point:cc.Label

    // 花色
    @property(cc.Sprite) suit:cc.Sprite

    // 中间大图
    @property(cc.Sprite) mainPic:cc.Sprite

    // 背景
    @property(cc.Sprite) cardBg:cc.Sprite


    //king 那些的图案
    @property([cc.SpriteFrame]) texFaces:cc.SpriteFrame[] = []

    // 依次是黑桃，红桃，梅花，方块
    // 花色大图
    @property([cc.SpriteFrame]) texSuitBig:cc.SpriteFrame[] = []
    // 花色小图
    @property([cc.SpriteFrame]) texSuitSmall:cc.SpriteFrame[] = []

    @property(cc.SpriteFrame) texFrontBG:cc.SpriteFrame // 前面
    @property(cc.SpriteFrame) texBackBG:cc.SpriteFrame // 后面

    redColor = cc.Color.RED
    blackColor = cc.Color.BLACK

    // 初始化组件元素，设置图案到卡片上
    init(card:Card) {

        //jqk
        let isFaceCard = card.point>10

        // 设置中间大图
        if(isFaceCard) {

            this.mainPic.spriteFrame = this.texFaces[card.point-10-1]
        }
        else
        {
            this.mainPic.spriteFrame = this.texSuitBig[card.suit-1]
        }
        this.point.string = card.pointName();

        if(card.isRedSuit) {
            this.point.node.color = this.redColor;
        }
        else {
            this.point.node.color = this.blackColor;
        }

        // 花色信息
        this.suit.spriteFrame = this.texSuitSmall[card.suit-1]
    }

    start () {

    }

    // update (dt) {}

    /**
     * 
     * @param isFaceUp 面是否朝上
     */
    reveal (isFaceUp:boolean) {
        this.point.node.active = isFaceUp
        this.suit.node.active = isFaceUp
        this.mainPic.node.active = isFaceUp

        this.cardBg.spriteFrame  = isFaceUp?this.texFrontBG:this.texBackBG
    }
}

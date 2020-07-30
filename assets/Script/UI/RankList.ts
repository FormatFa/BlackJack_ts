// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import TestData from "../data/TestData";
import RankItem from "./RankItem";
const {ccclass, property} = cc._decorator;

@ccclass
export default class RankList extends cc.Component {

    @property(cc.Prefab)
    prefabRankItem:cc.Prefab

    @property(cc.ScrollView)
    scrollView:cc.ScrollView
    // LIFE-CYCLE CALLBACKS:

    content:cc.Node = null

    onLoad () {
        this.content = this.scrollView.content
        
        
        let playerinfos = TestData;
        console.log(playerinfos)
        playerinfos.forEach((value,index)=>{

            let itemNode = cc.instantiate(this.prefabRankItem)
            itemNode.setPosition(0,0);
            let item = itemNode.getComponent(RankItem)
            item.init(index + 1,value)

            this.content.addChild(itemNode)

            console.log(value)


        })

    }

    start () {

    }

    // update (dt) {}
}

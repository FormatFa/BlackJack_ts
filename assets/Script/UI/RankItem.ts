// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import PlayerInfo from "../data/PlayerInfo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankItem extends cc.Component {

    
    @property(cc.Label)
    labelRank: cc.Label = null;

    @property(cc.Label)
    labelPlayerName: cc.Label = null;

    @property(cc.Label)
    labelGoldNum: cc.Label = null;

    @property(cc.Sprite)
    spPlayerPhoto: cc.Label = null;

    // 
    init(rank:number,playerInfo:PlayerInfo) {

        
        this.labelRank.string = ""+rank;
        this.labelPlayerName.string = playerInfo.name;
        this.labelGoldNum.string = ""+playerInfo.gold; 
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Card } from "../data/Card";
/**
 *  21 点相关的逻辑
 */
//手中牌的状态
enum ActorPlayingState {
    Normal,//正常
    Stand, //停牌
    Report, //报到
    Bust    //爆了
}

// 输赢结果
enum OutCome {
    Win,
    Lose,
    Tie
}

// 牌型，越大越厉害
enum Hand {
    Normal,
    BlackJack,
    FiveCard
}

class BlackJack {

    // 获取最大和最小的点数
    static getMinMaxPoint(cards:Card[]) {
        let min = 0;
        // 是否有a
        let hasAce = false;
        cards.forEach((card)=>{

            if(card.point==1) hasAce = true;
            min+=Math.min(10,card.point)//jqk那些都是10点
        })
        let max = min;

        // a当成11点
        if(hasAce && min+10<=21) {
            max +=10

        }
        return {
            min:min,
            max:max
        }

    }



}
export {Hand,OutCome,ActorPlayingState,BlackJack}
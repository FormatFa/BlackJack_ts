// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

enum Suit {
    Spade = 1, //黑桃 ♠
    Heart,      //红桃 ♥
    Club,       //梅花 ♣ 
    Diamond     //方块 ♦
}
// 
let  A2_10JQK = 'NAN,A,2,3,4,5,6,7,8,9,10,J,Q,K'.split(',');
/**
 * 牌，表示一张卡牌
 */
class Card {
    constructor(readonly point:number,readonly suit:Suit) {
    }
    /**
     * 可能值为 0 - 51
     */
    id():number{
        return (this.suit-1)*13 + (this.point-1)
    }
    pointName() {
        return A2_10JQK[this.point]
    }
    suitName() {
        return Suit[this.suit]
    }
    isBlackSuit() {
        return this.suit==Suit.Spade || this.suit==Suit.Club
    }
    isRedSuit() {
        return this.suit==Suit.Heart || this.suit==Suit.Diamond
    }
    
    /**
     * 根据id获取card
     * @param id id,0-51
     */

    static fromId(id:number):Card {
        
        return cards[id]
    }
}

const cards:Card[] = []
// 初始化所有扑克牌
for(let s =1;s<=4;s+=1) {
    for(let p =1 ; p<=13;p+=1)
    {
        cards.push(new Card(p,s))
    }
}


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

export {

    cards,Card, Suit,ActorPlayingState,OutCome,Hand
}
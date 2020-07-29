// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {Card} from './Card'
export default class Descks {

    // 还没发出去的牌
    _cardIds = []

    // 牌的总数量
    _cardSize:number

    constructor(readonly numberOfDecks:number) {
        this._cardIds = new Array(numberOfDecks*52)
        this.reset()
        console.log("构造decks:")
        console.log(this._cardIds)
    }

    /**
     * 重置所有牌
     * 
     */
    reset() {

        let index=0
        for(let i = 0;i<this.numberOfDecks;i+=1) {

            for(let cardId = 0;cardId<52;cardId+=1) {
                this._cardIds[index] = Card.fromId(cardId)
                index++;
            }

        }
    }

    /**
     *  抽一张牌
     */
    draw():Card {

        let cardIds = this._cardIds
        
        let len = cardIds.length

        let index = (Math.random()*len)|0

        let result = cardIds[len-1]

        // 
        let last = cardIds[len-1]
        cardIds[index] = last
        cardIds.length = len-1
        
        return result
    }

}
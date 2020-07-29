// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {GameFsm,GameFsmListener} from "./logic/game-fsm";
import Descks from "./data/Decks";
import Player from "./Player"
import InGameUI from "./UI/InGameUI";
import BetUI from "./BetUI";
import ActorRender from "./render/ActorRender";
import PlayerInfo from "./data/PlayerInfo";
import Actor from "./data/Actor";
import Dealer from "./Dealer";
const {ccclass, property} = cc._decorator;


@ccclass
export default class Game extends cc.Component implements GameFsmListener {



    static instance:Game = null

    // 用户的锚点，用于获取坐标，设置Player上去
    @property([cc.Node])
    playerAnchors:cc.Node[] = []


    @property(cc.Node)
    assestMngNode:cc.Node = null

    @property
    numberOfDecks = 1 //有多少副牌


    @property(cc.Prefab)
    playerPrefab:cc.Prefab = null //玩家预制体

    @property(cc.Node) inGameUiNode:cc.Node
    inGameUI:InGameUI = null

    @property(cc.Node) betUiNode:cc.Node
    betUI:BetUI

    @property(cc.Node) dealerNode:cc.Node //商家节点

    

    // 进入下注状态
    onEnterBetState() {
        this.decks.reset()
        this.inGameUI.showBetUI()
    }
    onExitBetState() {
        // 
        
    }
    // 进入发牌，就发牌
    onEnterDealState() {

        // 发牌给player和dealer
        this.player.addCard(this.decks.draw())
        
        // 庄家发一张暗牌
        this.dealer.addHoleCard(this.decks.draw())
        // 再抽
        
        this.player.addCard(this.decks.draw())
        this.dealer.addCard(this.decks.draw())
        
        // -------------发完牌 就
        this.fsm.onDealed()

    }

    // 玩家回合，设置游戏的UI
    onEnterPlayersTurnState() {
        
        // 玩家的turn ，显示game ui。
        this.inGameUI.showGameUI()

    }
    onExitPlayerTurnState() {
        
    }

    onEnterDealersTurnState() {
        
        let card = this.decks.draw()
        // 庄家回合，直接抽。 TODO 定义庄家抽卡逻辑
        this.dealer.addCard(card)

        // 庄家结束，到结束环节了
        this.fsm.onDealerActed()
        
    }

    /**
     * 结束，显示hold card。
     */
    OnEnterEndState() {

        this.checkResult()
        // 庄家显示暗牌
        this.dealer.revealHoldCard()

        // 判断结果显示


        // 切换到结束
        this.inGameUI.showEndUI()

    }

    // TODO 检查结果
    checkResult() {

        // 



    }

    
    fsm:GameFsm = null
    decks:Descks = null //牌
    player:Player = null //玩家
    dealer:Dealer = null//庄家
    testPlayers = [new PlayerInfo("user1",10000,2),new PlayerInfo("user2",10000,2),new PlayerInfo("user3",10000,2),
    new PlayerInfo("user4",10000,2),new PlayerInfo("user5",10000,2)]


    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        Game.instance = this;
       
        
        this.decks = new Descks(this.numberOfDecks)

        
        // 初始化组件
        this.inGameUI = this.inGameUiNode.getComponent(InGameUI)
        this.betUI = this.betUiNode.getComponent(BetUI)



        // 初始化庄家
        this.dealer = this.dealerNode.getComponent(Dealer)
        this.dealer.init()

        
        

        this.createPlayers()


        this.fsm = new GameFsm(this)
        this.fsm.init()
    }

    // 创建玩家 TODO 设置资金显示位置
    createPlayers() {

        
        cc.log("创建players...")
        for(let i =0;i<5;i+=1){

            let playerAnchor = this.playerAnchors[i]

            let player = cc.instantiate(this.playerPrefab)
            player.setPosition(cc.v2(0,0))

            
            let playerPos = this.playerAnchors[i].getPosition()

            playerAnchor.addChild(player)

            
            // 初始化playr，设置名字，头像
            player.getComponent(ActorRender).init(this.testPlayers[i],playerPos,playerPos,2)

            
            // 是自己时，初始化
            if(i==2) {
            
                let comps = player.getComponentsInChildren(cc.Component)
                this.player = player.getComponent(Player)
                this.player.init()
            }

        }

    }

    // 添加stake到player
    addStake(stake:number) {
        this.player.addStake(stake)
    }
    // 重设stake
    resetStake(stake:number) {

    }

    // 准备发牌，切换成gaming
    deal() {
        this.fsm.toDeal()
    }


    // 要牌
    hit() {
        // 抽到一张
        let card = this.decks.draw()

        this.player.addCard(card)

    }

    // 停牌
    stand() {

        // 修改状态

        this.fsm.onPlayerActed()
    }

    // 超级加倍
    double() {

    }

    start () {

    }

    // update (dt) {}
}

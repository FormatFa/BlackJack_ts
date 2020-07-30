// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GameFsm, GameFsmListener } from "./logic/game-fsm";
import Descks from "./data/Decks";
import Player from "./Player"
import InGameUI from "./UI/GameUI";
import ActorRender from "./render/ActorRender";
import PlayerInfo from "./data/PlayerInfo";
import Dealer from "./Dealer";
import { OutCome } from "./logic/BlackJack";
const { ccclass, property } = cc._decorator;


@ccclass
export default class Game extends cc.Component implements GameFsmListener {



    static instance: Game = null

    // 用户的锚点，用于获取坐标，设置Player上去
    @property([cc.Node])
    playerAnchors: cc.Node[] = []


    @property(cc.Node)
    assestMngNode: cc.Node = null

    @property
    numberOfDecks = 1 //有多少副牌


    @property(cc.Prefab)
    playerPrefab: cc.Prefab = null //玩家预制体

    @property(cc.Node) inGameUiNode: cc.Node
    inGameUI: InGameUI = null

    @property(cc.Node) dealerNode: cc.Node //庄家节点

    // 总共有的金币
    totalChip = 0




    // 进入下注状态
    onEnterBetState() {
        
        this.decks.reset()
        this.inGameUI.showBetUI()
    }
    onExitBetState() {

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

        // -------------发完牌就
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
        // 庄家回合，直接抽。 
        // TODO 定义庄家抽卡逻辑
        this.dealer.addCard(card)

        // 庄家结束，到结束环节了
        this.fsm.onDealerActed()
    }

    /**
     * 结束，显示hold card。
     */
    OnEnterEndState() {

        let result = this._playerresult()

        // 庄家显示暗牌
        this.dealer.revealHoldCard()

        // 显示结果那些
        this.inGameUI.showEndUI(result)

        let betStakeNum = this.player.stakeNum;

        //  计算奖励那些
        switch (result) {

            case OutCome.Win:
                // 拿回自己的 
                this.totalChip += betStakeNum;
                this.totalChip += betStakeNum; //赚的
                break;
            case OutCome.Lose:


                break;
            case OutCome.Tie:
                // 拿回自己的
                this.totalChip += betStakeNum;
                break;

        }

    }

    // TODO 检查结果
    _playerresult(): OutCome {
        
        console.log(`get result:player:${this.player.bestPoint()},dealer:${this.dealer.bestPoint()}`)
        // 
        if (this.player.hand() > this.dealer.hand()) {
            return OutCome.Win;
        }
        else if (this.player.hand() < this.dealer.hand()) {
            return OutCome.Lose;
        }
        else {
            // 判断点数
            if (this.player.bestPoint() == this.dealer.bestPoint()) {
                return OutCome.Tie;
            }
            else if (this.player.bestPoint() > this.dealer.bestPoint()) {
                return OutCome.Win;
            }
            else
                return OutCome.Lose;


        }




    }


    fsm: GameFsm = null
    decks: Descks = null //牌
    player: Player = null //玩家
    dealer: Dealer = null//庄家
    testPlayers = [new PlayerInfo("user1", 10000, 2), new PlayerInfo("user2", 10000, 2), new PlayerInfo("user3", 10000, 2),
    new PlayerInfo("user4", 10000, 2), new PlayerInfo("user5", 10000, 2)]



    // LIFE-CYCLE CALLBACKS:
    onLoad() {

        Game.instance = this;


        this.decks = new Descks(this.numberOfDecks)


        // 初始化组件
        this.inGameUI = this.inGameUiNode.getComponent(InGameUI)

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
        for (let i = 0; i < 5; i += 1) {

            let playerAnchor = this.playerAnchors[i]

            let player = cc.instantiate(this.playerPrefab)
            player.setPosition(cc.v2(0, 0))


            let playerPos = this.playerAnchors[i].getPosition()

            playerAnchor.addChild(player)


            // 初始化playr，设置名字，头像
            player.getComponent(ActorRender).init(this.testPlayers[i], playerPos, playerPos, 2)


            // 是自己时，初始化
            if (i == 2) {
                this.player = player.getComponent(Player)
                this.player.init()
                this.totalChip = this.testPlayers[i].gold;
            }

        }

    }

    // 添加stake到player
    addStake(stake: number) {

        this.totalChip -= stake;
        this.player.addStake(stake)
        this.updateTotalStake()
    }
    // 重设stake
    resetStake() {
        this.player.resetStake()
        this.inGameUI.betChipUI.resetTossedChips()
    }

    // 更新总共的显示
    updateTotalStake() {
        this.player.updateTotalStakeDisplay(this.totalChip)
    }
    // 准备发牌，切换成gaming
    deal() {

        this.fsm.toDeal()
    }


    /**
     * bet 结算后，点击重新下注按钮。进行清场操作
     * 1. 清空牌组，手牌
     * 2. 重设投注资金
     * 3. 
     *  */
    reBet() {
        this.decks.reset()
        this.player.resetCard()
        this.player.resetStake() //重设投资

        this.dealer.resetCard()
        this.fsm.toBet()
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

    start() {

    }

    // update (dt) {}
}

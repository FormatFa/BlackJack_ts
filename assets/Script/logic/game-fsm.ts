// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// https://github.com/jakesgordon/javascript-state-machine/blob/master/docs/data-and-methods.md

// https://github.com/steelbreeze/state
const {ccclass, property} = cc._decorator;

import * as state from "@steelbreeze/state";

interface GameFsmListener {
    onEnterBetState()
    onExitBetState()
    onEnterDealState()      // 发牌

    onEnterPlayersTurnState() //玩家回合
    onExitPlayerTurnState()  // 结束玩家回合时

    onEnterDealersTurnState() //庄家回合

    OnEnterEndState()  //进入结算

    // onStateChange() // 测试

    
    
}
enum   GameState {
    
    DEAL
}

class GameFsm {

    instance:state.Instance
    isEvaluating = false

    constructor(public listener:GameFsmListener) {

        
    }
    
    // 初始化状态
    init() {

        // 打印状态切换日志

        state.log.add(msg=>console.log(msg),state.log.Entry|state.log.Exit|state.log.Evaluate)

        let model = new state.State("root")

        let initial = new state.PseudoState("init-root",model)

        let bet = new state.State("下注",model)
        let playing = new state.State("已开局",model)
        
        


        let initPlaying = new state.PseudoState("开局ing",playing,state.PseudoStateKind.Initial)
        let deal = new state.State("发牌",playing)
        let playersTurn = new state.State("玩家决策",playing)
        let dealersTurn = new state.State("庄家决策",playing)

        let settled = new state.State("结算",model)

    

        // 设置转换条件
        initial.to(bet) //进入下注
        // 准备发牌了就到开局
        bet.on(String).when(state=>state=="deal").to(playing)
        // 开局就进入-发牌
        initPlaying.to(deal)
        // 发完牌到 玩家回合
        deal.on(String).when(state=>state=="dealed").to(playersTurn)
        // 玩家决策完到庄家
        playersTurn.on(String).when(state=>state=="player_acted").to(dealersTurn)


        // playing 中接收到end后，进入结算
        playing.on(String).when(state=>state=="end").to(settled)
        // 结算时收到bet，就开始
        settled.on(String).when(state=>state=="bet").to(bet)


         //--- 切换状态时调用回调--
        // 进入下注时，通知更新界面那些
        bet.entry(()=>{
            this.listener.onEnterBetState()
        }).exit(()=>{
            this.listener.onExitBetState()
        })
        // 进入发牌
        deal.entry(()=>{this.listener.onEnterDealState()})

        // 玩家
        playersTurn.entry(()=>this.listener.onEnterPlayersTurnState()).exit(()=>this.listener.onExitPlayerTurnState())

        // 老庄家
        dealersTurn.entry(()=>this.listener.onEnterDealersTurnState())

        settled.entry(()=>this.listener.OnEnterEndState())


        this.instance = new state.Instance("instance",model)
    }

    _evaluate(msg:string) {
        console.log("evaluate:"+msg)
        this.instance.evaluate(msg)

    }
    // 准备发牌
    toDeal() {
        if(this.isEvaluating) {
            setTimeout(()=>{
                this.toDeal()
            },1)
            return;
        }
        this.isEvaluating = true;
        this._evaluate('deal');
        this.isEvaluating = false
    }
    // 下注
    toBet() {
        this._evaluate('bet');
    }
    // 发牌完成，切换状态
    onDealed() {
        this._evaluate('dealed');
    }
    // 玩家玩了
    onPlayerActed() {
        this._evaluate('player_acted');
    }
    // 庄家执行完后，就end了
    onDealerActed() {
        this._evaluate('end');
    }
}
export {GameFsm,GameFsmListener}
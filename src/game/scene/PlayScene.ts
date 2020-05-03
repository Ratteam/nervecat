declare interface PlayListener {
    canRun(): boolean
    playerRun(nextStep: Point): void
    catRun(searchResult: SearchResult): void
    gameOver(type: number): void
}
enum OverType {
    NULL = -1, // 无
    PLAYER = 0, // 玩家赢
    CAT = 1 // 猫赢
}
class PlayScene extends BaseScene implements PlayListener {
    private cat: Cat
    private catRunning: boolean
    private sound: egret.Sound
    protected initView() {
        this.sound = RES.getRes('go_mp3')
        this.catRunning = false
        this.createGriNode()
        this.createBarrier(n.GameData.barrierNumber)
        this.createCat()
        this.x = (GameUtil.getStageWidth() - this.width) / 2
        this.y = GameUtil.getStageHeight() / 2.5
        SceneController.showLevelTip()
    }
    /**
     * 游戏结束
     */
    public gameOver(type: OverType) {
        // 获取结束类型（玩家赢或猫赢）
        n.GameData.overType = type
        // 显示结果
        SceneController.showEndScene()
    }
    public catRun(searchResult: SearchResult) {
        console.log("貓走")
        if (!searchResult.hasPath) {
            this.cat.setStatus(CatStatus.UNAVAILABLE)
        }
        let nextStep = searchResult.nextStep
        if (nextStep.equal(this.cat.getIndex())) {
            this.gameOver(OverType.PLAYER)
            return
        }
        this.cat.move(nextStep)
        if(nextStep.x*nextStep.y===0||nextStep.x===n.GameData.row-1||nextStep.y===n.GameData.col-1){
            this.gameOver(OverType.CAT)
            return
        }
        this.catRunning = false
    }
    public canRun() {
        return !this.catRunning
    }

    public playerRun(nextStep: Point) {
        console.log("用户走")
        this.sound.play(0, 1)
        n.GameData.step++
        this.catRunning = true
        this.cat.run()
    }
    /**
     * 创建猫
     */
    private createCat() {
        console.log("创建猫")
        let i = Math.floor(n.GameData.row / 2)
        let j = Math.floor(n.GameData.col / 2)
        this.cat = new Cat(this)
        this.addChild(this.cat)
        this.cat.move(new Point(i, j))
    }
    /**
     * 创建屏障
     */
    private createBarrier(num: number) {
        console.log("创建屏障")
        while (num) {
            let i = Math.floor(Math.random() * 100 % n.GameData.row)
            let j = Math.floor(Math.random() * 100 % n.GameData.col)
            let gridNode = n.GameData.gridNodeList[i][j]
            if (i != Math.floor(n.GameData.row / 2) && j != Math.floor(n.GameData.col / 2) && gridNode.getStatus() === GridNodeStatus.AVAILABLE) {
                // 设置状态为UNAVAILABLE
                gridNode.setStatus(GridNodeStatus.UNAVAILABLE)
                num--
            }
        }
    }
    /**
     * 创建地图
     */
    private createGriNode() {
        console.log("创建地图")
        n.GameData.gridNodeList = new Array<Array<any>>(n.GameData.row)
        let gridNodeSize = GameUtil.getStageWidth() / (n.GameData.row + 1) - n.GameData.gridMargin
        for (let i = 0; i < n.GameData.row; ++i) {
            n.GameData.gridNodeList[i] = new Array<GridNode>(n.GameData.col)
            let indet = (i % 2) * (gridNodeSize / 2)
            for (let j = 0; j < n.GameData.col; ++j) {
                let x = indet + j * (gridNodeSize + n.GameData.gridMargin)
                let y = i * gridNodeSize
                n.GameData.gridNodeList[i][j] = new GridNode(new Point(i, j), new Point(x, y), gridNodeSize, this)
                n.GameData.gridNodeList[i][j].setStatus(GridNodeStatus.AVAILABLE)
                this.addChild(n.GameData.gridNodeList[i][j])
            }
        }
    }
}
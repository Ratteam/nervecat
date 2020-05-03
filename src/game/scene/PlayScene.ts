declare interface PlayListener {
    canRun(): boolean
    playerRun(nextStep: Point): void
    // catRun(searchResult: SearchResult): void
    // gameOver(type: number): void
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
    public canRun() {
        return !this.catRunning
    }

    public playerRun(nextStep:Point){

    }
    /**
     * 创建猫
     */
    private createCat() {
        console.log("创建猫")
        let i = Math.floor(n.GameData.row/2)
        let j = Math.floor(n.GameData.col/2)
        this.cat = new Cat(this)
        this.addChild(this.cat)
        this.cat.move(new Point(i,j))
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
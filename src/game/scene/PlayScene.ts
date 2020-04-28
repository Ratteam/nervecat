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
        // this.createGriNode()
        // this.createBarrier()
        // this.createCat()
        this.x = (GameUtil.getStageWidth() - this.width) / 2
        this.y = GameUtil.getStageHeight() / 2.5
        SceneController.showLevelTip()
    }
}
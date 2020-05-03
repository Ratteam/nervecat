

class SearchResult {

}
enum CatStatus {
    AVAILABLE = 0, // 还有路走
    UNAVAILABLE = 1 // 无路可走
}
class Cat extends egret.Sprite {
    /**
     * 点击事件监听
     */
    private playListener: PlayListener
    /**
     * 格子的背景
     */
    private bg: egret.MovieClip
    /**
    * 猫的状态
    */
    private status: CatStatus
    /**
     * 猫在数组中的下标
     */
    private index: Point
    /**
     * 猫所在的格子
     */
    private gridNode: GridNode
    private catMovieClip = {
        normal: GameUtil.createMovieClipByName('cat_normal'),
        loser: GameUtil.createMovieClipByName('cat_loser')
    }

    public constructor(playListener: PlayListener) {
        super()
        this.playListener = playListener
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    private onAddToStage(egret: egret.Event) {
        this.init()
    }
    private init() {
        this.bg = new egret.MovieClip()
        this.addChild(this.bg)
        this.setStatus(CatStatus.AVAILABLE)
    }
    public setStatus(status: CatStatus) {
        if (this.status === status) {
            return
        }
        this.status = status
        this.changeBg()
    }
    private changeBg() {
        switch(this.status) {
            case CatStatus.AVAILABLE:
                this.bg.movieClipData = this.catMovieClip.normal.movieClipData
                this.bg.play(-1)
                break
            case CatStatus.UNAVAILABLE:
                this.bg.movieClipData = this.catMovieClip.loser.movieClipData
                this.bg.play(-1)
                break
        }
    }
        public move(nextStep: Point = this.index) {
        if (!nextStep.equal(this.index)) {
            if (this.gridNode) {
                this.gridNode.setStatus(GridNodeStatus.AVAILABLE)
            }
            this.gridNode = n.GameData.gridNodeList[nextStep.x][nextStep.y]
            this.gridNode.setStatus(GridNodeStatus.CAT)
            this.index = nextStep
            this.x = this.gridNode.x + (this.gridNode.width - this.bg.width) / 2
            this.y = this.gridNode.y - this.bg.height + this.gridNode.height / 2
        }
    }
}
/**
 * 场景控制类
 */
class SceneController {
    private _stage: egret.DisplayObjectContainer

    private startScene: StartScene
    private playScene: PlayScene
    private endScene: EndScene

    public static sceneController: SceneController
    public static get instance() {
        if (!this.sceneController) {
            this.sceneController = new SceneController()
        }
        return this.sceneController
    }
    public constructor() {
        this.startScene = new StartScene()
        this.playScene = new PlayScene()
        this.endScene = new EndScene()
    }
    public setStage(stage: egret.DisplayObjectContainer) {
        this._stage = stage
    }
    public static initGame() {
        let stage: egret.DisplayObjectContainer = this.instance._stage
        stage.addChild(this.instance.startScene)
    }
    public static showPlayScene() {
        let stage: egret.DisplayObjectContainer = this.instance._stage
        // 如果有开始游戏场景，移除掉
        if (this.instance.startScene.parent) {
            stage.removeChild(this.instance.startScene)
            this.instance.startScene = new StartScene()
        }
        // 如果有结束游戏场景，移除掉
        if (this.instance.endScene.parent) {
            stage.removeChild(this.instance.endScene)
            this.instance.endScene = new EndScene()
        }
        // 如果有游戏关卡场景，移除掉
        if (this.instance.playScene.parent) {
            stage.removeChild(this.instance.playScene)
            this.instance.playScene = new PlayScene()
        }
        let level = n.GameData.level
        if (level >= n.GameData.levelData.length) {
            level = n.GameData.levelData.length - 1
            
        }
        n.GameData.barrierNumber = n.GameData.levelData[level].barrierNumber
        n.GameData.row = n.GameData.levelData[level].row
        n.GameData.col = n.GameData.levelData[level].col
        n.GameData.overType = OverType.NULL
        n.GameData.step = 0
        stage.addChild(this.instance.playScene)
    }
    public static showLevelTip() {
        let level = n.GameData.level + 1
        let stage: egret.DisplayObjectContainer = this.instance._stage
        let bg: egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
        bg.width = GameUtil.getStageWidth()
        bg.height = GameUtil.getStageHeight()
        bg.x = 0
        bg.y = 0
        stage.addChild(bg)
        let shp: egret.Shape = new egret.Shape()
        shp.graphics.beginFill(0x000000, 0.8)
        shp.graphics.drawRect(0, 0, GameUtil.getStageWidth(), GameUtil.getStageHeight())
        shp.graphics.endFill()
        shp.touchEnabled = true
        bg.addChild(shp)
        let info: egret.TextField = new egret.TextField()
        info.bold = true
        info.textColor = 0xffffff
        info.strokeColor = 0x000000
        info.stroke = 2
        info.size = 60
        info.text = `第${level}关`
        info.x = (GameUtil.getStageWidth() - info.width) / 2
        info.y = (GameUtil.getStageHeight() - info.height) / 2
        bg.addChild(info)
        // Tween动画控制弹出第几关显示
        egret.Tween
            .get(info)
            .wait(500)
            .to({
                y: 10,
                alpha: 0
            }, 1000, egret.Ease.backInOut)
            .call(() => {
                stage.removeChild(bg)
            })
        // Tween动画控制黑色背景蒙层显示
        egret.Tween
            .get(shp)
            .wait(500)
            .to({
                alpha: 0
            }, 1000, egret.Ease.sineIn)
    }
}
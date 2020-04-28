var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 场景控制类
 */
var SceneController = (function () {
    function SceneController() {
        this.startScene = new StartScene();
        this.playScene = new PlayScene();
        this.endScene = new EndScene();
    }
    Object.defineProperty(SceneController, "instance", {
        get: function () {
            if (!this.sceneController) {
                this.sceneController = new SceneController();
            }
            return this.sceneController;
        },
        enumerable: true,
        configurable: true
    });
    SceneController.prototype.setStage = function (stage) {
        this._stage = stage;
    };
    SceneController.initGame = function () {
        var stage = this.instance._stage;
        stage.addChild(this.instance.startScene);
    };
    SceneController.showPlayScene = function () {
        var stage = this.instance._stage;
        var level = n.GameData.level;
        if (level >= n.GameData.levelData.length) {
            level = n.GameData.levelData.length - 1;
        }
        n.GameData.barrierNumber = n.GameData.levelData[level].barrierNumer;
        n.GameData.row = n.GameData.levelData[level].row;
        n.GameData.col = n.GameData.levelData[level].col;
        n.GameData.overType = OverType.NULL;
        n.GameData.step = 0;
        stage.addChild(this.instance.playScene);
    };
    SceneController.showLevelTip = function () {
        var level = n.GameData.level + 1;
        var stage = this.instance._stage;
        var bg = new egret.DisplayObjectContainer();
        bg.width = GameUtil.getStageWidth();
        bg.height = GameUtil.getStageHeight();
        bg.x = 0;
        bg.y = 0;
        stage.addChild(bg);
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.8);
        shp.graphics.drawRect(0, 0, GameUtil.getStageWidth(), GameUtil.getStageHeight());
        shp.graphics.endFill();
        shp.touchEnabled = true;
        bg.addChild(shp);
        var info = new egret.TextField();
        info.bold = true;
        info.textColor = 0xffffff;
        info.strokeColor = 0x000000;
        info.stroke = 2;
        info.size = 60;
        info.text = "\u7B2C" + level + "\u5173";
        info.x = (GameUtil.getStageWidth() - info.width) / 2;
        info.y = (GameUtil.getStageHeight() - info.height) / 2;
        bg.addChild(info);
        // Tween动画控制弹出第几关显示
        egret.Tween
            .get(info)
            .wait(500)
            .to({
            y: 10,
            alpha: 0
        }, 1000, egret.Ease.backInOut)
            .call(function () {
            stage.removeChild(bg);
        });
        // Tween动画控制黑色背景蒙层显示
        egret.Tween
            .get(shp)
            .wait(500)
            .to({
            alpha: 0
        }, 1000, egret.Ease.sineIn);
    };
    return SceneController;
}());
__reflect(SceneController.prototype, "SceneController");

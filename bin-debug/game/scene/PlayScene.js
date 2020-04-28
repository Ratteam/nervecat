var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var OverType;
(function (OverType) {
    OverType[OverType["NULL"] = -1] = "NULL";
    OverType[OverType["PLAYER"] = 0] = "PLAYER";
    OverType[OverType["CAT"] = 1] = "CAT"; // 猫赢
})(OverType || (OverType = {}));
var PlayScene = (function (_super) {
    __extends(PlayScene, _super);
    function PlayScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayScene.prototype.initView = function () {
        this.sound = RES.getRes('go_mp3');
        this.catRunning = false;
        // this.createGriNode()
        // this.createBarrier()
        // this.createCat()
        this.x = (GameUtil.getStageWidth() - this.width) / 2;
        this.y = GameUtil.getStageHeight() / 2.5;
        SceneController.showLevelTip();
    };
    return PlayScene;
}(BaseScene));
__reflect(PlayScene.prototype, "PlayScene", ["PlayListener"]);

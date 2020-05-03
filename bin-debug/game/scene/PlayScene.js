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
        this.createGriNode();
        this.createBarrier(n.GameData.barrierNumber);
        this.createCat();
        this.x = (GameUtil.getStageWidth() - this.width) / 2;
        this.y = GameUtil.getStageHeight() / 2.5;
        SceneController.showLevelTip();
    };
    /**
     * 游戏结束
     */
    PlayScene.prototype.gameOver = function (type) {
        // 获取结束类型（玩家赢或猫赢）
        n.GameData.overType = type;
        // 显示结果
        SceneController.showEndScene();
    };
    PlayScene.prototype.catRun = function (searchResult) {
        console.log("貓走");
        if (!searchResult.hasPath) {
            this.cat.setStatus(CatStatus.UNAVAILABLE);
        }
        var nextStep = searchResult.nextStep;
        if (nextStep.equal(this.cat.getIndex())) {
            this.gameOver(OverType.PLAYER);
            return;
        }
        this.cat.move(nextStep);
        if (nextStep.x * nextStep.y === 0 || nextStep.x === n.GameData.row - 1 || nextStep.y === n.GameData.col - 1) {
            this.gameOver(OverType.CAT);
            return;
        }
        this.catRunning = false;
    };
    PlayScene.prototype.canRun = function () {
        return !this.catRunning;
    };
    PlayScene.prototype.playerRun = function (nextStep) {
        console.log("用户走");
        this.sound.play(0, 1);
        n.GameData.step++;
        this.catRunning = true;
        this.cat.run();
    };
    /**
     * 创建猫
     */
    PlayScene.prototype.createCat = function () {
        console.log("创建猫");
        var i = Math.floor(n.GameData.row / 2);
        var j = Math.floor(n.GameData.col / 2);
        this.cat = new Cat(this);
        this.addChild(this.cat);
        this.cat.move(new Point(i, j));
    };
    /**
     * 创建屏障
     */
    PlayScene.prototype.createBarrier = function (num) {
        console.log("创建屏障");
        while (num) {
            var i = Math.floor(Math.random() * 100 % n.GameData.row);
            var j = Math.floor(Math.random() * 100 % n.GameData.col);
            var gridNode = n.GameData.gridNodeList[i][j];
            if (i != Math.floor(n.GameData.row / 2) && j != Math.floor(n.GameData.col / 2) && gridNode.getStatus() === GridNodeStatus.AVAILABLE) {
                // 设置状态为UNAVAILABLE
                gridNode.setStatus(GridNodeStatus.UNAVAILABLE);
                num--;
            }
        }
    };
    /**
     * 创建地图
     */
    PlayScene.prototype.createGriNode = function () {
        console.log("创建地图");
        n.GameData.gridNodeList = new Array(n.GameData.row);
        var gridNodeSize = GameUtil.getStageWidth() / (n.GameData.row + 1) - n.GameData.gridMargin;
        for (var i = 0; i < n.GameData.row; ++i) {
            n.GameData.gridNodeList[i] = new Array(n.GameData.col);
            var indet = (i % 2) * (gridNodeSize / 2);
            for (var j = 0; j < n.GameData.col; ++j) {
                var x = indet + j * (gridNodeSize + n.GameData.gridMargin);
                var y = i * gridNodeSize;
                n.GameData.gridNodeList[i][j] = new GridNode(new Point(i, j), new Point(x, y), gridNodeSize, this);
                n.GameData.gridNodeList[i][j].setStatus(GridNodeStatus.AVAILABLE);
                this.addChild(n.GameData.gridNodeList[i][j]);
            }
        }
    };
    return PlayScene;
}(BaseScene));
__reflect(PlayScene.prototype, "PlayScene", ["PlayListener"]);

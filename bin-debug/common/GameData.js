var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var n;
(function (n) {
    var GameData = (function () {
        function GameData() {
        }
        /**
         * 游戏关卡
         */
        GameData.level = 0;
        /**
         * 关卡数据
         */
        GameData.levelData = [
            {
                barrierNumber: 10,
                row: 7,
                col: 7
            },
            {
                barrierNumber: 22,
                row: 8,
                col: 8
            },
            {
                barrierNumber: 24,
                row: 9,
                col: 9
            },
            {
                barrierNumber: 26,
                row: 10,
                col: 10
            },
            {
                barrierNumber: 24,
                row: 10,
                col: 10
            },
            {
                barrierNumber: 22,
                row: 10,
                col: 10
            },
            {
                barrierNumber: 20,
                row: 10,
                col: 10
            },
            {
                barrierNumber: 18,
                row: 10,
                col: 10
            },
            {
                barrierNumber: 16,
                row: 10,
                col: 10
            },
            {
                barrierNumber: 14,
                row: 10,
                col: 10
            }
        ];
        /**
         * 初始化的障碍物个数
         */
        GameData.barrierNumber = 15;
        // 多少行多少列
        GameData.row = 6;
        GameData.col = 6;
        /**
         * 结束类型（玩家赢或猫赢）
         */
        GameData.overType = OverType.NULL;
        /**
         * 玩家走的步数
         */
        GameData.step = 0;
        return GameData;
    }());
    n.GameData = GameData;
    __reflect(GameData.prototype, "n.GameData");
})(n || (n = {}));

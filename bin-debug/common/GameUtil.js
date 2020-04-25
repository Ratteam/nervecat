var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 工具类
 */
var GameUtil = (function () {
    function GameUtil() {
    }
    /**
     * 通用创建Bitmap对象，参数请参考resources/resource.json配置文件的内容。
     */
    GameUtil.createBitmapByName = function (name, type) {
        if (type === void 0) { type = 'png'; }
        var result = new egret.Bitmap();
        var texture = RES.getRes(name + '_' + type);
        result.texture = texture;
        return result;
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");

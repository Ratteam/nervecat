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
    GameUtil.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 获取舞台宽度
     */
    GameUtil.getStageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    /**
     * 获取舞台高度
     */
    GameUtil.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    /**
     * 图片绑定单机事件
     */
    GameUtil.bitmapToBtn = function (bitmap, callback) {
        bitmap.touchEnabled = true;
        var source = new Point(bitmap.x, bitmap.y);
        var sourceAnchor = new Point(bitmap.anchorOffsetX, bitmap.anchorOffsetY);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            bitmap.anchorOffsetX = bitmap.width / 2;
            bitmap.anchorOffsetY = bitmap.height / 2;
            if (!new Point(bitmap.anchorOffsetX, bitmap.anchorOffsetY).equal(sourceAnchor)) {
                bitmap.x = source.x + bitmap.anchorOffsetX;
                bitmap.y = source.y + bitmap.anchorOffsetY;
            }
            bitmap.scaleX = 0.95;
            bitmap.scaleY = 0.95;
        }, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            reset();
            callback && callback();
        }, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_CANCEL, reset, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_END, reset, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, reset, this);
        function reset() {
            bitmap.anchorOffsetX = sourceAnchor.x;
            bitmap.anchorOffsetY = sourceAnchor.y;
            bitmap.x = source.x;
            bitmap.y = source.y;
            bitmap.scaleX = 1;
            bitmap.scaleY = 1;
        }
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");

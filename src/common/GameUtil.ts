/**
 * 工具类
 */
class GameUtil {
    /**
     * 通用创建Bitmap对象，参数请参考resources/resource.json配置文件的内容。
     */
    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap()
        let texture: egret.Texture = RES.getRes(name)
        result.texture = texture
        return result
    }
    /**
     * 获取舞台宽度
     */
    public static getStageWidth(): number {
        return egret.MainContext.instance.stage.stageWidth
    }
    /**
     * 获取舞台高度
     */
    public static getStageHeight(): number {
        return egret.MainContext.instance.stage.stageHeight
    }
    /**
     * 图片绑定单机事件
     */
    public static bitmapToBtn(bitmap: egret.Bitmap, callback) {
        bitmap.touchEnabled = true
        const source: Point = new Point(bitmap.x, bitmap.y)
        const sourceAnchor: Point = new Point(bitmap.anchorOffsetX, bitmap.anchorOffsetY)
        bitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            bitmap.anchorOffsetX = bitmap.width / 2
            bitmap.anchorOffsetY = bitmap.height / 2
            if (!new Point(bitmap.anchorOffsetX, bitmap.anchorOffsetY).equal(sourceAnchor)) {
                bitmap.x = source.x + bitmap.anchorOffsetX
                bitmap.y = source.y + bitmap.anchorOffsetY
            }
            bitmap.scaleX = 0.95
            bitmap.scaleY = 0.95
        }, this)
        bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            reset()
            callback && callback()
        }, this)
        bitmap.addEventListener(egret.TouchEvent.TOUCH_CANCEL, reset, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_END, reset, this)
        bitmap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, reset, this)
        function reset() {
            bitmap.anchorOffsetX = sourceAnchor.x
            bitmap.anchorOffsetY = sourceAnchor.y
            bitmap.x = source.x
            bitmap.y = source.y
            bitmap.scaleX = 1
            bitmap.scaleY = 1
        }
    }

}
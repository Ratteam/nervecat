/**
 * 工具类
 */
class GameUtil {
    /**
     * 通用创建Bitmap对象，参数请参考resources/resource.json配置文件的内容。
     */
    public static createBitmapByName(name: string, type: string = 'png') {
        let result = new egret.Bitmap()
        let texture: egret.Texture = RES.getRes(name + '_' + type)
        result.texture = texture
        return result
    }
}
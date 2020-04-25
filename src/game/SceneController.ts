/**
 * 场景控制类
 */
class SceneController {
    private _stage: egret.DisplayObjectContainer

    private startScene: StartScene
    private playScene: PlayScene
    private endScene: EndScene

    public static sceneController: SceneController
    public static get instance(){
        if(!this.sceneController){
            this.sceneController = new SceneController()
        }
        return this.sceneController;
    }    
    public constructor(){
        this.startScene = new StartScene()
        this.playScene = new PlayScene()
        this.endScene = new EndScene()
    }
}
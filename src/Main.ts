//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
    /**
    * 构造函数，创建对象时初始化对象
    */
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    /**
    * 访问构造函数结束后，通过addEventListener指定的回调调用该函数
    */
    private onAddToStage(event: egret.Event) {
        // 生命周期管理器：egret.lifecycle
        // 在游戏中，用户可以切换应用的前后台。在用户进入后台时，关闭游戏逻辑、渲染逻辑、背景音乐，可以保证更好的用户体验。
        egret.lifecycle.onPause = () => {
            console.log("app 进入后台");
            egret.ticker.pause(); // 关闭渲染与心跳
        }
        egret.lifecycle.onResume = () => {
            console.log("app 进入前台");
            egret.ticker.resume(); // 打开渲染与心跳
        }
        // 调用开始游戏方法，捕捉异常
        this.runGame().catch(e => {
            console.log(e);
        })
    }
    /**
     * 开始游戏方法
     */
    private async runGame() {
        // 加载资源
        await this.loadResource()
        // 创建游戏场景
        this.createGameScene()
    }
    /**
     * 加载资源文件
     */
    private async loadResource() {
        try {
            // loading显示
            const loadingView = new LoadingUI()
            this.stage.addChild(loadingView)
            // 加载资源配置文件
            await RES.loadConfig("resource/default.res.json", "resource/")
            // 指定资源组
            await RES.loadGroup("preload", 0, loadingView)
            // loading隐藏
            this.stage.removeChild(loadingView)
        }
        catch (e) {
            console.error(e)
        }
    }
    /**
     * 创建游戏场景
     */
    private createGameScene() {
        let container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
        this.addChild(container)
        let bg: egret.Bitmap = GameUtil.createBitmapByName('bg2','jpg')
        container.addChild(bg);
        
    }
}
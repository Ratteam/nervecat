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
var SearchResult = (function () {
    function SearchResult() {
    }
    return SearchResult;
}());
__reflect(SearchResult.prototype, "SearchResult");
var CatStatus;
(function (CatStatus) {
    CatStatus[CatStatus["AVAILABLE"] = 0] = "AVAILABLE";
    CatStatus[CatStatus["UNAVAILABLE"] = 1] = "UNAVAILABLE"; // 无路可走
})(CatStatus || (CatStatus = {}));
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat(playListener) {
        var _this = _super.call(this) || this;
        _this.catMovieClip = {
            normal: GameUtil.createMovieClipByName('cat_normal'),
            loser: GameUtil.createMovieClipByName('cat_loser')
        };
        _this.playListener = playListener;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Cat.prototype.onAddToStage = function (egret) {
        this.init();
    };
    Cat.prototype.init = function () {
        this.bg = new egret.MovieClip();
        this.addChild(this.bg);
        this.setStatus(CatStatus.AVAILABLE);
    };
    Cat.prototype.setStatus = function (status) {
        if (this.status === status) {
            return;
        }
        this.status = status;
        this.changeBg();
    };
    Cat.prototype.changeBg = function () {
        switch (this.status) {
            case CatStatus.AVAILABLE:
                this.bg.movieClipData = this.catMovieClip.normal.movieClipData;
                this.bg.play(-1);
                break;
            case CatStatus.UNAVAILABLE:
                this.bg.movieClipData = this.catMovieClip.loser.movieClipData;
                this.bg.play(-1);
                break;
        }
    };
    Cat.prototype.move = function (nextStep) {
        if (nextStep === void 0) { nextStep = this.index; }
        if (!nextStep.equal(this.index)) {
            if (this.gridNode) {
                this.gridNode.setStatus(GridNodeStatus.AVAILABLE);
            }
            this.gridNode = n.GameData.gridNodeList[nextStep.x][nextStep.y];
            this.gridNode.setStatus(GridNodeStatus.CAT);
            this.index = nextStep;
            this.x = this.gridNode.x + (this.gridNode.width - this.bg.width) / 2;
            this.y = this.gridNode.y - this.bg.height + this.gridNode.height / 2;
        }
    };
    return Cat;
}(egret.Sprite));
__reflect(Cat.prototype, "Cat");

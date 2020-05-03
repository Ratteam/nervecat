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
var RunPath = (function (_super) {
    __extends(RunPath, _super);
    function RunPath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.step = 0;
        return _this;
    }
    RunPath.prototype.copy = function () {
        var n = new RunPath(this.x, this.y);
        n.step = this.step;
        n.firstStep = this.firstStep.copy();
        return n;
    };
    return RunPath;
}(Point));
__reflect(RunPath.prototype, "RunPath");
var SearchResult = (function () {
    function SearchResult() {
        this.hasPath = true;
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
    Cat.prototype.run = function () {
        this.playListener && this.playListener.catRun(this.search());
    };
    Cat.prototype.getIndex = function () {
        return this.index;
    };
    /**
    * 获取猫要走的下一步和其他信息
    * public nextStep: Point // 下一步
    * public hasPath: boolean = true // 是否可以走出去
    */
    Cat.prototype.search = function () {
        var temp = new Array(n.GameData.row);
        for (var i = 0; i < n.GameData.row; ++i) {
            temp[i] = new Array(n.GameData.col);
            for (var j = 0; j < n.GameData.col; ++j) {
                temp[i][j] = Number.MAX_VALUE;
            }
        }
        var firstStepList = this.getFirstStep();
        var list = new Array();
        firstStepList.forEach(function (item) {
            temp[item.x][item.y] = 1;
            list.push(item.copy());
        });
        var minStep = Number.MAX_VALUE;
        var result = new Array();
        while (list.length) {
            var current = list.shift();
            if (current.x === 0 || current.y === 0 || current.x === n.GameData.row - 1 || current.y === n.GameData.col - 1) {
                if (current.step < minStep) {
                    result = new Array();
                    result.push(current.firstStep.copy());
                    minStep = current.step;
                }
                else if (current.step === minStep) {
                    result.push(current.firstStep.copy());
                }
                continue;
            }
            var dir = this.getDir(current.x);
            for (var i = 0; i < dir.length; ++i) {
                var t = new RunPath(current.x, current.y);
                t.x += dir[i][0];
                t.y += dir[i][1];
                t.step = current.step + 1;
                if (t.x < 0 || t.y < 0 || t.x === n.GameData.row || t.y === n.GameData.col) {
                    continue;
                }
                if (n.GameData.gridNodeList[t.x][t.y].getStatus() !== GridNodeStatus.AVAILABLE) {
                    continue;
                }
                if (temp[t.x][t.y] > t.step) {
                    temp[t.x][t.y] = t.step;
                    t.firstStep = current.firstStep.copy();
                    list.push(t);
                }
            }
        }
        var nextResult = new SearchResult();
        if (minStep === Number.MAX_VALUE) {
            this.setStatus(CatStatus.AVAILABLE);
            nextResult.hasPath = false;
        }
        if (result.length === 0) {
            firstStepList.forEach(function (item) {
                result.push(item.firstStep);
            });
        }
        if (result.length > 0) {
            var list_1 = this.sortList(result);
            var index = Math.floor(Math.random() * list_1.length);
            nextResult.nextStep = list_1[index];
        }
        else {
            nextResult.nextStep = this.index;
        }
        return nextResult;
    };
    /**
     * 排序找出可走路徑最多的格子
     */
    Cat.prototype.sortList = function (list) {
        var sort = new Array();
        list.forEach(function (item) {
            var key = item.x + '-' + item.y;
            var index = -1;
            for (var i = 0; i < sort.length; ++i) {
                if (sort[i].key === key) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                sort[index].count++;
            }
            else {
                sort.push({
                    key: key,
                    value: item,
                    count: 1,
                });
            }
        });
        sort.sort(function (a, b) {
            return b.count - a.count;
        });
        var result = new Array();
        sort.forEach(function (item) {
            if (item.count === sort[0].count) {
                result.push(new Point(item.value.x, item.value.y));
            }
        });
        return result;
    };
    Cat.prototype.getFirstStep = function () {
        var firstStepList = new Array();
        var dir = this.getDir(this.index.x);
        for (var i = 0; i < dir.length; ++i) {
            var x = this.index.x + dir[i][0];
            var y = this.index.y + dir[i][1];
            if (x < 0 || y < 0 || x >= n.GameData.row || y >= n.GameData.col) {
                continue;
            }
            if (n.GameData.gridNodeList[x][y].getStatus() !== GridNodeStatus.AVAILABLE) {
                continue;
            }
            var runPath = new RunPath(x, y);
            runPath.step = 1;
            runPath.firstStep = new Point(x, y);
            firstStepList.push(runPath);
        }
        return firstStepList;
    };
    Cat.prototype.getDir = function (col) {
        var t = col % 2;
        var dir = [
            [0, -1],
            [0, 1],
            [-1, t - 1],
            [-1, t * 1],
            [1, t - 1],
            [1, t * 1],
        ];
        return dir;
    };
    return Cat;
}(egret.Sprite));
__reflect(Cat.prototype, "Cat");

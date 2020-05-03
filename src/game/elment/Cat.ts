
class RunPath extends Point {
    public step: number = 0
    public firstStep: Point
    public copy(): RunPath {
        let n = new RunPath(this.x, this.y)
        n.step = this.step
        n.firstStep = this.firstStep.copy()
        return n
    }
}

class SearchResult {
    public nextStep: Point
    public hasPath: boolean = true
}

enum CatStatus {
    AVAILABLE = 0, // 还有路走
    UNAVAILABLE = 1 // 无路可走
}
class Cat extends egret.Sprite {
    /**
     * 点击事件监听
     */
    private playListener: PlayListener
    /**
     * 格子的背景
     */
    private bg: egret.MovieClip
    /**
    * 猫的状态
    */
    private status: CatStatus
    /**
     * 猫在数组中的下标
     */
    private index: Point
    /**
     * 猫所在的格子
     */
    private gridNode: GridNode
    private catMovieClip = {
        normal: GameUtil.createMovieClipByName('cat_normal'),
        loser: GameUtil.createMovieClipByName('cat_loser')
    }

    public constructor(playListener: PlayListener) {
        super()
        this.playListener = playListener
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    private onAddToStage(egret: egret.Event) {
        this.init()
    }
    private init() {
        this.bg = new egret.MovieClip()
        this.addChild(this.bg)
        this.setStatus(CatStatus.AVAILABLE)
    }
    public setStatus(status: CatStatus) {
        if (this.status === status) {
            return
        }
        this.status = status
        this.changeBg()
    }
    private changeBg() {
        switch (this.status) {
            case CatStatus.AVAILABLE:
                this.bg.movieClipData = this.catMovieClip.normal.movieClipData
                this.bg.play(-1)
                break
            case CatStatus.UNAVAILABLE:
                this.bg.movieClipData = this.catMovieClip.loser.movieClipData
                this.bg.play(-1)
                break
        }
    }
    public move(nextStep: Point = this.index) {
        if (!nextStep.equal(this.index)) {
            if (this.gridNode) {
                this.gridNode.setStatus(GridNodeStatus.AVAILABLE)
            }
            this.gridNode = n.GameData.gridNodeList[nextStep.x][nextStep.y]
            this.gridNode.setStatus(GridNodeStatus.CAT)
            this.index = nextStep
            this.x = this.gridNode.x + (this.gridNode.width - this.bg.width) / 2
            this.y = this.gridNode.y - this.bg.height + this.gridNode.height / 2
        }
    }
    public run() {
        this.playListener && this.playListener.catRun(this.search())
    }
    public getIndex(): Point {
        return this.index
    }
    /**
    * 获取猫要走的下一步和其他信息
    * public nextStep: Point // 下一步
    * public hasPath: boolean = true // 是否可以走出去
    */
    private search(): SearchResult {
        let temp: Array<Array<number>> = new Array(n.GameData.row)
        for (let i = 0; i < n.GameData.row; ++i) {
            temp[i] = new Array<number>(n.GameData.col)
            for (let j = 0; j < n.GameData.col; ++j) {
                temp[i][j] = Number.MAX_VALUE
            }
        }
        let firstStepList = this.getFirstStep()
        let list: Array<RunPath> = new Array<RunPath>()
        firstStepList.forEach(item => {
            temp[item.x][item.y] = 1
            list.push(item.copy())
        })
        let minStep = Number.MAX_VALUE
        let result: Point[] = new Array<Point>()
        while (list.length) {
            let current: RunPath = list.shift()
            if (current.x === 0 || current.y === 0 || current.x === n.GameData.row - 1 || current.y === n.GameData.col - 1) {
                if (current.step < minStep) {
                    result = new Array<Point>()
                    result.push(current.firstStep.copy())
                    minStep = current.step
                } else if (current.step === minStep) {
                    result.push(current.firstStep.copy())
                }
                continue
            }
            let dir = this.getDir(current.x)
            for (let i = 0; i < dir.length; ++i) {
                let t: RunPath = new RunPath(current.x, current.y)
                t.x += dir[i][0]
                t.y += dir[i][1]
                t.step = current.step + 1
                if (t.x < 0 || t.y < 0 || t.x === n.GameData.row || t.y === n.GameData.col) {
                    continue
                }
                if (n.GameData.gridNodeList[t.x][t.y].getStatus() !== GridNodeStatus.AVAILABLE) {
                    continue
                }
                if (temp[t.x][t.y] > t.step) {
                    temp[t.x][t.y] = t.step
                    t.firstStep = current.firstStep.copy()
                    list.push(t)
                }
            }
        }
        let nextResult: SearchResult = new SearchResult()
        if (minStep === Number.MAX_VALUE) {
            this.setStatus(CatStatus.AVAILABLE)
            nextResult.hasPath = false
        }
        if (result.length === 0) {
            firstStepList.forEach(item => {
                result.push(item.firstStep)
            })
        }
        if (result.length > 0) {
            let list = this.sortList(result)
            let index = Math.floor(Math.random() * list.length)
            nextResult.nextStep = list[index]
        } else {
            nextResult.nextStep = this.index
        }
        return nextResult
    }
    /**
     * 排序找出可走路徑最多的格子
     */
    private sortList(list: Array<Point>): Array<Point> {
        let sort: Array<any> = new Array<any>()
        list.forEach(item => {
            let key = item.x + '-' + item.y
            let index = -1
            for (let i = 0; i < sort.length; ++i) {
                if (sort[i].key === key) {
                    index = i
                    break
                }
            }
            if (index > -1) {
                sort[index].count++
            } else {
                sort.push({
                    key: key,
                    value: item,
                    count: 1,
                })
            }
        })
        sort.sort((a, b) => {
            return b.count - a.count
        })
        let result: Array<Point> = new Array<Point>()
        sort.forEach(item => {
            if (item.count === sort[0].count) {
                result.push(new Point(item.value.x, item.value.y))
            }
        })
        return result
    }
    private getFirstStep(): Array<RunPath> {
        let firstStepList = new Array<RunPath>()
        let dir = this.getDir(this.index.x)
        for (let i = 0; i < dir.length; ++i) {
            let x = this.index.x + dir[i][0]
            let y = this.index.y + dir[i][1]
            if (x < 0 || y < 0 || x >= n.GameData.row || y >= n.GameData.col) {
                continue
            }
            if (n.GameData.gridNodeList[x][y].getStatus() !== GridNodeStatus.AVAILABLE) {
                continue
            }
            let runPath: RunPath = new RunPath(x, y)
            runPath.step = 1
            runPath.firstStep = new Point(x, y)
            firstStepList.push(runPath)
        }
        return firstStepList
    }
    private getDir(col) {
        let t = col % 2
        let dir: number[][] = [
            [0, -1],
            [0, 1],
            [-1, t - 1],
            [-1, t * 1],
            [1, t - 1],
            [1, t * 1],
        ]
        return dir
    }
}
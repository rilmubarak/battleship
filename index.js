// Your code here
class Fleet{
    constructor(name, size, symbol){
        this.name = name
        this.size = size
        this.symbol = symbol
    }
}
class BattleShip{
    constructor(boardSize){
        this.boardSize = boardSize
        this.arr = []
        this._target = []
    }
    get target(){
        return this._target
    }
    addEnemy(fleet){
        let dict = 'ABCDEFGHIJ'
        let flag = false
        let rngA
        let rngB
        while(!flag){
            rngA = Math.floor(Math.random()*(this.boardSize-fleet.size+1)) + 1
            rngB = Math.floor(Math.random()*10)+1
            flag = true
            for(let i = rngA; i < rngA + fleet.size; i++){
                if(this.arr[rngB][i] !== ' ' || this.arr[i][rngB] !== ' '){
                    flag = false
                    break
                }
            }
        }
        let arah = Math.round(Math.random())
        if(arah === 0){
            for(let i = rngA; i < rngA + fleet.size; i++){
                this.arr[rngB][i] = `${fleet.symbol}`
                this._target.push(`${dict[rngB-1]}${i}`)
            }
        }
        else{
            for(let i = rngA; i < rngA + fleet.size; i++){
                this.arr[i][rngB] = `${fleet.symbol}`
                this._target.push(`${dict[i-1]}${rngB}`)
            }
        }
    }
    initBoard(){
        let dict = 'ABCDEFGHIJ'
        for(let i = 0; i <= this.boardSize; i++){
            let temp = []
            for(let j = 0; j <= this.boardSize; j++){
                temp.push(' ')
            }
            this.arr.push(temp)
        }
        for(let i = 1; i <= this.boardSize; i++){
            this.arr[i][0] = dict[i-1]
            this.arr[0][i] = i
        }
        return this
    }
    showBoard(){
        let temp = ''
        for(let i = 0; i < this.arr.length; i++){
            if(i === 0){
                temp += '|' + this.arr[i].join('|') + '|\n'
            }
            else{
                temp += '|' + this.arr[i].join('|') + ' |\n'
            }
        }
        return temp
    }
    attackEnemy(){
        let score = 0
        const inputPlayer = process.argv
        for(let i = 2; i < inputPlayer.length; i++){
            let flag = false
            let dict = 'ABCDEFGHIJ'
            let y = parseInt(inputPlayer[i][1])
            let x 
            for(let k = 0; k < dict.length; k++){
                if(inputPlayer[i][0] === dict[k]){
                    x = parseInt(k+1)
                }
            }
            if(x===10){
                y = 10
            }
            for(let j = 0; j < this._target.length; j++){
                if(inputPlayer[i] === this._target[j]){
                    score++
                    flag = true
                    this.arr[x][y] = 'X'
                    break
                }
                else{
                    this.arr[x][y] = '/'
                }
            }
            if(flag){
                console.log(`${inputPlayer[i]} attack hit enemy ship !`)
            }
            else{
                console.log(`Attack missed.`)
            }
        }
        if(score === 0){
            console.log(`Sorry, your score is 0 :(\n`)
        }
        else{
            console.log(`Yeayy! Your score is ${score}\n`)
        }
    }
    play(){
        this.attackEnemy()
        console.log(this.showBoard())
    }
}


var game = new BattleShip(10)
//init game setup and adding how many enemy ships
console.log(`
            ================ Test case only =================
              node index.js A1 B2 C3 D4 E5 F6 G7 H8 I9 J10`);
              
console.log();
game.initBoard()
game.addEnemy(new Fleet('Aircraft carrier', 5, '◆'))
game.addEnemy(new Fleet('Battleship', 4, '◇'))
game.addEnemy(new Fleet('Cruiser', 3, '❖'))
game.addEnemy(new Fleet('Destroyer', 2, '◈'))

//attack begins
game.play()
// TEST CASE
// node index.js A1 B2 C3 D4 E5 F6 G7 H8 I9 J10
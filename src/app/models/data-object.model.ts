export class DataObject {
    id: string = '1';
    int: number = 1;
    float: number = 0.12345678;
    color: string = 'red';
    child: Child = new Child();
    constructor(max: number) {
        this.id = getRandom(max).toString();
        this.int = getRandom(max);
        this.float *= +getRandom(max).toFixed(8); 
        this.color = '#'+getRandom(10)+getRandom(10)+getRandom(10)+getRandom(10)+getRandom(10)+getRandom(10);
    }
}

class Child {
    id: string = getRandom(10).toString();
    color: string = '#F3'+getRandom(10)+'D'+getRandom(10)+getRandom(10);
}

function getRandom(max: number) {
    return Math.floor(Math.random() * max);
}
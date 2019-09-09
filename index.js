class House {
    constructor(owner = 'unknown owner', house = 'unknown house') {
        this.owner = owner
        this.house = house
    }

    build() {
        console.log(
            `House ${this.house} owned by ${this.owner} is being built`
        )
    }

    getOwner() {
        return this.owner
    }

    getOwner() {
        return this.house
    }
}
const myHouse = new House('Mickey Mouse', 'Clubhouse')

console.log(myHouse)

myHouse.build()

console.log(myHouse.getOwner())

//confusing stopwatch challenge, referenced http://www.zsoltnagy.eu/javascript-tech-interview-exercise-16-stopwatch/, still don't really get it
class Timer {
    constructor( countdownInitialValue, displayTimeCallback ) {
        this.countdownInitialValue = countdownInitialValue;
        this.secondsLeft = countdownInitialValue;
        this.interval = null;
        this.displayTimeCallback = displayTimeCallback;
        this.displayTimeCallback( this.toString() );
    }
    toString() {
        const minutes = Math.floor( this.secondsLeft / 60 );
        const seconds = 
            ( '' + ( this.secondsLeft % 60 ) )
                .padStart( 2, '0' );
        return `${minutes}:${seconds}`;   
    }
    start() {
        if (typeof this.interval === 'number' ) {
            return;
        }
        let startTimestamp = Date.now();
        let startSeconds = this.secondsLeft;
        this.interval = setInterval( () => {
            let oldSecondsLeft = this.secondsLeft;
            let secondsPassed = 
                Math.floor( ( Date.now() - startTimestamp ) / 1000 );
            this.secondsLeft = 
                Math.max( 0, startSeconds - secondsPassed );
            if ( this.secondsLeft < oldSecondsLeft ) {
                this.displayTimeCallback( this.toString() );
            }                
            if ( this.secondsLeft == 0 ) {
                clearInterval( this.interval );
            }
        }, 100 );
    }
    pause() {
        if ( typeof this.interval === 'number' ) {
            clearInterval( this.interval );
            this.interval = null;
        }
    }
    reset() {
        this.pause();
        this.secondsLeft = this.countdownInitialValue;
        this.displayTimeCallback( this.toString() );
    }
}

const timer = new Timer( 61, console.log );
import Checkouts from "./Checkouts";

export default interface Player {
    playerID:string,
    username:string,
    won:boolean,
    darts:number,
    threeDartAvg:number,
    highestScore:number,
    highestCheckout:number,
    checkouts:Checkouts,
    fourtyPlus:number,
    sixtyPlus:number,
    eightyPlus:number,
    hundredPlus:number,
    oneTwentyPlus:number,
    oneFourtyPlus:number,
    oneSixtyPlus:number,
    oneEighty:number,
}
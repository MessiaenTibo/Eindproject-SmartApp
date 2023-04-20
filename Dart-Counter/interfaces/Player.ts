import Checkouts from "./Checkouts";

export default interface Player {
    PlayerID:string,
    Username:string,
    Won:boolean,
    Darts:number,
    ThreeDartsAvg:number,
    HighestScore:number,
    HighestCheckout:number,
    Checkouts:Checkouts,
    FourtyPlus:number,
    SixtyPlus:number,
    EightyPlus:number,
    HundredPlus:number,
    OneTwentyPlus:number,
    OneFourtyPlus:number,
    OneSixtyPlus:number,
    OneEighty:number,
}
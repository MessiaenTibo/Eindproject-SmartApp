import Player from './Player';

export default interface GameResults {
    PlayerAmount: number,
    Date: string,
    ThrowIn: string,
    ThrowOut: string,
    Score: number,
    Title: string,
    Legs: number,
    Sets: number,
    Player1: Player,
    Player2?: Player,
}
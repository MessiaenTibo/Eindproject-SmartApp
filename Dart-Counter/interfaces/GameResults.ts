import Player from './Player';

export default interface GameResults {
    Title: string,
    Legs: number,
    Sets: number,
    Winner: string,
    Player1: Player,
    Player2?: Player,
}
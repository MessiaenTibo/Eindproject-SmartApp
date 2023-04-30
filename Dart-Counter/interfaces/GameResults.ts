import Player from './Player';

export default interface GameResults {
    id: string,
    playerAmount: number,
    date: string,
    throwIn: string,
    throwOut: string,
    score: number,
    title: string,
    legs: number,
    sets: number,
    player1: Player,
    player2?: Player,
}
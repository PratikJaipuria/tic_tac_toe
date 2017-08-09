import React, { Component } from 'react';
import logo from './logo.svg'
import './App.css';

import Tile from "./Tile.js";
import ResetButton from "./ResetButton.js";
import Announcement from "./Announcement.js"

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            gameBoard: [
                ' ',' ',' ',
                ' ',' ',' ',
                ' ',' ',' '
            ],
            winner: null,
            turn: 'x',
            maxPlayer :'x',
            minPlayer : 'o'
        }
    }

    resetBoard(){
        this.setState({
            gameBoard: [
                ' ',' ',' ',
                ' ',' ',' ',
                ' ',' ',' '
            ],
            winner: null,
            turn: 'x',
            maxPlayer :'x',
            minPlayer : 'o'
        });
    }


    tie(board){
        var moves = board.join('').replace(/ /g, '');
        if(moves.length == 9){
            return true;
        }
        return false;
    }
    winner(board,player) {
        if (
            (board[0] === player && board[1] === player && board[2] === player) ||
            (board[3] === player && board[4] === player && board[5] === player) ||
            (board[6] === player && board[7] === player && board[8] === player) ||
            (board[0] === player && board[3] === player && board[6] === player) ||
            (board[1] === player && board[4] === player && board[7] === player) ||
            (board[2] === player && board[5] === player && board[8] === player) ||
            (board[0] === player && board[4] === player && board[8] === player) ||
            (board[2] === player && board[4] === player && board[6] === player)
        ) {
            return true;
        } else {
            return null;
        }
    }

    copyBoard(board){
        return board.slice(0);
    }

    validMove(move,player,board){
        var newBoard = this.copyBoard(board);
        if(newBoard[move] === ' '){
            newBoard[move] = player;
            return newBoard;
        }else {
            return null;
        }
    }

    findAiMove(board) {
        var bestMoveScore = 100;
        var move = null;

        //test all possible move if game is not over
        if (this.winner(board, 'x') || this.winner(board, 'o') || this.tie(board)) {
            return null;
        }
        for(var i = 0 ; i < board.length ; i++){
            var newBoard = this.validMove(i, this.state.minPlayer,board);
                if(newBoard){
                    var moveScore =this.maxScore(newBoard);
                    if(moveScore < bestMoveScore){
                        bestMoveScore = moveScore;
                        move = i;
                    }
                }
        }
        return move;
    }

    minScore(board){
        if(this.winner(board,'x')){
            return 10;
        }else if(this.winner(board, 'o')){
            return -10;
        }else if(this.tie(board)){
            return 0;
        } else {
            var bestMoveScore = 100;
            for(var i=0 ; i < board.length ; i++){
                var newBoard = this.validMove(i, this.state.minPlayer, board);
                if(newBoard){
                    var predictedMoveScore =this.maxScore(newBoard);
                    if(predictedMoveScore < bestMoveScore){
                        bestMoveScore = predictedMoveScore;

                    }
                }
            }
        }
        return bestMoveScore;
    }


    maxScore(board){
        if(this.winner(board,'x')){
            return 10;
        }else if(this.winner(board, 'o')){
            return -10;
        }else if(this.tie(board)){
            return 0;
        } else {
            var bestMoveScore = -100;
            for(var i=0 ; i < board.length ; i++){
                var newBoard = this.validMove(i, this.state.maxPlayer, board);
                if(newBoard){
                    var predictedMoveScore =this.minScore(newBoard);
                    if(predictedMoveScore > bestMoveScore){
                        bestMoveScore = predictedMoveScore;

                    }
                }
            }
        }
        return bestMoveScore;
    }


    gameLoop(move){
        var player = this.state.turn;
        var currentGameBoard = this.validMove(move,player,this.state.gameBoard);
        if(this.winner(currentGameBoard,player)){
          this.setState({
              gameBoard : currentGameBoard,
              winner: player,
          });
            return;
        }
        if(this.tie(currentGameBoard)){
            this.setState({
                gameBoard : currentGameBoard,
                winner: 'd',
            });
            return;
        }
        player = 'o';
        currentGameBoard = this.validMove(this.findAiMove(currentGameBoard),player, currentGameBoard);
        if(this.winner(currentGameBoard,player)){
            this.setState({
                gameBoard : currentGameBoard,
                winner: player,
            });
            return;
        }
        if(this.tie(currentGameBoard)){
            this.setState({
                gameBoard : currentGameBoard,
                winner: 'd',
            });
            return;
        }
        this.setState({
            gameBoard : currentGameBoard
        });
    }
    render(){
        return (
            <div className="container">
                <div className="menu">
                    <h1 className="pink">Tic Tac Toe</h1>
                    <Announcement winner={this.state.winner} />
                    <ResetButton reset={this.resetBoard.bind(this)}/>
                </div>
                {this.state.gameBoard.map(function(value, i){
                    return (
                        <Tile
                            key={i}
                            loc={i}
                            value={value}
                            gameLoop = {this.gameLoop.bind(this)} />
                    );
                }.bind(this))}
            </div>
        );
    }
}

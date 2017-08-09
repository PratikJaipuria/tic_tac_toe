import React, { Component } from 'react';
import logo from './logo.svg'
import './App.css';

import Tile from "./Tile.js";
import ResetButton from "./ResetButton.js";
import Announcement from "./Announcement.js";

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

    copyBoard




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
                            updateBoard={this.updateBoard.bind(this)}
                            turn={this.state.turn} />
                    );
                }.bind(this))}
            </div>
        );
    }
}

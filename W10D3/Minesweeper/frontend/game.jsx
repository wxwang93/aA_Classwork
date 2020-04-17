import React from "react";
import * as MineSweeper from "../minesweeper.js";
import Board from "./board"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new MineSweeper.Board(10, 20)
    }
    this.updateGame = this.updateGame.bind(this)
  }

  updateGame(tile,flagging) {
    flagging ? tile.toggleFlag() : tile.explore();
    this.setState({ board: this.state.board }); 
  }

  render() {
    return(
        <Board updateGame = {this.updateGame} board = {this.state.board}/>
    )
  }

}

export default Game;
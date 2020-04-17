import React from "react";
import Tile from "./tile.jsx"
class Board extends React.Component {
    render() {
        return(
            <div className='board'>
                {
                    this.props.board.grid.map( (row,idx1) =>{
                        return (
                            <div key = {idx1} className = 'row'>{row.map( (t,idx2) =>{
                            return (
                                <Tile key = {[idx1,idx2]} updateGame = {this.props.updateGame} tile = {t}/>
                              )
                            })}</div>
                        )
                      })
                }
            </div>
        )
    }
}

export default Board;
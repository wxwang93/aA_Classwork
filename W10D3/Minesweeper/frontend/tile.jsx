import React from "react";
const bomb = '\uD83D\uDCA3';
const flag = '\u26F3';
class Tile extends React.Component {
  
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e){
        e.preventDefault();
        e.type === "click" ? this.props.updateGame(this.props.tile,false) : this.props.updateGame(this.props.tile,true);
    }
    render() {
        return (
            <div className={this.props.tile.explored ? 'clicked tile' : 'tile'} onClick={this.handleClick} 
            onContextMenu={this.handleClick}>
                {this.props.tile.bombed && this.props.tile.explored ? bomb : null}
                {this.props.tile.explored && this.props.tile.bombed === false ? this.props.tile.adjacentBombCount() : null}
                {this.props.tile.flagged && this.props.tile.explored === false ? flag : null}
            </div>
        )
    }
}

export default Tile;
require_relative "board.rb"

class Piece
  
  attr_reader :board, :pos

  def initialize(color, board, pos)
    @color = color
    @board = board
    @pos = pos
  end

  def empty?
    board.valid_position?(pos)
  end

  def moves
    moves_arr = []
    # shovel subclass possible moves into moves_arr
  end


end
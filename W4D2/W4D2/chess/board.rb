require_relative 'piece.rb'

class Board

  def initialize
    @board = Array.new(8) {Array.new(8)}
    @board.each_with_index do |row, row_idx|
      row.each_with_index do |col, col_idx|
        @board[row_idx][col_idx] = Piece.new if row_idx == 0 || row_idx == 6 || row_idx == 1 || row_idx == 7
      end
    end
  end

  def move_piece(start_pos, end_pos)

    raise ArgumentError.new "position is out of bounds" unless valid_position?(end_pos)

   if self[start_pos] == nil
      raise ArgumentError.new "no piece at starting position" 
   else
      self[end_pos] = self[start_pos]
      self[start_pos] = nil
   end
    
  end

  def valid_position?(pos)
    row = pos[0]
    col = pos[1]
    return false if row < 0 || row > 7 || col < 0 || col > 7
    true
  end

  def [](pos)
    row, col = pos
    @board[row][col]
  end

  def []=(pos, value)
    row, col = pos
    @board[row][col] = value
  end
end


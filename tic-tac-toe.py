#!/usr/bin/python3
#############################################################################
#
# MIT License
# 
# Copyright (c) 2016, Michael Becker (michael.f.becker@gmail.com)
# 
# Permission is hereby granted, free of charge, to any person obtaining a 
# copy of this software and associated documentation files (the "Software"),
# to deal in the Software without restriction, including without limitation
# the rights to use, copy, modify, merge, publish, distribute, sublicense, 
# and/or sell copies of the Software, and to permit persons to whom the 
# Software is furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included 
# in all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
# OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
# IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
# CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT 
# OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR 
# THE USE OR OTHER DEALINGS IN THE SOFTWARE.
# 
#############################################################################


num_rows = 3
num_cols = 3

free = 0
x = 1
o = 2

board = [[free for i in range (num_rows)] for j in range (num_cols)]


def print_board():
    
    def print_X_O(i):
        if i == x:
            print(" X", end="")
        elif i == o:
            print(" O", end="")
        else:
            print("  ", end="")
    
    print("")
    for row in range(num_rows):
        for col in range(num_cols):
            print_X_O(board[row][col])
            if col + 1 == num_cols:
                print("")
            else:
                print (" |", end="")
        if row + 1 != num_rows:
            print("---+---+---")
    print("")



print_board();

# Works as C, [row][col]
board[0][0] = o
board[0][1] = o
board[0][2] = o

board[1][0] = x
board[2][0] = x

print_board();


#print (board);

#def strategy_win(player):




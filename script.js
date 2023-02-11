var has_selection = false;
var selected_tile = null;
var red_turn = true;
var turn_team = "R";

function check(tile)
{
	if (has_selection)
	{
		if (selected_tile.alt.slice(0,1) === tile.alt.slice(0,1))
		{
			selected_tile = tile;
			console.log("selection switched");
		}
		else if (move(tile))
		{
			tile.src = selected_tile.src;
			tile.alt = selected_tile.alt;
			selected_tile.src = "";
			selected_tile.alt = "";
			selected_tile = null;
			has_selection = false;
			console.log("moved");
			updateTurn();
		}
	}
	else if (tile.alt.length !== 0)
	{
		if (tile.alt.slice(0,1) == turn_team)
		{
			selected_tile = tile;
			has_selection = true;
			console.log("selected");
		}
	}
	console.log("Clicked on: " + tile.id);
}

function move(tile)
{
	let sel_row = parseInt(selected_tile.id.slice(1,2));
	let sel_col = parseInt(selected_tile.id.slice(3,4));
	let dst_row = parseInt(tile.id.slice(1,2));
	let dst_col = parseInt(tile.id.slice(3,4));
	let type = selected_tile.alt.slice(1,2);
	switch (type)
	{
		// General
		case "A":
			var r_diff = dst_row-sel_row;
			var c_diff = dst_col-sel_col;
			if (((Math.abs(r_diff) == 1) && (Math.abs(c_diff) == 0)) ||
				((Math.abs(r_diff) == 0) && (Math.abs(c_diff) == 1)))
			{
				let team = selected_tile.alt.slice(0,1);
				if (team == "R")
				{
					if ((dst_row > 2) || (dst_col < 3) || (dst_col > 5))
					{
						return false;
					}
				}
				else if (team == "B")
				{
					if ((dst_row < 7) || (dst_col < 3) || (dst_col > 5))
					{
						return false;
					}
				}
			}
			else
			{
				return false;
			}
			break;
		// Car
		case "B":
			if (sel_row == dst_row)
			{
				let diff = dst_col-sel_col;
				if (diff > 0)
				{
					for (let i = sel_col+1; i < dst_col; i++)
					{
						let id = "r"+sel_row+"c"+i;
						let path = document.getElementById(id);
						if (path.alt.length !== 0)
						{
							return false;
						}
					}
				}
				else
				{
					for (let i = sel_col-1; i > dst_col; i--)
					{
						let id = "r"+sel_row+"c"+i;
						let path = document.getElementById(id);
						if (path.alt.length !== 0)
						{
							return false;
						}
					}
				}
			}
			else if (sel_col == dst_col)
			{
				let diff = dst_row-sel_row;
				if (diff > 0)
				{
					for (let i = sel_row+1; i < dst_row; i++)
					{
						let id = "r"+i+"c"+sel_col;
						let path = document.getElementById(id);
						if (path.alt.length !== 0)
						{
							return false;
						}
					}
				}
				else
				{
					for (let i = sel_row-1; i > dst_row; i--)
					{
						let id = "r"+i+"c"+sel_col;
						let path = document.getElementById(id);
						if (path.alt.length !== 0)
						{
							return false;
						}
					}
				}
			}
			else
			{
				return false;
			}
			break;
		// Horse
		case "C":
			var r_diff = dst_row-sel_row;
			var c_diff = dst_col-sel_col;
			if ((r_diff == -2) && (Math.abs(c_diff) == 1))
			{
				let id = "r"+(sel_row-1)+"c"+sel_col;
				let path = document.getElementById(id);
				if (path.alt.length !== 0)
				{
					return false;
				}
			}
			else if ((r_diff == 2) && (Math.abs(c_diff) == 1))
			{
				let id = "r"+(sel_row+1)+"c"+sel_col;
				let path = document.getElementById(id);
				if (path.alt.length !== 0)
				{
					return false;
				}
			}
			else if ((Math.abs(r_diff) == 1) && (c_diff == -2))
			{
				let id = "r"+sel_row+"c"+(sel_col-1);
				let path = document.getElementById(id);
				if (path.alt.length !== 0)
				{
					return false;
				}
			}
			else if ((Math.abs(r_diff) == 1) && (c_diff == 2))
			{
				let id = "r"+sel_row+"c"+(sel_col+1);
				let path = document.getElementById(id);
				if (path.alt.length !== 0)
				{
					return false;
				}
			}
			else
			{
				return false;
			}
			break;
		// Cannon
		case "D":
			let path_count = 0;
			if (sel_row == dst_row)
			{
				let diff = dst_col-sel_col;
				if (diff > 0)
				{
					for (let i = sel_col+1; i < dst_col; i++)
					{
						let id = "r"+sel_row+"c"+i;
						let path = document.getElementById(id);
						if (path.alt.length !== 0)
						{
							path_count++;
						}
					}
				}
				else
				{
					for (let i = sel_col-1; i > dst_col; i--)
					{
						let id = "r"+sel_row+"c"+i;
						let path = document.getElementById(id);
						if (path.alt.length !== 0)
						{
							path_count++;
						}
					}
				}
			}
			else if (sel_col == dst_col)
			{
				let diff = dst_row-sel_row;
				if (diff > 0)
				{
					for (let i = sel_row+1; i < dst_row; i++)
					{
						let id = "r"+i+"c"+sel_col;
						let path = document.getElementById(id);
						if (path.alt.length !== 0)
						{
							path_count++;
						}
					}
				}
				else
				{
					for (let i = sel_row-1; i > dst_row; i--)
					{
						let id = "r"+i+"c"+sel_col;
						let path = document.getElementById(id);
						if (path.alt.length !== 0)
						{
							path_count++;
						}
					}
				}
			}
			else
			{
				return false;
			}
			
			if (tile.alt.length == 0)
			{
				if (path_count !== 0)
				{
					return false;
				}
			}
			else if (path_count !== 1)
			{
				return false;
			}
			break;
		// Guard
		case "E":
			var r_diff = dst_row-sel_row;
			var c_diff = dst_col-sel_col;
			if ((Math.abs(r_diff) == 1) && (Math.abs(c_diff) == 1))
			{
				let team = selected_tile.alt.slice(0,1);
				if ((team == "R") && 
					((dst_row > 2) || (dst_col < 3) || (dst_col > 5)))
				{
					return false;
				}
				else if ((team == "B") && 
					((dst_row < 7) || (dst_col < 3) || (dst_col > 5)))
				{
					return false;
				}
			}
			else
			{
				return false;
			}
			break;
		// Elephant
		case "F":
			var r_diff = dst_row-sel_row;
			var c_diff = dst_col-sel_col;
			if ((Math.abs(r_diff) == 2) && (Math.abs(c_diff) == 2))
			{
				let team = selected_tile.alt.slice(0,1);
				if ((team == "R") && (dst_row > 4))
				{
					return false;
				}
				else if ((team == "B") && (dst_row < 5))
				{
					return false;
				}
			}
			else
			{
				return false;
			}
			break;
		// Pawn
		case "G":
			var r_diff = dst_row-sel_row;
			var c_diff = dst_col-sel_col;
			if (((Math.abs(r_diff) == 1) && (Math.abs(c_diff) == 0)) ||
				((Math.abs(r_diff) == 0) && (Math.abs(c_diff) == 1)))
			{
				let team = selected_tile.alt.slice(0,1);
				if (team == "R")
				{
					if ((r_diff == -1) ||
						((sel_row < 5) && (Math.abs(c_diff) == 1)))
					{
						return false;
					}
				}
				else if (team == "B")
				{
					if ((r_diff == 1) ||
						((sel_row > 4) && (Math.abs(c_diff) == 1)))
					{
						return false;
					}
				}
			}
			else
			{
				return false;
			}
			break;
	}
	return true;
}

function updateTurn()
{
	if (red_turn)
	{
		red_turn = false;
		turn_team = "B";
	}
	else
	{
		red_turn = true;
		turn_team = "R";
	}
	console.log("Team "+turn_team+"'s turn");
}
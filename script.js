var has_selection = false;
var selected_tile = null;

function move(tileID) {
	let tile = document.getElementById(tileID);
	if (has_selection == true)
	{
		tile.src = selected_tile.src;
		tile.alt = "FLAG";
		selected_tile.src = "";
		selected_tile.alt = "";
		selected_tile = null;
		has_selection = false;
		console.log("moved");
	}
	else
	{
		if (tile.alt.length !== 0)
		{
			selected_tile = tile;
			has_selection = true;
			console.log("selected");
		}
	}
	console.log("Clicked on: " + tile.id);
}
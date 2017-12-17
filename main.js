

function Main()
{
	var debug = true; // debug mode prints to footer when an event occurs.
	
	if(debug)
		$("footer").append("Started Main fuction.</br>");
	
	var version = "1.0";
	$("#version").text("v" + version);
		
	$("#active").append(	// where active is setup
		'<input type="text" id="filterText" onClick="this.select();" value="Tinyfin" label="search filter by text in a card">' +
		'<button id="filterButton">Filter</button></br>' +
		'<div id="filteredCards">' +
			'<div id="selectedCard">' +
			'</div>' +
		'</div>'
	);
	
	$.ajax({url: "http://hearthstoneapi.com/cards#"})	// where filtered cards are displayed
		.done(function(data)
		{
			
			$("#filteredCards").text(
				''
				);
		});
	this.start = function()
	{
		if(debug)
			$("footer").append("Started this.start function.</br>");
		
		
			
		if(debug)
			$("footer").append("Finished this.start function.</br>");
	}
	
	if(debug)
		$("footer").append("Finished Main fuction.</br>");
}

$(function() {
	window.main = new Main();
	window.main.start();
});


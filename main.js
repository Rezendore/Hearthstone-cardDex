var golden = false;	// decides display type.
var debug = true; // debug mode prints to footer when an event occurs.
var searchType = "search"; // Search type determines what happens when filter is clicked.

function Main()
{
	if(debug)		// pre and post statement for each major event.
		$("footer").append("Started Main function.</br>");
	
	var version = "1.0";
	$("#version").text("v" + version);
		
	$("#active").append(	// where active is setup
		'<div id="filters" syle="width:100%;">' +
			'<button id="name">Name</button>' +
			'<button id="race">Race</button>' +
			'<button id="cardSet">Card Set</button>' +
			'<button id="type">Type</button>' +
			'<button id="rarity">Rarity</button>' +
			'<button id="text">Card Text</button>' +
			'<button id="flavor">Flavor Text</button></br>' +
		'</div>' +
		'<input type="text" id="filterText" onClick="this.select();" value="">' +
		'<button id="filterButton">Filter</button></br>' +
		'<div id="selectedCard" style="width:25%; float:left;"></div>' +
		'<div id="filteredCards"></div>'
	);
	
	// button setup
	$("#name").click(function()
	{
		$("#filters :button").css({"background-color":"black", "color":"white"});
		$("#name").css({"background-color":"white", "color":"black"});
		searchType="search";
	});
	$("#race").click(function()
	{
		$("#filters :button").css({"background-color":"black", "color":"white"});
		$("#race").css({"background-color":"white", "color":"black"});
		searchType="races";
	});
	$("#cardSet").click(function()
	{
		$("header").text("Warning: Sets are text sensitive");
		$("#filters :button").css({"background-color":"black", "color":"white"});
		$("#cardSet").css({"background-color":"white", "color":"black"});
		searchType="sets";
	});
	$("#type").click(function()
	{
		$("#filters :button").css({"background-color":"black", "color":"white"});
		$("#type").css({"background-color":"white", "color":"black"});
		searchType="types";
	});
	$("#rarity").click(function()
	{
		$("#filters :button").css({"background-color":"black", "color":"white"});
		$("#rarity").css({"background-color":"white", "color":"black"});
		searchType="qualities";
	});
	
	/*$("#text").click(function()			TO BE WORKED ON LATER
	{
		$("#filters :button").css({"background-color":"black", "color":"white"});
		$("#text").css({"background-color":"white", "color":"black"});
		searchType="text";
	});
	$("#flavor").click(function()
	{
		$("#filters :button").css({"background-color":"black", "color":"white"});
		$("#flavor").css({"background-color":"white", "color":"black"});
		searchType="flavor";
	});*/
	
	$("#filterButton").click(function()
	{
		$("header").empty();
		updateFilter(searchType, $("#filterText").val());
	});
	// end of button setup
	
	this.start = function()
	{
		if(debug)
			$("footer").append("Started this.start function.</br>");
		
		updateFilter($("#filterText").val());
			
		if(debug)
			$("footer").append("Finished this.start function.</br>");
	}
	
	if(debug)
		$("footer").append("Finished Main function.</br>");
}
	// updates the filtered card box to show different cards based on input
function updateFilter(type, sort)
{
	if(debug)
		$("footer").append("Started updateFilter function.</br>");
	
	$("#filteredCards").empty();
	
	$.ajax(
	{	// where the base url is set
		url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/" + type + "/" + capitalizeFirstLetter(sort),
		data: {},
		datatype: 'json',
				// where the auth key is input
		beforeSend: function(xhr) { xhr.setRequestHeader("X-Mashape-Authorization", "5hucBet0ZdmshwTt0YD2miD6CWlWp1Hhe49jsn6XACAfef8bb6"); }
	})
	.done(function(data)
	{
		
		for(i=0, c=0, l=data.length; i<l; i++, c++)
		{
			var img=data[i].img;
			var type=data[i].type.toString();
			var cardSet=data[i].cardSet.toString();
			var flavor=data[i].flavor;
				// Before display requirements 
			if(flavor==(undefined))
			{
				c--; // c is defined in the for loop, tracks  the list count.
			} else {
				if(golden) {
					$("#filteredCards").append(
						'<li id="' + c
						+ '"> <img src="' + data[i].imgGold
						+ '" id="' + data[i].cardId 
						+ '" alt=""></li>');
					img=data[i].imgGold;
				} else {
					$("#filteredCards").append(
						'<li id="' + c
						+ '"> <img src="' + data[i].img 
						+ '" id="' + data[i].cardId 
						+ '" alt=""></li');
					img=data[i].img;
				}
						// defines the hover functionality when the cards are created
				$("#"+data[i].cardId.toString()).hover(function(data)
				{
					$("#selectedCard").css({"min-width":"120px","min-height":"160px"});
					$("#selectedCard").empty();
					$("#selectedCard").append(
						'<img src="' + this.src
						+ '" style="width:100%; height:100%'
						+ '" alt="">');
				});
			}
		}
	});
	
	if(debug)
		$("footer").append("Finished updateFilter function.</br>");
}


		// generic text adjustments
function capitalizeFirstLetter(string) {
	if(string!=(undefined))
		return string.charAt(0).toUpperCase() + string.slice(1);
	else
		return null;
}

$(function() {
	window.main = new Main();
	window.main.start();
});


var golden = false;	// decides display type
var debug = true; // debug mode prints to footer when an event occurs.

function Main()
{
	if(debug)
		$("footer").append("Started Main function.</br>");
	
	var version = "1.0";
	$("#version").text("v" + version);
		
	$("#active").append(	// where active is setup
		'<input type="text" id="filterText" onClick="this.select();" value="" label="search filter by text in a card">' +
		'<button id="filterButton">Filter</button></br>' +
		'<div id="selectedCard" style="width:25%; float:left;"></div>' +
		'<div id="filteredCards"></div>'
	);
	
	$("#filterButton").click(function()
	{
		cardsByName($("#filterText").val());
	});
	
	this.start = function()
	{
		if(debug)
			$("footer").append("Started this.start function.</br>");
		
		cardsByName($("#filterText").val());
			
		if(debug)
			$("footer").append("Finished this.start function.</br>");
	}
	
	if(debug)
		$("footer").append("Finished Main function.</br>");
}

function cardsByName(sort)
{
	if(debug)
		$("footer").append("Started cardsByName function.</br>");
	
	$("#filteredCards").empty();
	
	$.ajax(
	{	// where the base url is set
		url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/" + sort,
		data: {},
		datatype: 'json',
				// where the auth key is input
		beforeSend: function(xhr) { xhr.setRequestHeader("X-Mashape-Authorization", "5hucBet0ZdmshwTt0YD2miD6CWlWp1Hhe49jsn6XACAfef8bb6"); }
	})
	.done(function(data)
	{
		
		for(i=0, l=data.length; i<l; i++)
		{
			var img=data[i].img;
			var type=data[i].type.toString();
			var cardSet=data[i].cardSet.toString();
			var flavor=data[i].flavor;
				// Before display requirements 
			if(flavor==(undefined))
			{
			} else {
				if(golden) {
					$("#filteredCards").append(
						'<li id="' + i
						+ '"> <img src="' + data[i].imgGold
						+ '" id="' + data[i].cardId 
						+ '" alt=""></li>');
					img=data[i].imgGold;
				} else {
					$("#filteredCards").append(
						'<li id="' + i
						+ '"> <img src="' + data[i].img 
						+ '" id="' + data[i].cardId 
						+ '" alt=""></li');
					img=data[i].img;
				}
				
				$("#"+data[i].cardId.toString()).hover(function(data)
				{
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
		$("footer").append("Finished cardsByName function.</br>");
}

function cardsByType(sort)
{
	if(debug)
		$("footer").append("Started cardsByType function.</br>");
	
	$("#filteredCards").empty();
	$.ajax(
	{	// where the base url is set
		url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/types/" + sort,
		data: {},
		datatype: 'json',
				// where the auth key is input
		beforeSend: function(xhr) { xhr.setRequestHeader("X-Mashape-Authorization", "5hucBet0ZdmshwTt0YD2miD6CWlWp1Hhe49jsn6XACAfef8bb6"); }
	})
	.done(function(data)
	{
		var img;
		for(i=0, l=data.length; i<l; i++)
		{
			if(golden) {
				$("#filteredCards").append(
					'<img src="' + data[i].imgGold
					+ '" id="' + data[i].cardId 
					+ '" alt="">');
				img=data[i].imgGold;
			} else {
				$("#filteredCards").append(
					'<img src="' + data[i].img 
					+ '" id="' + data[i].cardId 
					+ '" alt="">');
				img=data[i].img;
			}
			
			$("#"+data[i].cardId.toString()).hover(function(data)
			{
				$("#selectedCard").empty();
				$("#selectedCard").append(
					'<img src="' + this.src
					+ '" style="height:360px'
					+ '" alt="">');
			});
		}
		
	});
	
	if(debug)
		$("footer").append("Finished cardsByType function.</br>");
}

$(function() {
	window.main = new Main();
	window.main.start();
});


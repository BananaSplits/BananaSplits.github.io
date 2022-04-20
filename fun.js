window.onload = function main()
{
	/* Initialize all the diamonds */
	var diamonds = document.getElementsByClassName("inactive");
	for (var i = diamonds.length - 1; i >= 0; i--)
	{
		diamonds[i].setAttribute("onclick", "Zoom('"+ diamonds[i].id +"','"+ diamonds[i].classList.item(1) +"', '"+ diamonds[i].classList.item(2) +"', '"+ diamonds[i].classList.item(3) +"');");
	}
	
	var subs = document.getElementsByClassName("sub0");
	for (var i = subs.length - 1; i >= 0; i--)
	{
		subs[i].classList.replace("inactive", "sub-active")
	}
 
	var root = document.getElementById("root"); root.classList.replace("sub-active", "active"); root.style.visibility = "visible";
	var outlineRoot = document.getElementById("outline-root"); outlineRoot.classList.replace("sub-active", "active"); outlineRoot.style.visibility = "visible";
	root.style.pointerEvents = "all";

	/* global var for Zoom */
	onLoad = true;
	/* global var for Dezoom */
	ican = true;
}

function Zoom(clickedId, upperClass, currentClass, subsClass)
{
	ican = false;
	if (onLoad)
	{
		/* first click, just shows subs of root and hides h1 */
		var subs = document.getElementsByClassName("sub-active");
		for (var i = subs.length - 1; i >= 0; i--)
		{
			subs[i].style.visibility = "visible";
			subs[i].style.pointerEvents = "none";
		}
		setTimeout(function()
		{

			for (var i = subs.length - 1; i >= 0; i--)
			{
				subs[i].style.pointerEvents = "all";
			}

		}.bind(subs), 750);

		/* animations pop */
		/*ican = false;
		setTimeout(function(){ican=true;}, 750);*/

		subs[0].classList.replace("none", "outline-popAnime-right-Class"); setTimeout(function(){
		subs[0].classList.replace("outline-popAnime-right-Class", "none");}.bind(subs), 500);
		subs[1].classList.replace("none", "popAnime-right-Class"); setTimeout(function(){
		subs[1].classList.replace("popAnime-right-Class", "none");}.bind(subs), 750);

		subs[2].classList.replace("none", "outline-popAnime-top-Class"); setTimeout(function(){
		subs[2].classList.replace("outline-popAnime-top-Class", "none");}.bind(subs), 500);
		subs[3].classList.replace("none", "popAnime-top-Class"); setTimeout(function(){
		subs[3].classList.replace("popAnime-top-Class", "none");}.bind(subs), 750);

		subs[4].classList.replace("none", "outline-popAnime-left-Class"); setTimeout(function(){
		subs[4].classList.replace("outline-popAnime-left-Class", "none");}.bind(subs), 500);
		subs[5].classList.replace("none", "popAnime-left-Class"); setTimeout(function(){
		subs[5].classList.replace("popAnime-left-Class", "none");}.bind(subs), 750);

		subs[6].classList.replace("none", "outline-popAnime-down-Class"); setTimeout(function(){
		subs[6].classList.replace("outline-popAnime-down-Class", "none");}.bind(subs), 500);
		subs[7].classList.replace("none", "popAnime-down-Class"); setTimeout(function(){
		subs[7].classList.replace("popAnime-down-Class", "none");}.bind(subs), 750);
		/*                */

		document.getElementById("h1").style.visibility = "hidden";
		document.getElementById("root").style.pointerEvents = "none";
		onLoad = false;
		ican = true;
		return;
	}

	var upper = document.getElementsByClassName(upperClass);
	for (var i = upper.length - 1; i >= 0; i--)
	{
		if (upper[i].id != "root" && upper[i].id != "outline-root")
		{
			upper[i].style.visibility = "hidden";
		}
		upper[i].classList.replace("active", "inactive");
	}

	var current = document.getElementsByClassName(currentClass);
	for (var i = current.length - 1; i >= 0; i--)
	{
		if (current[i].id != "root" && current[i].id != "outline-root")
		{
			current[i].style.visibility = "hidden";
		}
		current[i].classList.replace("sub-active", "inactive");
	}

	var clicked = document.getElementById(clickedId);
	var outlineClicked = document.getElementById("outline-"+clickedId);

	if (clicked.classList.item(3) == "null")
	{
		document.getElementById("root").style.visibility = "hidden";
		document.getElementById("outline-root").style.visibility = "hidden";
	}

	if (subsClass == "null")
	{
		/* lowest zoom */
		clicked.classList.replace("inactive", "active"); clicked.style.visibility = "visible";
		outlineClicked.classList.replace("inactive", "active"); outlineClicked.style.visibility = "visible";

		var currActive = document.getElementsByClassName("active")[0];

		currActive.classList.replace("none", "fadeOut-Class"); setTimeout(function(){
		currActive.classList.replace("fadeOut-Class", "none");}.bind(currActive), 750);
		currActive.classList.replace("none", "outline-fadeOut-Class"); setTimeout(function(){
		currActive.classList.replace("outline-fadeOut-Class", "none");}.bind(currActive), 750);

		/* animations to active */


		if (clicked.classList.item(4) == "right")
		{
			outlineClicked.classList.replace("none", "outline-null-right-Class"); setTimeout(function(){
			outlineClicked.classList.replace("outline-null-right-Class", "none");}, 750);
			clicked.classList.replace("none", "null-right-Class"); setTimeout(function(){
			clicked.classList.replace("null-right-Class", "none");}, 750);
		}
		if (clicked.classList.item(4) == "top")
		{
			outlineClicked.classList.replace("none", "outline-top-to-active-Class"); setTimeout(function(){
			outlineClicked.classList.replace("outline-top-to-active-Class", "none");}, 750);
			clicked.classList.replace("none", "top-to-active-Class"); setTimeout(function(){
			clicked.classList.replace("top-to-active-Class", "none");}, 750);
		}
		if (clicked.classList.item(4) == "left")
		{
			outlineClicked.classList.replace("none", "outline-left-to-active-Class"); setTimeout(function(){
			outlineClicked.classList.replace("outline-left-to-active-Class", "none");}, 750);
			clicked.classList.replace("none", "left-to-active-Class"); setTimeout(function(){
			clicked.classList.replace("left-to-active-Class", "none");}, 750);
		}
		if (clicked.classList.item(4) == "down")
		{
			outlineClicked.classList.replace("none", "outline-down-to-active-Class"); setTimeout(function(){
			outlineClicked.classList.replace("outline-down-to-active-Class", "none");}, 750);
			clicked.classList.replace("none", "down-to-active-Class"); setTimeout(function(){
			clicked.classList.replace("down-to-active-Class", "none");}, 750);
		}

		/*                      */
	}
	else
	{
		/* intermediate zoom */
		var subs = document.getElementsByClassName(subsClass);
		for (var i = subs.length - 1; i >= 0; i--)
		{
			subs[i].style.visibility = "visible";
			subs[i].classList.replace("inactive", "sub-active");
			subs[i].style.pointerEvents = "none";
		}
		setTimeout(function()
		{

			for (var i = subs.length - 1; i >= 0; i--)
			{
				subs[i].style.pointerEvents = "all";
			}

		}.bind(subs), 750);

		clicked.classList.replace("sub-active", "active");
		outlineClicked.classList.replace("sub-active", "active");

		/* animations to active */
		/*ican = false;
		setTimeout(function(){ican=true;}, 750);*/

		document.getElementById("root").classList.replace("none", "fadeOut-Class"); setTimeout(function(){
		document.getElementById("root").classList.replace("fadeOut-Class", "none");}, 750);
		document.getElementById("outline-root").classList.replace("none", "outline-fadeOut-Class"); setTimeout(function(){
		document.getElementById("outline-root").classList.replace("outline-fadeOut-Class", "none");}, 750);

		if (clicked.classList.item(4) != "right")
		{
			subs[0].classList.replace("none", "outline-popAnime-right-Class"); setTimeout(function(){
			subs[0].classList.replace("outline-popAnime-right-Class", "none");}.bind(subs), 500);
			subs[1].classList.replace("none", "popAnime-right-Class"); setTimeout(function(){
			subs[1].classList.replace("popAnime-right-Class", "none");}.bind(subs), 750);
		}
		else
		{
			subs[0].classList.replace("none", "outline-right-to-active-Class"); setTimeout(function(){
			subs[0].classList.replace("outline-right-to-active-Class", "none");}.bind(subs), 500);
			subs[1].classList.replace("none", "right-to-active-Class"); setTimeout(function(){
			subs[1].classList.replace("right-to-active-Class", "none");}.bind(subs), 750);
		}
		
		if (clicked.classList.item(4) != "top")
		{
			subs[2].classList.replace("none", "outline-popAnime-top-Class"); setTimeout(function(){
			subs[2].classList.replace("outline-popAnime-top-Class", "none");}.bind(subs), 500);
			subs[3].classList.replace("none", "popAnime-top-Class"); setTimeout(function(){
			subs[3].classList.replace("popAnime-top-Class", "none");}.bind(subs), 750);
		}
		else
		{
			subs[2].classList.replace("none", "outline-top-to-active-Class"); setTimeout(function(){
			subs[2].classList.replace("outline-top-to-active-Class", "none");}.bind(subs), 500);
			subs[3].classList.replace("none", "top-to-active-Class"); setTimeout(function(){
			subs[3].classList.replace("top-to-active-Class", "none");}.bind(subs), 750);
		}
		if (clicked.classList.item(4) != "left")
		{
			subs[4].classList.replace("none", "outline-popAnime-left-Class"); setTimeout(function(){
			subs[4].classList.replace("outline-popAnime-left-Class", "none");}.bind(subs), 500);
			subs[5].classList.replace("none", "popAnime-left-Class"); setTimeout(function(){
			subs[5].classList.replace("popAnime-left-Class", "none");}.bind(subs), 750);
		}
		else
		{
			subs[4].classList.replace("none", "outline-left-to-active-Class"); setTimeout(function(){
			subs[4].classList.replace("outline-left-to-active-Class", "none");}.bind(subs), 500);
			subs[5].classList.replace("none", "left-to-active-Class"); setTimeout(function(){
			subs[5].classList.replace("left-to-active-Class", "none");}.bind(subs), 750);
		}
		if (clicked.classList.item(4) != "down")
		{
			subs[6].classList.replace("none", "outline-popAnime-down-Class"); setTimeout(function(){
			subs[6].classList.replace("outline-popAnime-down-Class", "none");}.bind(subs), 750);
			subs[7].classList.replace("none", "popAnime-down-Class"); setTimeout(function(){
			subs[7].classList.replace("popAnime-down-Class", "none");}.bind(subs), 750);
		}
		else
		{
			subs[6].classList.replace("none", "outline-down-to-active-Class"); setTimeout(function(){
			subs[6].classList.replace("outline-down-to-active-Class", "none");}.bind(subs), 500);
			subs[7].classList.replace("none", "down-to-active-Class"); setTimeout(function(){
			subs[7].classList.replace("down-to-active-Class", "none");}.bind(subs), 750);
		}
		
		/*                      */
	}
	ican = true;
}

function Dezoom()
{
	var activeCount = document.getElementsByClassName("active").length;
	var subActiveCount = document.getElementsByClassName("sub-active").length;
	if (activeCount == 2 && subActiveCount == 8)
	{
		/* highest Dezoom, just hides subs of root and shows back h1 */
		var subs = document.getElementsByClassName("sub-active");
		for (var i = subs.length - 1; i >= 0; i--)
		{
			subs[i].style.visibility = "hidden";
		}
		document.getElementById("h1").style.visibility = "visible";
		document.getElementById("root").style.pointerEvents = "all";
		onLoad = true;
		return true;
	}
	else if (activeCount == 2 && subActiveCount == 0)
	{
		/* lowest Dezoom */
		var bros = document.getElementsByClassName(document.getElementsByClassName("active")[1].classList.item(2));
		for (var i = bros.length - 1; i >= 0; i--)
		{
			bros[i].classList.replace("active", "sub-active");
			bros[i].classList.replace("inactive", "sub-active");
			bros[i].style.visibility = "visible";
		}
		for (var i = 0; i < 2; i++)
		{
			bros[i].classList.replace("sub-active", "active");
		}
		 
	}
	else
	{
		/* intermediate Dezoom */
		var bros = document.getElementsByClassName( document.getElementsByClassName("active")[1].classList.item(3) );
		for (var i = bros.length - 1; i >= 0; i--)
		{
			bros[i].classList.replace("sub-active", "inactive");
			bros[i].style.visibility = "hidden";
			/*bros[i].style.pointerEvents = "none";*/
		}
		var subs = document.getElementsByClassName("sub0");
		for (var i = subs.length - 1; i >= 0; i--)
		{
			subs[i].classList.replace("inactive", "sub-active");
			subs[i].classList.replace("active", "sub-active");
			subs[i].style.visibility = "visible";
			/*subs[i].style.pointerEvents = "all";*/
		}
		
		var root = document.getElementById("root"); root.classList.replace("sub-active", "active"); root.style.visibility = "visible";
		var outlineRoot = document.getElementById("outline-root"); outlineRoot.classList.replace("sub-active", "active"); outlineRoot.style.visibility = "visible";

	}
	setTimeout(function(){ican = true;}, 750);
}

document.addEventListener("wheel", function(e)
{
    if (e.deltaY > 0 && ican && document.getElementsByClassName("none").length == 34)
	{
		ican = false;
		Dezoom();
	}
});
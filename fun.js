window.onload = function main()
{
	var diamonds = document.getElementsByClassName("diamonds");
	for (var i = diamonds.length - 1; i >= 0; i--)
	{
		diamonds[i].style.visibility = "hidden"; 
		diamonds[i].setAttribute("onclick", "event.stopPropagation(); Zoom(\""+diamonds[i].id+"\");");
	}

	document.getElementById("root").style.visibility = "visible";

	ican = true;
	/*window.requestAnimationFrame(onloadanimation);*/
}



function sleep(milliseconds)
{
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}
/*
function onloadanimation()
{
	console.log("yes");
	let root = document.documentElement;

	sleep(500);
	console.log("yes");
	root.style.setProperty('--active-d-scale', 0.5);
	sleep(500);
	console.log("yes");
	root.style.setProperty('--active-d-scale', 1);
}*/

function Zoom(clickedId)
{
	var clicked = document.getElementById(clickedId);
	
	//frr de clicked (sub-active -> inactive)

	var clickedBrothers = document.getElementsByClassName(clicked.classList.item(2));
	for (var i = clickedBrothers.length - 1; i >= 0; i--)
	{
		clickedBrothers[i].classList.replace("sub-active", "inactive");
		if (clicked.classList.item(3) != "null" && clickedBrothers[i].id != "root")
		{
			clickedBrothers[i].style.visibility = "hidden";
		}
		
	}

	if (clicked.id != "root")
	{
		clicked.classList.replace("inactive", "transition");
		setTimeout(function(){clicked.classList.replace("transition", "active");}, 500);
		clicked.style.visibility = "visible";
	}
	else
	{
		clicked.classList.replace("inactive", "active");
		clicked.style.visibility = "visible";
	}

	//active -> inactive

	var oldActive = document.getElementById(clicked.classList.item(1));
	if (clicked.id != "root")
	{
		oldActive.classList.replace("active", "transition");
		setTimeout(function(){oldActive.classList.replace("transition", "inactive");}, 500);
	}


	//subActives de clicked (inactive -> sub-active)

	subActivesClassName = clicked.classList.item(3);
	if (subActivesClassName != "null")
	{
		var subActives = document.getElementsByClassName(subActivesClassName);
		for (var i = subActives.length - 1; i >= 0; i--)
		{
			subActives[i].classList.replace("inactive", "sub-active");
			
			if (subActives[i].classList.item(3) != clicked.classList.item(3))
			{

				subActives[i].style.visibility = "visible";
			}

			if (clicked.classList.item(4) == subActives[i].classList.item(4) && clicked.classList.item(0) != "active" && clicked.classList.item(0) != "transition")
			{
				subActives[i].style.visibility = "hidden";
			}
			//sub-active root main-subs main-sub1-subs Left diamonds
			//sub-active main-sub1 main-sub1-subs null Left diamonds
		}
	}
}

function Dezoom(active)
{
	if (active != undefined)
	{
		//subActives (sub-active -> inactive)
		subActives = document.getElementsByClassName(active.classList.item(3));
		for (var i = subActives.length - 1; i >= 0; i--)
		{
			subActives[i].classList.replace("sub-active", "inactive");
			subActives[i].style.visibility = "hidden";
		}

		//frr de active (inactive -> sub-active)
		
		var activeBrothers = document.getElementsByClassName(active.classList.item(2));
		for (var i = activeBrothers.length - 1; i >= 0; i--)
		{
			activeBrothers[i].classList.replace("inactive", "sub-active");
			activeBrothers[i].style.visibility = "visible";
		}
		active.classList.replace("active", "sub-active");
		

		//father de active (sub-active -> active)

		var activeFather = document.getElementById(active.classList.item(1));
		if (activeFather != null)
		{
			activeFather.classList.replace("sub-active", "active");
			activeFather.style.visibility = "visible";
		}
		else
		{
			activeFather = active;
		}
	}
	setTimeout(function(){ican=true;}, 600);
	return ican;
}

document.addEventListener("wheel", function(e)
{
    if (e.deltaY > 0 && ican)
	{
		ican = false;
		ican = Dezoom(document.getElementsByClassName("active")[0]);
	}
	
}, false);
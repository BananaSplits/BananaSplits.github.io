window.onload = function main()
{
	var diamonds = document.getElementsByClassName("diamonds");
	for (var i = diamonds.length - 1; i >= 0; i--)
	{
		diamonds[i].style.visibility = "hidden"; 
		diamonds[i].setAttribute("onclick", "event.stopPropagation(); Zoom(\""+diamonds[i].id+"\");");
	}

	document.getElementById("root").style.visibility = "visible";
}

function Zoom(clickedId)
{
	var clicked = document.getElementById(clickedId);
	
	//frr de clicked (sub-active -> inactive)

	var clickedBrothers = document.getElementsByClassName(clicked.classList.item(2));
	for (var i = clickedBrothers.length - 1; i >= 0; i--)
	{
		clickedBrothers[i].classList.replace("sub-active", "inactive");
		clickedBrothers[i].style.visibility = "hidden";
	}

	clicked.classList.replace("inactive", "active");
	clicked.style.visibility = "visible";

	//active -> inactive

	var oldActive = document.getElementById(clicked.classList.item(1));
	if (clicked.id != "root")
	{
		oldActive.classList.replace("active", "inactive");
		oldActive.style.visibility = "hidden";
	}	

	//subActives de clicked (inactive -> sub-active)

	subActivesClassName = clicked.classList.item(3);
	if (subActivesClassName != "null")
	{
		var subActives = document.getElementsByClassName(subActivesClassName);
		for (var i = subActives.length - 1; i >= 0; i--)
		{
			subActives[i].classList.replace("inactive", "sub-active");
			subActives[i].style.visibility = "visible";
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
}

document.addEventListener("wheel", function(e)
{
    if (e.deltaY > 0)
	{
		Dezoom(document.getElementsByClassName("active")[0]);
	}
}, true);
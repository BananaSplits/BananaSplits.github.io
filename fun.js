
/*
classList items of type:
	root, menu, page:
		0: state			
		1: level
		2: emplacement
		3: parentID
		4: childsIDs
		5: outlineID
		6: titleID
		7: contentID
		8: type
		9: transition
		10: on/off

	outline, title, content:
		0: state	
		1: level
		2: emplacement
		3: parent's type
		4: type
		5: on/off
*/

function getChilds(childsIDs)
{
	/* returns list of childs in the form of [child, child's emplacement] */
	/* returns null if getting pages' childs */
	if (childsIDs == "null")
	{
		return null;
	}
	let childs = [];
	for (ID of childsIDs.split(','))
	{
		let child = document.getElementById(ID);
		childs.push([ child, child.classList.item(2) ]);
	}
	return childs;
}

function getBros(clicked, level)
{
	/* returns list of bros of clicked in the form of [bro, bro's emplacement] */
	/* returns null if getting bros of root */
	if (clicked.id == "root")
	{
		return null;
	}
	let bros = [];
	const parentID = clicked.classList.item(3);
	for (bro of document.getElementsByClassName(level))
	{
		if (bro.id != clicked.id && bro.classList.item(3) == parentID)
		{
			bros.push([ bro, bro.classList.item(2) ]);
		}
	}
	return bros;
}

/* runs on load once, page renders after this process ends */
window.onload = function main()
{
	backButton = document.getElementById("back-button");
	/* initialize all outlines and contents classes of every diamond, and adds its onclick event */
	var diamonds = document.getElementsByClassName("diamond");
	for (const diamond of diamonds)
	{
		var cl = diamond.classList;
		var cn = cl.item(0)+" "+cl.item(1)+" "+cl.item(2)+" "+cl.item(8);
		document.getElementById( cl.item(5) ).className = cn+" outline off all";
		document.getElementById( cl.item(6) ).className = cn+" title off all";
		document.getElementById( cl.item(7) ).className = cn+" content off all";
		/* Zoom(clickedID, parentID, childsIDs, level); */
		diamond.setAttribute("onclick", "Zoom('"+ diamond.id +"','"
												+ diamond.classList.item(3) +"', '"
												+ diamond.classList.item(4) +"', '"
												+ diamond.classList.item(1) +"');");
		diamond.addEventListener('transitionstart', function() {
			diamond.classList.replace("off", "on");
			backButton.setAttribute("disabled", "");
			backButton.classList.replace("back-button-on", "back-button-off");
		});
		diamond.addEventListener('transitionend', function() {
			diamond.classList.replace("on", "off");
			backButton.removeAttribute("disabled");
			backButton.classList.replace("back-button-off", "back-button-on");
			/*if (diamond.classList.item(0) == "inactive")
			{
				diamond.style.setProperty("width", 0);
				diamond.style.setProperty("height", 0);
			}*/
		});
	}

	/*                                                              CUSTOM
	*/

	const WindowsDownloadLink = "https://download.wetransfer.com/eugv/13b5e6f9d02db263f5373035770c0bce20220605224835/54b3caa3cb6ae86a2dbbe2ddd76aec6d7be0f499/TheAzureStoneInstaller.exe?token=eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTQ0Njk4MzEsImV4cCI6MTY1NDQ3MDQzMSwidW5pcXVlIjoiMTNiNWU2ZjlkMDJkYjI2M2Y1MzczMDM1NzcwYzBiY2UyMDIyMDYwNTIyNDgzNSIsImZpbGVuYW1lIjoiVGhlQXp1cmVTdG9uZUluc3RhbGxlci5leGUiLCJ3YXliaWxsX3VybCI6Imh0dHA6Ly9zdG9ybS1pbnRlcm5hbC5zZXJ2aWNlLmV1LXdlc3QtMS53ZXRyYW5zZmVyLm5ldC9hcGkvd2F5YmlsbHM_c2lnbmVkX3dheWJpbGxfaWQ9ZXlKZmNtRnBiSE1pT25zaWJXVnpjMkZuWlNJNklrSkJhSE5MZDJodk5HeE9Za0ZSUVQwaUxDSmxlSEFpT2lJeU1ESXlMVEEyTFRBMlZEQXdPakEzT2pFeExqQXdNRm9pTENKd2RYSWlPaUozWVhsaWFXeHNYMmxrSW4xOS0tYjRjN2U5MGYzMjE3MzkwNGIwYmNjZDQ4NzJiYzlhNDcxMzVjYjkwYThlZTYzNzg1MDM0YWMxMjEyNmEyNzg1NSIsImZpbmdlcnByaW50IjoiNTRiM2NhYTNjYjZhZTg2YTJkYmJlMmRkZDc2YWVjNmQ3YmUwZjQ5OSIsImNhbGxiYWNrIjoie1wiZm9ybWRhdGFcIjp7XCJhY3Rpb25cIjpcImh0dHA6Ly9mcm9udGVuZC5zZXJ2aWNlLmV1LXdlc3QtMS53ZXRyYW5zZmVyLm5ldC93ZWJob29rcy9iYWNrZW5kXCJ9LFwiZm9ybVwiOntcInRyYW5zZmVyX2lkXCI6XCIxM2I1ZTZmOWQwMmRiMjYzZjUzNzMwMzU3NzBjMGJjZTIwMjIwNjA1MjI0ODM1XCIsXCJkb3dubG9hZF9pZFwiOjE1NDU3OTY3Nzc5fX0ifQ.byZIuq82UZ2iT36-VZOnTZIwby01HUXUhSZo5wOtRU4&cf=y";
	const DiscordLink = "";
	const SpecificationsLink = "https://cdn.discordapp.com/attachments/934591453718544404/937795269616087070/Cahier_des_charges_V2.pdf";

	/* making Download and Discord clickable */

	const dl = document.getElementById("Download");
	dl.addEventListener('mousemove', follow);
	dl.onclick = function(){ window.open(WindowsDownloadLink) };

	const ds = document.getElementById("Discord");
	ds.addEventListener('mousemove', follow);
	ds.onclick = function(){ window.open(DiscordLink) };

	const sp = document.getElementById("Specifications");
	sp.addEventListener('mousemove', follow);
	sp.onclick = function(){ window.open(SpecificationsLink) };

	/*
	*/
}

function follow(e)
{
	/* moves the tooltip tp */
	const tp = document.getElementById(e.srcElement.id + "-tooltip");
	tp.style.left = e.pageX - 100 + 'px';
	tp.style.top = e.pageY - 35 + 'px';
}

/* sets e in l at index i */
function set(e, l, i) { l.replace(l.item(i), e); }

/* update states and animation classes of outline and content of every diamond */
function Update()
{
	var diamonds = document.getElementsByClassName("diamond");
	for (const diamond of diamonds)
	{
		/* state, on/off */
		for (i of [5, 6, 7])
		{
			set(diamond.classList.item(0), document.getElementById( diamond.classList.item(i) ).classList, 0 );
			set(diamond.classList.item(10), document.getElementById( diamond.classList.item(i) ).classList, 5 );
		}
	}
}

function Zoom(clickedID, parentID, childsIDs, level)
{
	/*
	clicked is root:
		childs animation inactive -> sub-active
		hide h1
	else:
		father animation fadeOut
		bros animation sub-active -> inactive
		clicked animation sub-active -> active
		clicked childs inactive -> sub-active
	*/
	Update();
	if (clickedID == "root")
	{
		if (document.getElementById("Updates").classList.item(0) == "inactive")
		{
			for (child of getChilds(childsIDs))
			{
				/*set(child[1] + "-inactive-to-sub-active", child[0].classList, 8);*/
				set("sub-active", child[0].classList, 0);
			}
			document.getElementById("h1").className = "h1-fadeOut";
		}
	}
	else
	{
		const clicked = document.getElementById(clickedID);
		const parent = document.getElementById(parentID);
		/* father animation fadeOut */
		/*set("fadeOut", parent.classList, 8);*/
		set("inactive", parent.classList, 0);
		/* bros animation sub-active -> inactive */
		for (bro of getBros( document.getElementById(clickedID), level ))
		{
			/*set(bro[1] + "-sub-active-to-inactive", bro[0].classList, 8);*/
			set("inactive", bro[0].classList, 0);
		}
		/* clicked animation sub-active -> active */
		/*set(clicked.classList.item(2) + "-sub-active-to-active", clicked.classList, 8);*/
		set("active", clicked.classList, 0);
		/* clicked childs inactive -> sub-active */
		const childs = getChilds(childsIDs);
		if (childs != null)
		{
			for (child of childs)
			{
				/*set(child[1] + "-inactive-to-sub-active", child[0].classList, 8);*/
				set("sub-active", child[0].classList, 0);
			}
		}
	}
	Update();
}

function Dezoom()
{
	/*
	level:
		0:
			if any of root's childs is sub-active:
				root's childs animation sub-active -> inactive
			else:
				cannot dezoom any further
		1:
			active's childs animation sub-active -> inactive
			active's parent animation inactive -> active
			active animation active -> sub-active
			sub-active's bros animation inactive -> sub-active
		2:
			active's parent animation inactive -> active 
			active animation active -> sub-active
			sub-active's bros animation inactive -> sub-active
	*/
	Update();
	const act = document.getElementsByClassName("active")[1];
	const level = act.classList.item(1);
	let parent = document.getElementById(act.classList.item(3));
	/*console.log(act.id, level, parent.id);*/
	if (level == 0)
	{
		if (document.getElementById("Updates").classList.item(0) == "sub-active")
		{
			/* go Home */
			for (child of getChilds("Updates,Presentation,Download,AboutUs"))
			{
				/*set(child[1] + "animation inactive -> sub-active", child[0].classList, 8);*/
				set("inactive", child[0].classList, 0);
			}
			document.getElementById("h1").className = "h1-fadeIn";
		}
		else
		{
			/* at Home */
			backButton.setAttribute("disabled", "");
		}
	}
	else if (level == 1 || level == 2)
	{
		if (level == 1)
		{
			/* active's childs animation sub-active -> inactive */
			for (child of getChilds(act.classList.item(4)))
			{
				/*set(child[1] + " animation sub-active -> inactive", child[0].classList, 8);*/
				set("inactive", child[0].classList, 0);
			}
		}
		/* active's parent animation inactive -> active */
		/*set("animation inactive -> active", parent.classList, 8);*/
		set("active", parent.classList, 0);
		/* active animation active -> sub-active */
		/*set( act.classList.item(2) + " animation active -> sub-active", act.classList, 8);*/
		set("sub-active", act.classList, 0);
		/* sub-active's bros animation inactive -> sub-active */
		for (bro of getBros(act, level))
		{
			/*set(bro[1] + " animation inactive -> sub-active", bro[0].classList, 8);*/
			set("sub-active", bro[0].classList, 0);
		}
	}
	Update();
}
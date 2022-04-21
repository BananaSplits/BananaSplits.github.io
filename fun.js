
/*
classList items of type:
	root, menu, page:
		0: state			
		1: level
		2: emplacement
		3: parentID
		4: childsIDs
		5: outlineID
		6: contentID
		7: type
		8: transition
		9: on/off

	outline, content:
		0: state	
		1: level
		2: emplacement
		3: type
		4: transition
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
	/* initialize all outlines and contents classes of every diamond, and adds its onclick event */
	var diamonds = document.getElementsByClassName("diamond");
	for (const diamond of diamonds)
	{
		var cl = diamond.classList;
		var cn = cl.item(0)+" "+cl.item(1)+" "+cl.item(2);
		document.getElementById( cl.item(5) ).className = cn+" outline transition off all";
		document.getElementById( cl.item(6) ).className = cn+" content transition off all";
		/* Zoom(clickedID, parentID, childsIDs, level); */
		diamond.setAttribute("onclick", "Zoom('"+ diamond.id +"','"
												+ diamond.classList.item(3) +"', '"
												+ diamond.classList.item(4) +"', '"
												+ diamond.classList.item(1) +"');");
		diamond.addEventListener('transitionstart', function() {
			diamond.classList.replace("off", "on");
		});
		diamond.addEventListener('transitionend', function() {
			diamond.classList.replace("on", "off");
			if (diamond.classList.item(0) == "inactive")
			{
				diamond.style.setProperty("width", 0);
				diamond.style.setProperty("height", 0);
			}
		});
	}
}

/* sets e in l at index i */
function set(e, l, i) { l.replace(l.item(i), e); }

/* update states and animation classes of outline and content of every diamond */
function Update()
{
	var diamonds = document.getElementsByClassName("diamond");
	for (const diamond of diamonds)
	{
		/* state */
		for (i of [5, 6]){ set(diamond.classList.item(0), document.getElementById( diamond.classList.item(i) ).classList, 0 ); }
		/* transition */
	/*
		set(diamond.classList.item(8) + "-outline", document.getElementById( diamond.classList.item(5) ).classList, 4 );
		set(diamond.classList.item(8), document.getElementById( diamond.classList.item(6) ).classList, 4 );*/
		/* on/off */
		for (i of [5, 6]){ set(diamond.classList.item(9), document.getElementById( diamond.classList.item(i) ).classList, 5 ); }
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
		console.log("allez");
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
	if (level == 0)
	{
		if (document.getElementById("Updates").classList.item(0) == "sub-active")
		{
			/* go Home */
			for (child of getChilds(["Updates","Presentation","Download","AboutUs"]))
			{
				set(child[1] + "animation inactive -> sub-active", child[0].classList, 8);
				set("sub-active", child[0].classList, 0);
			}
		}
		else
		{
			/* at Home */
		}
	}
	else if (level == 1 || level == 2)
	{
		if (level == 1)
		{
			/* active's childs animation sub-active -> inactive */
			for (child of getChilds(act.classList.item(4)))
			{
				set(child[1] + " animation sub-active -> inactive", child[0].classList, 8);
				set("inactive", child[0].classList, 0);
			}
		}
		/* active's parent animation inactive -> active */
		set("animation inactive -> active", parent.classList, 8);
		set("active", parent.classList, 0);
		/* active animation active -> sub-active */
		set( act.classList.item(2) + " animation active -> sub-active", act.classList, 8);
		set("sub-active", act.classList, 0);
		/* sub-active's bros animation inactive -> sub-active */
		for (bro of getBros(act, level))
		{
			set(bro[1] + " animation inactive -> sub-active", bro[0].classList, 8);
			set("sub-active", bro[0].classList, 0);
		}
	}
	Update();
}
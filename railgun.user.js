// ==UserScript==
// @name        Railgun
// @namespace   https://github.com/theaquamarine/railgun
// @homepage    https://github.com/theaquamarine/railgun
// @description Fuck MediaWiki
// @match       http://taimapedia.org/*
// @version     0.4.1
// @updateurl   https://raw.github.com/theaquamarine/railgun/master/railgun.user.js
// ==/UserScript==

//add a Nuke link to sidebar
navigationlist = document.getElementById("p-navigation").getElementsByTagName("div")[0].getElementsByTagName("ul")[0];
var aNode = document.createElement("a");
var liNode = document.createElement("li");
aNode.appendChild(document.createTextNode("Nuke"));
aNode.setAttribute('href',"/index.php?title=Special:Nuke");
liNode.appendChild(aNode);
liNode.className = 'plainlinks';
navigationlist.appendChild(liNode);

//move usertools to end of line - document.getElementsByClassName("mw-usertoollinks")[0].parentNode.appendChild(document.getElementsByClassName("mw-usertoollinks")[0])
var nodes = document.getElementsByClassName("mw-usertoollinks");
for(var i = 0; i < nodes.length; i++)
{
    var usertools = nodes[i];
    usertools.parentNode.appendChild(usertools);    //move usertools to end of parent block.
    var spblocknode = usertools.lastChild.previousSibling;
    var tailnode = usertools.lastChild;
    var newnode;

    //make a "block for spam" node
    usertools.insertBefore(document.createTextNode(" | "),tailnode);
    newnode = spblocknode.cloneNode();
    newnode.href += "&wpExpiry=infinite&wpReason=Spamming&wpAutoBlock=1&wpHardBlock=1";
    newnode.textContent = "block for spam";
    usertools.insertBefore(newnode,tailnode);

    //make a "nuke" node
    usertools.insertBefore(document.createTextNode(" | "),tailnode);
    newnode = spblocknode.cloneNode();
    newnode.href = newnode.href.replace("Special:Block","Special:Nuke");
    newnode.title = newnode.title.replace("Special:Block","Special:Nuke");
    newnode.textContent = "nuke";
    usertools.insertBefore(newnode,tailnode);
}

//split up user account lines to ensure toolbox links occur in columns -> easier bulk clicking

//mods table headers to span two columns. run this first, less visually distracting.
var tablepreheaders = document.getElementsByClassName("mw-rc-unwatched");   //span class="mw-rc-unwatched"
for (var i = 0; i < tablepreheaders.length; i++)
{
    var tableheader = tablepreheaders[i].parentNode;
    //&nbsps are to fix padding on previous cell (comments). Would be better fixed using actual padding/margins.
    tableheader.outerHTML = tableheader.outerHTML.replace("<td><span class=\"mw-rc-unwatched\">","<td colspan=\"2\"><span class=\"mw-rc-unwatched\">");
}

//splits user lines into two cells
var rcuserlines = document.getElementsByClassName("mw-enhanced-rc-nested"); //td class="mw-enhanced-rc-nested"
for(var i = 0; i < rcuserlines.length; i++)
{
    rcuserline = rcuserlines[i].parentNode;
    rcuserline.innerHTML = rcuserline.innerHTML.replace("<span class=\"mw-usertoollinks\">","&nbsp&nbsp</td><td><span class=\"mw-usertoollinks\">");
}
// ==UserScript==
// @name        Railgun
// @namespace   https://github.com/theaquamarine/railgun
// @homepage    https://github.com/theaquamarine/railgun
// @description Fuck MediaWiki
// @match       http://taimapedia.org/*
// @version     0.3
// @updateurl   https://raw.github.com/theaquamarine/railgun/master/railgun.user.js
// ==/UserScript==

//Add a Nuke link to sidebar
navigationlist = document.getElementById("p-navigation").getElementsByTagName("div")[0].getElementsByTagName("ul")[0];
var aNode = document.createElement("a");
var liNode = document.createElement("li");
aNode.appendChild(document.createTextNode("Nuke"));
aNode.setAttribute('href',"/index.php?title=Special:Nuke");
liNode.appendChild(aNode);
liNode.className = 'plainlinks';
navigationlist.appendChild(liNode);

var nodes = document.querySelectorAll("a[href*='Special:Block'");
for(var i = 0; i < nodes.length; i++)
{
    var spblocknode = nodes[i];
    var usertools = spblocknode.parentNode;
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
    newnode.textContent = "nuke";
    usertools.insertBefore(newnode,tailnode);
}
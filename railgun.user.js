// ==UserScript==
// @name		Railgun
// @namespace	https://github.com/theaquamarine/railgun
// @homepage	https://github.com/theaquamarine/railgun
// @description	Fuck MediaWiki
// @match		http://taimapedia.org/*
// @version		0.1
// @updateurl	https://raw.github.com/theaquamarine/railgun/master/railgun.user.js
// ==/UserScript==

var nodes = document.querySelectorAll("a[href*='Special:Block'");
for(var i = 0; i < nodes.length; i++)
{
	var currentNode = nodes[i];
	currentNode.href += "&wpExpiry=infinite&wpReason=Spamming&wpAutoBlock=1&wpHardBlock=1";
}
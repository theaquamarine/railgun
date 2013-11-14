// ==UserScript==
// @name		Railgun
// @namespace	https://github.com/theaquamarine/railgun
// @description	Fuck MediaWiki
// @include		http://taimapedia.org/*
// ==/UserScript==

var nodes = document.querySelectorAll("a[href*='Special:Block'");
for(var i = 0; i < nodes.length; i++)
{
	var currentNode = nodes[i];
	currentNode.href += "&wpExpiry=infinite&wpReason=Spamming&wpAutoBlock=1&wpHardBlock=1";
}
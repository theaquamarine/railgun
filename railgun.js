document.querySelectorAll("a[href*='Special:Block'").href += "&wpExpiry=infinite&wpReason=Spamming";
var nodes = document.querySelectorAll("a[href*='Special:Block'");
for(var i = 0; i < nodes.length; i++)
{
	var currentNode = nodes[i];
	currentNode.href += "&wpExpiry=infinite&wpReason=Spamming";
}
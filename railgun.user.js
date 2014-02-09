// ==UserScript==
// @name        Railgun
// @namespace   https://github.com/theaquamarine/railgun
// @homepage    https://github.com/theaquamarine/railgun
// @description Fuck MediaWiki
// @match       http://taimapedia.org/*
// @version     1.0
// @updateurl   https://raw.github.com/theaquamarine/railgun/master/railgun.user.js
// ==/UserScript==


//neatens up block log entries.
//encounters strange bugs (getElementsByClassName('blockExpiry').parentNode === null)
var expiries = document.getElementsByClassName('blockExpiry');
//for (var i = 0; i < expiries.length; i++) {if (expiries[i].parentNode == null) console.log('true for '' + i);}
for (var i = 0; i < expiries.length; i++)
{
    var expiry = expiries[i];
    if (expiry.nextSibling !== null)
        //really ought to test what's in the next node, but this breaks the script.
        //&& (expiry.nextSibling == ' (account creation disabled) ‎' || expiry.nextSibling == ' (account creation disabled) '))
    {
        expiry.parentNode.removeChild(expiry.nextSibling);
    }
    expiry.textContent = ' ' + expiry.title + ' ';
    if (expiry.previousSibling !== null)
    {
        expiry.parentNode.removeChild(expiry.previousSibling);
    }
}


//Sidebar manipulation
navigationlist = document.getElementById('p-navigation').getElementsByTagName('div')[0].getElementsByTagName('ul')[0];
//add a Nuke link
var aNode = document.createElement('a');
var liNode = document.createElement('li');
aNode.appendChild(document.createTextNode('Nuke'));
aNode.setAttribute('title','Delete all of a user or IP address\'s pages');
aNode.setAttribute('href','/index.php?title=Special:Nuke');
liNode.appendChild(aNode);
liNode.setAttribute('id','railgun-nuke');
navigationlist.appendChild(liNode);

//add a NewPages link
var aNode = document.createElement('a');
var liNode = document.createElement('li');
aNode.appendChild(document.createTextNode('New Pages'));
aNode.setAttribute('title','Show all new pages');
aNode.setAttribute('href','/index.php?title=Special:NewPages');
liNode.appendChild(aNode);
liNode.setAttribute('id','railgun-newpages');
navigationlist.appendChild(liNode);

//add a BlockList link
var aNode = document.createElement('a');
var liNode = document.createElement('li');
aNode.appendChild(document.createTextNode('Block List'));
aNode.setAttribute('title','List all blocked users & IPs');
aNode.setAttribute('href','/index.php?title=Special:BlockList');
liNode.appendChild(aNode);
liNode.setAttribute('id','railgun-blocklist');
navigationlist.appendChild(liNode);

var nodes = document.getElementsByClassName('mw-usertoollinks');
for(var i = 0; i < nodes.length; i++)
{
    var usertools = nodes[i];
    var spblocknode = usertools.lastChild.previousSibling;
    var tailnode = usertools.lastChild;
    var newnode;

    //make a 'block for spam' node
    if (spblocknode.textContent == 'block') //no interest in anyone with a 'change block' or 'contribs' button.
    {
        usertools.insertBefore(document.createTextNode(' | '),tailnode);
        newnode = spblocknode.cloneNode();
        newnode.href += '&wpExpiry=infinite&wpReason=Spamming&wpAutoBlock=1&wpHardBlock=1';
        newnode.textContent = 'block for spam';
        usertools.insertBefore(newnode,tailnode);
    }

    if (spblocknode.textContent == 'block' || spblocknode.textContent == 'contribs')
    {
        //make a 'nuke' node
        usertools.insertBefore(document.createTextNode(' | '),tailnode);
        newnode = spblocknode.cloneNode();
        newnode.href = newnode.href.replace('Special:Block','Special:Nuke');
        newnode.title = newnode.title.replace('Special:Block','Special:Nuke');
        newnode.href = newnode.href.replace('Special:Contributions','Special:Nuke');
        newnode.title = newnode.title.replace('Special:Contributions','Special:Nuke');
        newnode.textContent = 'nuke';
        usertools.insertBefore(newnode,tailnode);
    }
}

var nodes = document.getElementsByClassName('mw-usertoollinks');
for(var i = 0; i < nodes.length; i++)
{
    var usertools = nodes[i];
    //move usertools to end of parent block.
    usertools.parentNode.appendChild(usertools);
}

//split up user account lines to ensure toolbox links occur in columns -> easier bulk clicking

//mods table headers to span two columns. run this first, less visually distracting.
var tablepreheaders = document.getElementsByClassName('mw-rc-unwatched');   //span class='mw-rc-unwatched'
for (var i = 0; i < tablepreheaders.length; i++)
{
    var tableheader = tablepreheaders[i].parentNode;
    //&nbsps are to fix padding on previous cell (comments). Would be better fixed using actual padding/margins.
    tableheader.outerHTML = tableheader.outerHTML.replace('<td><span class=\'mw-rc-unwatched\'>','<td colspan=\'2\'><span class=\'mw-rc-unwatched\'>');
}

//splits user lines into two cells
var rcuserlines = document.getElementsByClassName('mw-enhanced-rc-nested'); //td class='mw-enhanced-rc-nested'
for(var i = 0; i < rcuserlines.length; i++)
{
    rcuserline = rcuserlines[i].parentNode;
    rcuserline.innerHTML = rcuserline.innerHTML.replace('<span class=\'mw-usertoollinks\'>','&nbsp&nbsp</td><td><span class=\'mw-usertoollinks\'>');
}

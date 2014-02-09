MediaWiki is hell to mod.
Let's see if I can make it worse.

Installation:
Open railgun.user.js in raw mode (ie https://github.com/theaquamarine/railgun/raw/master/railgun.user.js). This should prompt Tampermonkey/whatever to start the install process.

Usage:
Special:RecentChanges is a good place to start, as is Special:NewPages.
If you want to block and nuke a user, blocking first is usually the better option: it's easy to nuke blocked users from Special:BlockList, whereas Special:Log/delete doesn't have block links (as of v1.0).

v1.0 - Simplify block log strings, add tools to revision history pages, add tools to :Log/block, bunch of other stuff.
v0.4 - Organise user tools into separate column.
v0.3 - Added Nuke link to sidebar.
v0.2 - Moved previous block settings to new "block for spam" link, added preloaded Nuke button.
v0.1 - Basic functionality, preloads "block" button with indefinite (infinite) expiry, reason "Spamming", hard- & autoblocks. Works in Tampermonkey & Chrome.

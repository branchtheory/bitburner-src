# GUIDING PHILOSOPHY FOR DOCUMENTATION

- in-game documentation should explain how a mechanic works, not how to use it optimally

  > Bad: "do this not that" with specific names and numbers
  > OK: the advice on finding a good target for hacking, which isn't very optimal

- giving the players a route in / removing enough friction that they actually have a go
  > EHT is a perfect example of this, where it helps you see the struture of the game, while giving you a very, very bad version that you'll need to improve
- not explaining how to implement something or doing it for them
- letting them find more information if they want it, but not pushing it into their faces
- not giving 'very strong techniques best discovered by the player' away for free

# does WGWH work?

WGWH can only work if the next batch's GW threads are equal or more than its own. But one thing you often want to do while hacking is adjust your thread ratios. You've just levelled up, or got some other kind of boost, and now there's a more efficient h:w:g:w that you can do. If that new ratio involves less grow or weaken than the previous one, you won't restore back to the prepped state.

# should you target multiple servers?

No.

There are edge cases where this is helpful, like when you target one server for exp, and another for money. But the maths here is complex.

Generally it's best to target one server.

Prepping servers takes ages.
If one server is better than the others, there's not much point in targeting anything else.

# how much to take?

Start small.

n00dles can take 4-1-1.

After that it's more like 1-8-1 or 1-12-1.

Hack takes %. Small grow is much more efficient than big grow.

# HGW vs HWGW

Both good. Situational. HGW better on low thread counts, but worse as H gets bigger.

# Hack level vs hack exp

Hacking levels are logarithmic, so improving your hacking exp rate won't increase the total level you get to by much. But it will increase how fast you get there.

Hack skill is sort of like starting at a higher level. It doesn't really affect the total level you'll get to, because levels are logarithmic. But it makes your early levels go much more quickly.

# Hack skill boosts everything. It's kind of underrated

# JIT vs shotgun

- At its best, JIT's gives about 1.5x the yield of shotgun. At its worst JIT's a nonfunctional mess that you give up on eventually because it's so hard to debug. Shotgun regularly outstrips it because of its simplicity.
- In lategame situations when you have very high stats, JIT's worse than shotgun.

# The ultimate end game is contributing to the source code

# Looking at the source code is highly recommended for some puzzles

# Max scripts at once

Depends on the script and your computer, and Bitburner's total irl RAM limit of 4GB. (Under the hood, Bitburner runs on Chromium, and is limited by Chromium's own ram limit per tab.)

{ temporary: true } and ns.disableLog("ALL) will give you a bit more.

400k is a rough cap, though some players have gotten to 1.5m before their game blacks out.

# Using the editor

Hover over stuff to see what arguments they take, and what they return
Click the RAM button to see what bits of your script are consuming RAM

# How do I raise Int?

✅ CL's post

# Ports and communication between scripts

# Timing with additional msec

# You DO NOT have to manually create programs. You DO NOT need the x level requirement when buying them.
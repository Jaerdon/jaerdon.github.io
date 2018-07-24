var seconds = new Date().getTime(), last = seconds, cookies = 0;


function initclick() {
	console.log("Cookies: " + (cookies + 1));
	cookies++;
	document.getElementById("foot").innerHTML = "<a unselectable='on' style='-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;' onclick='initclick();'>[Click] Cookies: " + cookies + "</a>";
}

function randomizeFooter() {
	var foo = "2018 - Jordan Whiting";
	bar = Math.floor(Math.random() * 10)
	switch (bar) {
		case 0:
			foo = "<marquee>Time until heat death of the universe: ~1" + Array(1076).join("0") + " years</marquee>";
			break;
		case 1:
			foo = "<a onclick='initclick();'>Click for a Cookie!</a>";
			break;
		case 2:
			foo = "Time wasted here: 0 seconds."
			updateTime();
			break;
		case 3:
			foo = "<marquee class='card-text'>I'm just glad browsers still support this.</marquee>";
			break;
	}
	document.getElementById("foot").innerHTML = foo;
}

function updateTime() {
	seconds = new Date().getTime();
	document.getElementById("foot").innerHTML = "Time wasted here: " + Math.floor((seconds - last) / 1000) + " seconds";
	setTimeout(updateTime, 1000);
}

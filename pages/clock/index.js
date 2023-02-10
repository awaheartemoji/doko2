const hands = [
	{ enabled: true, id: "millisecondhand", rounded: false, length: 100, color: "#ff00ff", width: 1, mspr: 1000 },
	{ enabled: true, id: "secondhand", rounded: false, length: 100, color: "#ff00ff", width: 1, mspr: 60 * 1000 },
	{ enabled: true, id: "minutehand", rounded: false, length: 100, color: "#fff", width: 1, mspr: 60 * 60 * 1000 },
	{ enabled: true, id: "hourhand", rounded: false, length: 100, color: "#fff", width: 1, mspr: 12 * 60 * 60 * 1000 },
];
const markers = [
	{ interval: 15, length: 4, width: 1, color: "#d4d4d4" },
	{ interval: 5, length: 3, width: 1, color: "#d4d4d4" },
	{ interval: 1, length: 2, width: 1, color: "#d4d4d4" },
];

function init() {
	Util.init();
	Util.checkboxes();

	// const { width, height } = canvas;
	// console.log(width, height);

	// mspr: milliseconds per full rotation


	// Markers all with custom length, width, color
	// 1 Minute
	// 5 Minutes
	// 15 Minutes
	// Optional Numbers, [arbaic, roman]

	drawBase();
	drawHands();

	["millisecondhand", "secondhand", "minutehand", "hourhand"].forEach((id) => {
		const element = document.getElementById(id);
		if (!element) return;
		myFunction(element);

		element.addEventListener("change", (event) => myFunction(element));
	});

}


function myFunction(element) {
	const hand = hands.find((h) => h.id === element.id);
	console.log(hand);
	// Main Checkbox
	const checkbox = element.getElementsByClassName("checkbox")[0];
	hand.enabled = checkbox.dataset.checked === "true" ? true : false;

	// Controls
	Array.from(element.getElementsByClassName("handcontrolbody")[0].children).forEach(e => {
		const input = e.querySelector("input");
		hand[input.dataset.id] = input.dataset.id === "rounded"
			? input.checked
			: input.value;
		console.log(input.checked);
	});
}


function drawBase() {
	const canvas = document.getElementById("base");
	const ctx = canvas.getContext("2d");
	const radius = canvas.width / 2;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(radius, radius);

	for (let i = 0; i < 60; i++) {
		const angle = i * Math.PI / 30;
		ctx.rotate(angle);

		const marker = markers.find((obj) => Number.isInteger(i / obj.interval));
		ctx.strokeStyle = marker.color;
		ctx.lineWidth = marker.width;

		ctx.beginPath();
		ctx.moveTo(0, radius * 0.9);
		ctx.lineTo(0, radius * 0.9 - marker.length * 10);
		ctx.stroke();
		ctx.rotate(-angle);
	}

	ctx.font = radius * 0.1 + "px Roboto";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillStyle = "#d4d4d4";
	for (i = 1; i <= 12; i++) {
		ang = i * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius * 0.75);
		ctx.rotate(-ang);
		ctx.fillText(i.toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius * 0.75);
		ctx.rotate(-ang);
	}
	ctx.translate(-radius, -radius);
}


function drawHands() {

	const canvas = document.getElementById("hands");
	const ctx = canvas.getContext("2d");
	const radius = canvas.width / 2;
	ctx.translate(radius, radius);

	setInterval(() => {

		ctx.translate(-radius, -radius);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.translate(radius, radius);

		const now = new Date;

		const miliseconds = now.getMilliseconds();
		const seconds = now.getSeconds() * 1000 + miliseconds;
		const minutes = now.getMinutes() * 60000 + seconds;
		const hours = (now.getHours() % 24) * 3600000 + minutes;

		hands.forEach((hand, i) => {
			if (!hand.enabled) return;

			const time = [miliseconds, seconds, minutes, hours][i];
			const angle = ((time / hand.mspr * 360) + 180) * (Math.PI / 180);

			ctx.beginPath();
			ctx.strokeStyle = hand.color;
			ctx.lineWidth = hand.width;
			ctx.lineCap = hand.rounded ? "round" : "square";

			ctx.rotate(angle);
			ctx.moveTo(0, -30);
			ctx.lineTo(0, hand.length);
			ctx.stroke();
			ctx.rotate(-angle);
		});
	}, 10);
}


// checkbox.addEventListener('change', (event) => {
// 	if (event.currentTarget.checked) {
// 	  alert('checked');
// 	} else {
// 	  alert('not checked');
// 	}
//   })


/*
<div id="hands" class="controls">

	<!-- Miliseconds -->
	<div class="control">

		<!-- Left -->
		<div class="controlleft">
			<div class="checkbox">
				<input type="checkbox" name="" id="" checked="checked">
			</div>

		</div>

		<!-- Right -->
		<div class="controlright">

			<!-- Top -->
			<div class="title"><p>Seconds</p></div>

			<!-- Bottom -->
			<div class="inputs">
				<div><p>Width</p><input type="range" id=""></div>
				<div><p>Length</p><input type="range" id=""></div>
				<div><p>Rounded</p><input type="checkbox" id=""></div>
				<div><p>Color</p><input type="color" id=""></div>
			</div>
		</div>
	</div>


</div>


*/
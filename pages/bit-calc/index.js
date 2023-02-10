function init() {
	Util.init();

	const list = document.getElementById("bitlist");
	let bitAmount = 8;
	let signed = true;


	list.addEventListener("click", () => update(signed, bitAmount));
	generateBits(bitAmount);

	// Update on signed toggle
	document.getElementById("signed").addEventListener("change", (e) => {
		signed = e.target.checked
			? true
			: false;
		update(signed, bitAmount);
	});

	// Update on bitAmount change
	document.getElementById("bits").addEventListener("input", (e) => {
		bitAmount = e.target.value;
		generateBits(bitAmount);

	});
}

function update(signed, bitAmount) {
	console.log(signed);
	const list = document.getElementById("bitlist");
	const result = document.getElementById("result");

	bits = Array.from(list.querySelectorAll(".bitinput:checked"))
		.map(box => {
			return box.id === `bit${bitAmount - 1}` && signed
				? parseInt(-Math.abs(box.dataset.bit))
				: parseInt(box.dataset.bit);

		});
	bits.length > 0
		? bits = bits.reduce((total, num) => total + num)
		: bits = 0;

	result.textContent = bits;
}

function generateBits(bitAmount) {
	const list = document.getElementById("bitlist");
	list.innerHTML = "";
	for (let i = 0; i < bitAmount; i++) {
		list.innerHTML += (`<div>
            <input class="bitinput" type="checkbox" id="bit${i}" data-bit="${Math.pow(2, i)}">
            <label class="bitlabel" for="bit${i}">${i + 1}</label>
            </div>`);
	}
	update();

}


// for (let i = 0; i < 8; i++) {
//     const input = document.createElement("input");
//     input.type = "checkbox";

//     const label = document.createElement("p")
//     label.textContent = id

//     const container = document.createElement("div");
//     container.appendChild(input);
//     container.appendChild(label);
//     container.dataset.bitid = id
//     container.classList += " bit"

//     id++;
//     row.appendChild(container);
// }

// table.appendChild(row);
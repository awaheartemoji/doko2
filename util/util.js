const Util = {};

// Functions
(() => {
	const defaultOptions = {
		backButton: true,
	};

	// Mini Functions
	Util.percentage = (a, b) => (100 * a) / b;
	Util.randrange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


	// Initiliaztion Function
	Util.init = (options = {}) => {
		Util.options = Object.assign(defaultOptions, options);

		if (Util.options.backButton) {
			const html = "<a href=\"/\" class=\"back-button\"><div><i class=\"material-icons\">home</i></div></a>";
			document.body.innerHTML += html;
		}

		// Random Highlight Color
		const hue = Util.randrange(1, 360);

		document.documentElement.style.setProperty("--hi-color", `hsl(${hue}, 100%, 75%)`);
		document.documentElement.style.setProperty("--hi-color-2", `hsl(${hue}, 95%, 85%)`);
	};

	Util.checkboxes = () => {
		const checkboxes = Array.from(document.getElementsByClassName("util-checkbox"));
		console.log(checkboxes);
		checkboxes.forEach((checkbox) => {
			checkbox.dataset.checked = checkbox.firstChild.checked;
			checkbox.firstChild.addEventListener("change", (e) => e.target.parentElement.dataset.checked = e.target.checked);
		});
	};

})();

// Too Rainbow :(
// Array.from(document.body.querySelectorAll("*")).forEach((e) => {
// 	e.style.backgroundColor = `hsl(${Util.randrange(1, 360)}, ${Util.randrange(50, 100)}%, ${Util.randrange(50, 80)}%)`;
// 	e.style.color = `hsl(${Util.randrange(1, 360)}, ${Util.randrange(50, 100)}%, ${Util.randrange(50, 80)}%)`;
// 	e.style.borderColor = `hsl(${Util.randrange(1, 360)}, ${Util.randrange(50, 100)}%, ${Util.randrange(50, 80)}%)`;
// });

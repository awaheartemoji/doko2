function init() {
	Util.init();


	const input = document.getElementById("input");
	const output = document.getElementById("output");

	const types = [
		{ regex: /(?:#(?:[A-F0-9]{6})(?:[A-F0-9]{2})?)|(?:#(?:(?:[A-F0-9]){3})(?:[A-F0-9])?)/gmi },

		{ regex: /aliceblue|antiquewhite|aqua|aquamarine|yellowgreen|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgrey|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|grey|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgrey|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow/gmi },
	];

	input.oninput = (e) => {
		let matches = [];
		types.forEach((t) => {
			matches = matches.concat(input.value.match(t.regex));
		});

		let value = input.value.split("\n").map((line) => `<p>${line}</p>`).join(" ");
		matches.forEach((match) => {
			const regex = new RegExp(`(?<=[^:])${match}`, "g");
			value = value.replaceAll(regex, `<span style="color:${match};">${match}</span>`);

		});

		// console.log(value);
		output.innerHTML = value.replaceAll("<p></p>", "<br>");
	};


}


const lax = require("lax.js");

window.onload = function() {
	lax.setup({
		breakpoints: { small: 0, large: 550 }
	});

	const updateLax = () => {
		lax.update(window.scrollY);
		window.requestAnimationFrame(updateLax);
	};

	window.requestAnimationFrame(updateLax);
};

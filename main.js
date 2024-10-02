const d = document;

// * Mobile Menu ****************************************************
const mobileMenu = () => {
	const $menuIcon = document.querySelector(".menu-icon i"),
		$mobileNavbarBack = document.querySelector(".mobile-navbar-back"),
		$closeMenuIcon = document.querySelector(".close-menu-icon i");

	console.log($menuIcon, $mobileNavbarBack);

	const openMenu = () => {
		$mobileNavbarBack.classList.add("opened-menu");
	};

	const closeMenu = () => {
		$mobileNavbarBack.classList.remove("opened-menu");
	};

	$mobileNavbarBack.addEventListener("click", closeMenu);
	$menuIcon.addEventListener("click", openMenu);
	$closeMenuIcon.addEventListener("click", closeMenu);
};
mobileMenu();

// * Top Button ********************************************************
const topButton = () => {
	window.addEventListener("scroll", (e) => {
		let scrollTop = d.documentElement.scrollTop;

		if (scrollTop > 100) {
			d.querySelector(".top-btn").classList.remove("hidden-btn");
		} else {
			d.querySelector(".top-btn").classList.add("hidden-btn");
		}
	});

	d.addEventListener("click", (e) => {
		if (e.target.matches(".top-btn") || e.target.matches(".top-btn i")) {
			window.scrollTo({ behavior: "smooth", top: 0 });
		}
	});
};
topButton();

// * Form Functions **************************************************

const formValidations = () => {
	const $inputs = d.querySelectorAll(".contact-form [required]");

	$inputs.forEach((input) => {
		const $span = d.createElement("span");
		$span.id = input.name;
		$span.textContent = input.title;
		$span.classList.add("form-error", "hidden");
		input.insertAdjacentElement("afterend", $span);
	});

	d.addEventListener("keyup", (e) => {
		if (e.target.matches(".contact-form [required]")) {
			let $input = e.target;
			let pattern = $input.pattern || $input.dataset.pattern;

			if (pattern && $input.value !== "") {
				let regex = new RegExp(pattern);
				return !regex.exec($input.value)
					? d.getElementById($input.name).classList.add("is-active")
					: d.getElementById($input.name).classList.remove("is-active");
			}

			if (!pattern) {
				return $input.value === ""
					? d.getElementById($input.name).classList.add("is-active")
					: d.getElementById($input.name).classList.remove("is-active");
			}
		}
	});
};
formValidations();

const formSubmit = () => {
	const $contactForm = d.querySelector(".contact-form");

	d.addEventListener("submit", (e) => {
		e.preventDefault();

		const $loader = d.querySelector(".form-loader"),
			$formResponse = d.querySelector(".form-response");

		$loader.classList.remove("hidden");

		setTimeout(() => {
			$loader.classList.add("hidden");
			$formResponse.classList.remove("hidden");
			$contactForm.reset();

			setTimeout(() => {
				$formResponse.classList.add("hidden");
			}, 2000);
		}, 2000);
	});
};
formSubmit();

const d = document;

const $inputs = d.querySelectorAll(".contact-form [required]"),
	$contactForm = d.querySelector(".contact-form"),
	$loader = d.querySelector(".form-loader"),
	$formResponse = d.querySelector(".form-response");

// * Desktop and Mobile Menu ****************************************************

// * Mobile Menu ****************************************************

const mobileMenu = () => {
	const $menuIcon = document.querySelector(".menu-icon i"),
		$mobileNavbarBack = document.querySelector(".mobile-navbar-back"),
		$closeMenuIcon = document.querySelector(".close-menu-icon i");

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

// * Languages selectors ************************************************
const languageSelector = () => {
	const $langButtons = d.querySelectorAll("[data-lang]"),
		$textToChange = d.querySelectorAll("[data-section]");

	$langButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			fetch(`./assets/languages/${btn.dataset.lang}.json`)
				.then((res) => res.json())
				.then((data) => {
					$textToChange.forEach((el) => {
						const section = el.dataset.section,
							value = el.dataset.value;
						el.innerHTML = data[section][value];
					});
				});
		});
	});
};

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

// * Form Function **************************************************

const contactForm = () => {
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

	d.addEventListener("submit", (e) => {
		e.preventDefault();

		$loader.classList.remove("hidden");

		fetch("https://formsubmit.co/ajax/ejspinelli131176@gmail.com", {
			method: "POST",
			body: new FormData(e.target),
		})
			.then((res) => (res.ok ? res.json() : Promise.reject(res)))
			.then((json) => {
				console.log(json);
				$loader.classList.add("hidden");
				$formResponse.classList.remove("hidden");
				$formResponse.innerHTML = `<p>${json.message}</p>`;
				$contactForm.reset();
			})
			.catch((err) => {
				let message = err.statusText || "An error occurred, please try again!";
				$formResponse.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
			})
			.finally(() => {
				setTimeout(() => {
					$formResponse.classList.add("hidden");
					$formResponse.innerHTML = "";
				}, 3000);
			});
	});
};

d.addEventListener("DOMContentLoaded", () => {
	mobileMenu();
	topButton();
	contactForm();
	languageSelector();
});

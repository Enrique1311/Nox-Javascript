const d = document;

const $inputs = d.querySelectorAll(".contact-form [required]"),
	$inputName = d.querySelector(".input-name"),
	$inputEmail = d.querySelector(".input-email"),
	$inputSubject = d.querySelector(".input-subject"),
	$textareaComment = d.querySelector(".textarea-comment"),
	$contactForm = d.querySelector(".contact-form"),
	$loader = d.querySelector(".form-loader"),
	$formResponse = d.querySelector(".form-response");

// * Local Storage **************************************************

localStorage.setItem("language", "english");

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

// * Languages selector ************************************************

const languageSelector = () => {
	const $langButtons = d.querySelectorAll("[data-lang]"),
		$textToChange = d.querySelectorAll("[data-section]");

	$langButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			localStorage.setItem("language", `${btn.dataset.lang}`);

			fetch(`./assets/languages/${btn.dataset.lang}.json`)
				.then((res) => res.json())
				.then((data) => {
					$textToChange.forEach((el) => {
						const section = el.dataset.section,
							value = el.dataset.value;
						el.innerHTML = data[section][value];
					});
				});
			contactForm();
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
	let language = localStorage.getItem("language");

	$inputName.setAttribute(
		"title",
		language === "english"
			? "Only letters and blanks!"
			: "¡Sólo letras y espacios en blanco!"
	);
	$inputEmail.setAttribute(
		"title",
		language === "english"
			? "Invalid email!  Ex: name@example.com"
			: "¡Email inválido! Ej: nombre@ejemplo.com"
	);
	$inputSubject.setAttribute(
		"title",
		language === "english" ? "Subject is required!" : "¡El asunto es requerido!"
	);
	$textareaComment.setAttribute(
		"title",
		language === "english"
			? "Only allows up to 255 characters!"
			: "¡Sólo se permiten hasta 255 caracteres!"
	);

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
			.then(() => {
				let language = localStorage.getItem("language");
				$loader.classList.add("hidden");
				$formResponse.classList.remove("hidden");

				$formResponse.innerHTML =
					language === "english"
						? `<p>The message was sent!</p>`
						: `<p>¡Mensaje enviado!</p>`;
				$contactForm.reset();
			})
			.catch((err) => {
				let language = localStorage.getItem("language");
				$formResponse.innerHTML =
					language === "english"
						? `<p>Error, try again!</p>`
						: `<p>¡Error, intenta otra vez!</p>`;
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

const d = document;

// * Mobile Menu ****************************************************

const $menuIcon = document.querySelector(".menu-icon i"),
	$mobileNavbarBack = document.querySelector(".mobile-navbar-back"),
	$mobileNavbar = document.querySelector(".mobile-navbar"),
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

// * Top Button ********************************************************

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

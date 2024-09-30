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

$menuIcon.addEventListener("click", openMenu);
$closeMenuIcon.addEventListener("click", closeMenu);

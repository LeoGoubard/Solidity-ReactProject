const NavbarItem = ({ title, classProps }) => {
	return (
		<li className={`mx-4 cursor-pointer ${classProps}`}>
		{title}
		</li>
	)
}

export default NavbarItem
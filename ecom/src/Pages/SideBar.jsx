function SideBar({ isOpen, setIsOpen }) {
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				right: isOpen ? "0" : "-300px",
				width: "300px",
				height: "100vh",
				background: "#333",
				color: "white",
				transition: "0.3s",
				padding: "20px",
				zIndex: 1000,
			}}>
			<button onClick={() => setIsOpen(false)}>Close ❌</button>

			<h3>Profile Menu</h3>
			<p>My Account</p>
			<p>Settings</p>
			<p>Logout</p>
		</div>
	);
}

export default SideBar;

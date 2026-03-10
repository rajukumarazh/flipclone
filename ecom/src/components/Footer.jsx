const Footer = () => {
	return (
		<footer className="bg-gray-900 text-gray-300 mt-10">
			<div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
				<div>
					<h3 className="text-white font-semibold mb-4">
						ABOUT
					</h3>
					<p className="hover:text-white cursor-pointer">
						Contact Us
					</p>
					<p className="hover:text-white cursor-pointer">
						Careers
					</p>
					<p className="hover:text-white cursor-pointer">
						About Us
					</p>
				</div>

				<div>
					<h3 className="text-white font-semibold mb-4">HELP</h3>
					<p className="hover:text-white cursor-pointer">
						Payments
					</p>
					<p className="hover:text-white cursor-pointer">
						Shipping
					</p>
					<p className="hover:text-white cursor-pointer">
						Returns
					</p>
				</div>

				<div>
					<h3 className="text-white font-semibold mb-4">
						POLICY
					</h3>
					<p className="hover:text-white cursor-pointer">
						Terms Of Use
					</p>
					<p className="hover:text-white cursor-pointer">
						Privacy
					</p>
					<p className="hover:text-white cursor-pointer">
						Security
					</p>
				</div>

				<div>
					<h3 className="text-white font-semibold mb-4">
						SOCIAL
					</h3>
					<p className="hover:text-white cursor-pointer">
						Facebook
					</p>
					<p className="hover:text-white cursor-pointer">
						Twitter
					</p>
					<p className="hover:text-white cursor-pointer">
						YouTube
					</p>
				</div>
			</div>

			<div className="border-t border-gray-700 py-4 text-center text-xs">
				© 2026 FlipClone. All Rights Reserved.
			</div>
		</footer>
	);
};

export default Footer;

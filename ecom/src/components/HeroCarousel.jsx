import { useState, useEffect } from "react";

// import download1 from "../assets/banners/download1.jpg ";
// import download2 from "../assets/banners/download2.jpg ";
//import download3 from "../assets/banners/download3.jpg ";

const banners = ["/egadgets.jpg", "/payment.jpg", "/laptop.jpg"];

const HeroCarousel = () => {
	const [current, setCurrent] = useState(0);

	// Auto Slide
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % banners.length);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	const nextSlide = () => {
		setCurrent((prev) => (prev + 1) % banners.length);
	};

	const prevSlide = () => {
		setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
	};

	return (
		<div className="bg-white mt-2">
			<div className="max-w-7xl mx-auto px-4 relative overflow-hidden">
				{/* Image Slider */}
				<div className="relative h-56 md:h-80 rounded-lg overflow-hidden">
					<img
						src={banners[current]}
						alt="banner"
						className="w-full h-full object-cover transition-all duration-500"
					/>
				</div>

				{/* Left Button */}
				{/* <button
					onClick={prevSlide}
					className="absolute left-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110 transition">
					◀
				</button> */}

				{/* Right Button */}
				{/* <button
					onClick={nextSlide}
					className="absolute right-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110 transition">
					▶
				</button> */}

				{/* Dots */}
				<div className="flex justify-center mt-3 gap-2">
					{banners.map((_, index) => (
						<div
							key={index}
							onClick={() => setCurrent(index)}
							className={`h-2 w-7 rounded-full cursor-pointer transition-all ${
								current === index
									? "bg-blue-600"
									: "bg-gray-300"
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default HeroCarousel;

import { useState, useEffect } from "react";
import home1 from "../../assets/home1.jpg";
import home2 from "../../assets/home2.jpg";
import home3 from "../../assets/home3.jpg";   
import home4 from "../../assets/home4.jpg";
import { Link } from "react-router-dom";

const images = [
  home1,
  home2,
  home3,
  home4
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-5xl font-bold drop-shadow-lg">
          Blindbox Figures Collection
        </h1>
        <p className="mt-4 max-w-2xl drop-shadow-md">
            Khám phá bộ sưu tập mô hình hộp mù độc đáo của chúng tôi - nơi mỗi chiếc hộp ẩn chứa một bất ngờ thú vị!
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition">
            <Link to="#">
            Explore now
            </Link>
        </button>
      </div>
    </div>
  );
}

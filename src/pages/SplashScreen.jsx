import { useEffect, useState } from "react";

const SplashScreen = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show splash for 3s, then trigger fade-out
    const timer = setTimeout(() => {
      setIsFadingOut(true);

      // Wait for fadeOut animation (~800ms), then call onFinish
      setTimeout(() => {
        onFinish();
      }, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-[#17043E] text-white transition-all
        ${isFadingOut ? "animate-fadeOut" : ""}`}
    >
      {/* Logo or Placeholder */}
    <div className="w-28 h-28 mb-6 bg-white rounded-full flex items-center justify-center overflow-hidden">
  <img 
    src="/logoOyin.png" 
    alt="Logo" 
    className="object-contain w-24 h-24 sm:w-28 sm:h-28" 
  />
</div>


      {/* Main Heading */}
      <h1 className="text-5xl font-brookshire mb-4 animate-fadeInUp">
        Nuella Creatives
      </h1>

      {/* Tagline */}
      <p className="text-lg font-poppins animate-fadeInUp delay-300">
        Where thoughts meet beauty
      </p>
    </div>
  );
};

export default SplashScreen;

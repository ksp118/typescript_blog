import { FaChevronDown } from "react-icons/fa";

interface ScrollIndicatorProps {
  scrollToId: string;
}

const ScrollIndicator = ({ scrollToId }: ScrollIndicatorProps) => {
  const handleClick = () => {
    const target = document.getElementById(scrollToId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
    >
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center animate-bounce">
        <FaChevronDown className="text-white text-xl" />
      </div>
    </div>
  );
};

export default ScrollIndicator;

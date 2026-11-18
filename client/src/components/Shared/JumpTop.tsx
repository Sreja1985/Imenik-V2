import { useState, useEffect } from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";

const JumpTop: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const screenHeight = window.innerHeight;

      if (scrollPosition > screenHeight / 3) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section>
      {show && (
        <BsArrowUpCircleFill
          className="jumptop"
          onClick={scrollToTop}          
        />
      )}
    </section>
  );
};

export default JumpTop;

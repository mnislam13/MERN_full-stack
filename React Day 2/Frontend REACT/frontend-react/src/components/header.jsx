import Button from "./button";
import "./header.style.css"

function Header() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header className="header-style">
        <button className="header-elements" onClick={() => scrollToSection('home')}>Home</button>
        <button className="header-elements" onClick={() => scrollToSection('about')}>About</button>
        <button className="header-elements" onClick={() => scrollToSection('contact')}>Contact Us</button>
      </header>
    </>
  );
}

export default Header
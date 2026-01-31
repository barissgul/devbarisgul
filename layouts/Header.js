"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const translations = {
  en: {
    "Home": "Home",
    "About Me": "About Me",
    "What I Do": "What I Do",
    "Works": "Works",
    "Hire Me": "Hire Me",
  },
  tr: {
    "Home": "Anasayfa",
    "About Me": "Hakkımda",
    "What I Do": "Ne Yapıyorum",
    "Works": "Projeler",
    "Hire Me": "İletişim",
  },
};

const Header = ({
  activePage,
  menus = [
    { id: 1, href: "/", text: "Home" },
    { id: 2, href: "/about", text: "About Me" },
    { id: 3, href: "/services", text: "What I Do" },
    { id: 4, href: "/works", text: "Works" },
    { id: 6, href: "/contact", text: "Hire Me" },
  ],
  extraClass = "",
}) => {
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLabel = (text) => {
    return translations[language]?.[text] ?? text;
  };

  // Dil değiştiğinde menü linklerinin dataset.text değerlerini güncelle
  useEffect(() => {
    const menuLinks = document.querySelectorAll(".d-menu-1 li a");
    menuLinks.forEach((link) => {
      const textContent = link.textContent.trim();
      if (textContent) {
        link.dataset.text = textContent;
      }
    });
  }, [language, menus]);

  return (
    <div className={`d-menu-1 wow ${extraClass} ${mobileMenuOpen ? "mobile-menu-open" : ""}`} data-wow-delay=".3s">
      <div className="d-menu-1-inner">
        <button
          type="button"
          className="d-menu-1-hamburger"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className="mb-0 d-menu-1-list">
          {menus.map((item, index) => (
            <li
              key={index}
              className={`${activePage == item.id ? "active" : ""} menu-item-${
                item.id
              }`}
            >
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                data-text={
                  activePage === (item.href === "/" ? "home" : item.href.slice(1))
                    ? (item.href === "/" ? getLabel("Home") : getLabel(item.text))
                    : getLabel(item.text)
                }
              >
                {activePage ===
                (item.href === "/" ? "home" : item.href.slice(1)) ? (
                  <span>
                    {item.href === "/"
                      ? getLabel("Home")
                      : getLabel(item.text)}
                  </span>
                ) : (
                  getLabel(item.text)
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Header;

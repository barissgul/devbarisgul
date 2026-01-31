"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FloatingLangSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="floating-lang-switcher" aria-label="Dil seçin / Choose language">
      <button
        type="button"
        className={`floating-lang-btn ${language === "tr" ? "active" : ""}`}
        onClick={() => changeLanguage("tr")}
        aria-pressed={language === "tr"}
      >
        TR
      </button>
      <button
        type="button"
        className={`floating-lang-btn ${language === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
        aria-pressed={language === "en"}
      >
        EN
      </button>
    </div>
  );
}

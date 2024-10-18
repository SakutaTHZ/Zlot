import React, { useState } from "react";

const ThemeBox = () => {
  const [selectedTheme, setSelectedTheme] = useState("default");

  // Function to handle radio button clicks
  const handleThemeChange = (theme) => {
    const classNames = ["default", "forest", "zen"];
    resetClasses(classNames)
    setSelectedTheme(theme);
    if (theme === "default") {
        document.documentElement.style.setProperty("--backgroundColor", "#191919");
        document.documentElement.style.setProperty("--boxColor", "#2c2c2c");
        document.documentElement.style.setProperty("--lightColor", "#ffff7c");
      } else if (theme === "forest") {
        document.documentElement.style.setProperty("--backgroundColor", "#1A3636");
        document.documentElement.style.setProperty("--boxColor", "#626F47");
        document.documentElement.style.setProperty("--lightColor", "#FEFAE0");
      } else if (theme === "zen") {
        document.documentElement.style.setProperty("--backgroundColor", "#001F3F");
        document.documentElement.style.setProperty("--boxColor", "#16325B");
        document.documentElement.style.setProperty("--lightColor", "#78B7D0");
      }
    document.querySelector('.slotMachine').classList.add(theme);
    document.querySelector('body').classList.add(theme);
    console.log(`Selected theme: ${theme}`);
  };

  const resetClasses= (classNames)=>{
    classNames.forEach(element => {
        document.querySelector('.slotMachine').classList.remove(element)
        document.querySelector('body').classList.remove(element);
    });
  }

  return (
    <div className="theme flex flex-col gap-4 py-4">
      <h1 className="text-2xl pb-2">Theme</h1>

      <div className="flex flex-wrap gap-3">
        {/* Default */}
        <label className="flex items-center gap-2 border border-neutral-700 px-2 py-1 rounded-md">
          <input
            type="radio"
            name="theme"
            checked={selectedTheme === "default"}
            onChange={() => handleThemeChange("default")}
          />
          <span>Default</span>
        </label>

        {/* Forest */}
        <label className="flex items-center gap-2 border border-neutral-700 px-2 py-1 rounded-md">
          <input
            type="radio"
            name="theme"
            checked={selectedTheme === "forest"}
            onChange={() => handleThemeChange("forest")}
          />
          <span>Forest</span>
        </label>

        {/* Zen*/}
        <label className="flex items-center gap-2 border border-neutral-700 px-2 py-1 rounded-md">
          <input
            type="radio"
            name="theme"
            checked={selectedTheme === "zen"}
            onChange={() => handleThemeChange("zen")}
          />
          <span>Zen</span>
        </label>
      </div>
    </div>
  );
};

export default ThemeBox;

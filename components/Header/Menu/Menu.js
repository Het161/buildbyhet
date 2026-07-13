import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MENULINKS } from "../../../constants";

const Menu = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";

  useEffect(() => {
    const anchorNodes = document.querySelectorAll(".menu a");

    const closeMenu = () => {
      const checkbox = document.querySelector(".checkbox-toggle");
      if (checkbox) checkbox.checked = false;
    };

    anchorNodes.forEach((el) => el.addEventListener("click", closeMenu));

    return () => {
      anchorNodes.forEach((el) => el.removeEventListener("click", closeMenu));
    };
  }, []);

  return (
    <div className="menu fixed top-0 left-0 w-full h-full overflow-hidden invisible pointer-events-none flex items-center justify-center">
      <div className="flex-none overflow-hidden flex items-center justify-center">
        <div className="text-center opacity-0 overflow-y-auto overflow-x-hidden flex flex-none justify-center items-center max-h-screen">
          <ul className="list-none py-4 px-0 m-0 block max-h-screen">
            {MENULINKS.map((el) => (
              <li key={el.name} className="p-0 m-6 text-2xl block">
                <a
                  className="link relative inline font-mono font-bold text-5xl duration-300 hover:no-underline"
                  href={isHome ? `#${el.ref}` : `/#${el.ref}`}
                >
                  {el.name}
                </a>
              </li>
            ))}
            <li className="p-0 m-6 text-2xl block">
              <Link
                className="link relative inline font-mono font-bold text-5xl duration-300 hover:no-underline"
                href="/certifications"
              >
                Certifications
              </Link>
            </li>
            <li className="p-0 m-6 text-2xl block">
              <a
                className="link relative inline font-mono font-bold text-5xl duration-300 hover:no-underline"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;

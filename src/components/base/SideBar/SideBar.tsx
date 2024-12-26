import { useLocation, useNavigate } from "react-router-dom";
import Columns from "./Menu";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const SideBar = () => {
  const navigation = useNavigate();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);
  const location = useLocation();

  const toggleSubmenu = (menuTo: string) => {
    setOpenSubmenu((prev) => (prev === menuTo ? null : menuTo));
  };

  const handleSubMenuClick = (subMenuTo: string) => {
    setActiveSubmenu(subMenuTo); 
    navigation(subMenuTo);
  };

  return (
    <div className="hidden bg-white md:flex max-h-full min-h-full min-w-60 overflow-y-scroll no-scrollbar transition-all md:flex-col gap-2 py-10">
      {Columns.map((menu, index) => {
        const isActive =
          (location.pathname.startsWith(menu.to) && menu.to !== "/") ||
          location.pathname === menu.to;
        const isSubmenuOpen = openSubmenu === menu.to;

        return (
          <div key={index}>
            <div
              onClick={() => {
                toggleSubmenu(menu.to);
                if (!menu.subMenu) {
                  navigation(menu.to);
                }
              }}
              className={`relative transition-all cursor-pointer hover:bg-white py-1 font-semibold text-sm font-inter min-h-12 flex items-center gap-2 ${
                isActive ? "bg-white" : ""
              }`}
            >
              {isActive && (
                <div className="h-full bg-red w-[2px] rounded-r-lg absolute"></div>
              )}
              {menu.icon && (
                <div className="icon-wrapper">
                  {React.createElement(menu.icon, {
                    className: "h-8 w-10 pl-4 text-gray-500 font-normal",
                  })}
                </div>
              )}
              <span
                style={{
                  color: isActive ? "black" : "gray",
                  fontWeight: "normal",
                }}
              >
                {menu.name}
              </span>
              {menu.subMenu && menu.subMenu.length > 0 && (
                <div
                  onClick={(event: React.MouseEvent) => {
                    event.stopPropagation();
                    toggleSubmenu(menu.to);
                  }}
                  className={`w-4 z-10 origin-center transition-all h-4 absolute right-2 ${
                    isSubmenuOpen ? "rotate-180" : ""
                  }`}
                >
                  <IoIosArrowDown className="h-4 w-4 text-blue-500" />
                </div>
              )}
            </div>
            {menu.subMenu && isSubmenuOpen && (
              <div className="min-h-14 transition-all">
                {menu.subMenu.map((subMenu, subIndex) => {
                  const isSubActive =
                    location.pathname.startsWith(subMenu.to) ||
                    location.pathname === subMenu.to;

                  const isActiveSubmenu = activeSubmenu === subMenu.to;

                  return (
                    <div
                      key={subIndex}
                      onClick={() => handleSubMenuClick(subMenu.to)}
                      className={`relative transition-all cursor-pointer pl-7 hover:bg-white py-2 font-semibold text-sm font-inter min-h-14 flex items-center gap-3 ${
                        isSubActive ? "bg-white" : ""
                      }`}
                    >
                      {subMenu.icon && (
                        <div className="icon-wrapper">
                          {React.createElement(subMenu.icon, {
                            className: `h-4 w-4 font-normal ${
                              isActiveSubmenu
                                ? "text-blue-500"
                                : "text-gray-500"
                            }`,
                          })}
                        </div>
                      )}
                      <span
                        className={`font-normal ${
                          isSubActive || isActiveSubmenu
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      >
                        {subMenu.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;

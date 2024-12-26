// import { NotificationIcon } from "assets/images/svg";
// import { useRef } from "react";
// import UserImage from "assets/images/png/user.png"; // Adjust the path as needed
// import { IoLogOut } from 'react-icons/io5';
// import { Menu } from 'primereact/menu';

// const Header = () => {
//   const menu = useRef<any>();

//   const onLogout = () => {
//     window.location.href = './login';
//     localStorage.clear();
//   };

//   const items = [
//     {
//       icon: <IoLogOut className="mr-2 w-5 h-5" />,
//       label: 'Sign Out',
//       className: 'text-sm',
//       command: () => onLogout(),
//     },
//   ];

//   return (
//     <div className="h-16 shadow-md min-h-16 px-3 md:grid md:grid-cols-3 bg-white items-center flex w-full justify-self-start">
//       <div
//         style={{ fontSize: "16px" }}
//         className="flex items-start justify-start font-inter font-bold"
//       >
//         T & K Food Mart
//       </div>

//       <div className="fixed top-0 right-0 p-4 md:flex gap-4 items-center hidden">
//         <div className="relative">
//           <NotificationIcon className="w-6 h-6" />
//         </div>
//         <div>
//           <img
//             className="h-8 w-8 rounded-full hover:border-[2px] hover:border-red-400"
//             src={UserImage}
//             alt="User"
//             onClick={(e) => menu.current?.toggle(e)}
//           />
//            <Menu model={items} popup ref={menu} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import UserImage from "assets/images/png/users.png";

const Header = () => {
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    window.location.href = './login';
    localStorage.clear();
  };

  return (
    <>
      <div className="h-16 shadow-md px-3 bg-white flex items-center justify-between w-full relative">
        <div className="text-lg font-bold">
          T & K Food Mart
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="focus:outline-none"
            >
              <img
                className="h-8 w-8 rounded-full hover:border-[2px] hover:border-red-400"
                src={UserImage}
                alt="User"
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                onBlur={() => setShowDropdown(false)}
              >
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    setShowSignOutDialog(true);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="w-4 h-4 mr-2"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sign Out Dialog */}
      {showSignOutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Sign Out</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to sign out? You'll need to sign in again to access your account.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSignOutDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
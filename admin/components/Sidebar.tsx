'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaAngleDown,
  FaAngleUp,
  FaUserTie,
  FaUser,
  FaGlobe,
  FaListAlt,
  FaFlag,
} from 'react-icons/fa';

// --- Navigation Structure ---
const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: FaTachometerAlt },
  {
    name: 'User Management',
    href: '#',
    icon: FaUsers,
    subNav: [
      { name: 'Frontend Users', href: '/users/frontend', icon: FaUser },
      { name: 'Admin Users', href: '/users/admin', icon: FaUserTie },
    ],
  },
  {
    name: 'Packages',
    href: '#', // keep '#' if you just want it collapsible
    icon: FaBoxOpen,
    isCollapsible: true,
    subNav: [
      {
        name: 'Categories',
        href: '/categories',
        icon: FaListAlt,
      },
      {
        name: 'Subcategories',
        href: '/categories/subcategory',
        icon: FaGlobe,
      },
      {
        name: 'Countries',
        href: '/categories/subcategory/countries',
        icon: FaFlag,
      },
    ],
  },
];


// --- Sidebar Component ---
const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openNestedMenu, setOpenNestedMenu] = useState<string | null>(null);

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
    setOpenNestedMenu(null);
  };

  const toggleNestedMenu = (name: string) => {
    setOpenNestedMenu(openNestedMenu === name ? null : name);
  };

  const isNavItemActive = (item: any) => {
    if (item.href !== '#') {
      if (pathname === item.href) return true;
    }
    if (item.subNav) {
      return item.subNav.some(
        (subItem: any) =>
          pathname === subItem.href ||
          (subItem.nestedSubNav &&
            subItem.nestedSubNav.some(
              (nested: any) => pathname === nested.href
            ))
      );
    }
    return pathname === item.href;
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full sticky top-0">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Hub
      </div>

      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = isNavItemActive(item);
          const isMenuOpen = openMenu === item.name;

          return (
            <div key={item.name}>
              {/* --- Main Item Row --- */}
              <div className="flex justify-between items-center">
                {/* Navigation Link */}
                <Link
                  href={item.href}
                  className={`flex-grow flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>

                {/* Toggle Arrow (for collapsible menus) */}
                {item.subNav && (item.isCollapsible || item.href === '#') && (
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`p-3 ml-2 rounded-lg transition-colors focus:outline-none ${
                      isMenuOpen
                        ? 'bg-blue-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    aria-label={`Toggle ${item.name} sub-menu`}
                  >
                    {isMenuOpen ? <FaAngleUp size={14} /> : <FaAngleDown size={14} />}
                  </button>
                )}
              </div>

              {/* --- Sub Navigation --- */}
              {item.subNav && isMenuOpen && (
                <div className="pl-6 pt-1 space-y-1">
                  {item.subNav.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    const isNestedMenuOpen = openNestedMenu === subItem.name;
                    const isAnyNestedActive =
                      subItem.nestedSubNav &&
                      subItem.nestedSubNav.some(
                        (nested) => pathname === nested.href
                      );

                    // --- Nested Sub Nav (e.g., Countries) ---
                    if (subItem.nestedSubNav) {
                      return (
                        <div key={subItem.name}>
                          <div className="flex justify-between items-center">
                            <Link
                              href={subItem.href}
                              className={`flex-grow flex items-center space-x-3 p-2 text-sm rounded-lg transition-colors ${
                                isSubActive || isAnyNestedActive
                                  ? 'bg-gray-700 text-blue-300 font-medium'
                                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                              }`}
                            >
                              {subItem.icon && <subItem.icon size={14} />}
                              <span>{subItem.name}</span>
                            </Link>

                            <button
                              onClick={() => toggleNestedMenu(subItem.name)}
                              className={`p-2 rounded-lg transition-colors focus:outline-none ${
                                isNestedMenuOpen
                                  ? 'bg-gray-700 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              }`}
                            >
                              {isNestedMenuOpen ? (
                                <FaAngleUp size={12} />
                              ) : (
                                <FaAngleDown size={12} />
                              )}
                            </button>
                          </div>

                          {isNestedMenuOpen && (
                            <div className="pl-4 pt-1 space-y-1">
                              {subItem.nestedSubNav.map((nestedItem) => {
                                const isNestedActive =
                                  pathname === nestedItem.href;
                                return (
                                  <Link
                                    key={nestedItem.name}
                                    href={nestedItem.href}
                                    className={`flex items-center p-2 text-xs rounded-lg transition-colors ${
                                      isNestedActive
                                        ? 'bg-gray-600 text-blue-300 font-medium'
                                        : 'text-gray-500 hover:bg-gray-600 hover:text-white'
                                    }`}
                                  >
                                    {nestedItem.name}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    // --- Standard Sub Nav Items ---
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`flex items-center space-x-3 p-2 text-sm rounded-lg transition-colors ${
                          isSubActive
                            ? 'bg-gray-700 text-blue-300 font-medium'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {subItem.icon && <subItem.icon size={14} />}
                        <span>{subItem.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 text-xs text-gray-500 border-t border-gray-700">
        &copy; 2025 Travabay Admin
      </div>
    </div>
  );
};

export default Sidebar;

"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaBars,
  FaTimes,
  FaSearch,
  FaMinus,
  FaPlus,
  FaUserCircle,
  FaShoppingCart,
} from "react-icons/fa";
import Modal from "./CorporateModal";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  //Dummy data for categories
  const categories = [
    {
      name: "International Trips",
      subcategories: [
        { name: "Europe", link: "/trips" },
        { name: "Asia", link: "/trips" },
        { name: "America", link: "/trips" },
        { name: "Europe", link: "/international/europe" },
        { name: "Asia", link: "/trips" },
        { name: "America", link: "/trips" },
        { name: "Europe", link: "/international/europe" },
        { name: "Asia", link: "/trips" },
        { name: "America", link: "/trips" },
        { name: "Europe", link: "/international/europe" },
        { name: "Asia", link: "/trips" },
        { name: "America", link: "/trips" },
        { name: "Europe", link: "/international/europe" },
        { name: "Asia", link: "/trips" },
        { name: "America", link: "/trips" },
      ],
    },
    {
      name: "India Trips",
      subcategories: [
        { name: "North India", link: "/india/" },
        { name: "South India", link: "/india/south" },
        { name: "East India", link: "/india/east" },
      ],
    },
    {
      name: "Weekend Trips",
      subcategories: [
        { name: "Hill Stations", link: "/weekend/hills" },
        { name: "Beaches", link: "/weekend/beach" },
        { name: "City Breaks", link: "/weekend/city" },
      ],
    },
    {
      name: "Group Tours",
      subcategories: [
        { name: "Family Tours", link: "/group/family" },
        { name: "Friends Tours", link: "/group/friends" },
        { name: "Corporate Tours", link: "/group/corporate" },
      ],
    },
  ];
  const getColumnClass = (subcategories) => {
    if (subcategories.length > 16) {
      return styles.threeColumns; // 3 columns
    } else if (subcategories.length > 8) {
      return styles.twoColumns; // 2 columns
    } else {
      return ""; // 1 column
    }
  };
  //Search Bar
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchData = [
    { name: "Upcoming Trips", link: "/upcomingtrips" },
    { name: "About Us", link: "/about" },
    { name: "Gallery", link: "/gallery" },
    { name: "Corporate Bookings", link: "/corporate" },
    { name: "Blog", link: "/blogs" },
    { name: "Contact Us", link: "/contact" },
    { name: "International Trips", link: "/international" },
    { name: "Europe", link: "/international/europe" },
    { name: "Asia", link: "/trips" },
    { name: "America", link: "/international/america" },
    { name: "India Trips", link: "/india" },
    { name: "North India", link: "/india/north" },
    { name: "South India", link: "/india/south" },
    { name: "East India", link: "/india/east" },
    { name: "Weekend Trips", link: "/weekend" },
    { name: "Group Tours", link: "/group" },
  ];
  const filteredResults = searchData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.searchBar}`)) {
        setShowResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setIsLoggedIn(true);
        setUserName(user.fullName || user.email); // Use full name or fallback to email
      } catch (e) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
     // 1. Check Auth Status on component mount
     checkAuthStatus();
    // Calculate scrollbar width aur CSS variable me set karo
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.setProperty(
      "--scrollbar-compensate",
      `${scrollbarWidth}px`
    );
  }, []);

  // Modal Hooks and Handlers
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCorporateModalOpen, setIsCorporateModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const handleNavClick = () => {
    setMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  // State for form data and errors
  const [corporateForm, setCorporateForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    destination: "",
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    gender: "",
    address: "",
  });
  const [forgotPasswordForm, setForgotPasswordForm] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  // Modal handlers
  const openCorporateModal = () => setIsCorporateModalOpen(true);
  const closeCorporateModal = () => {
    setIsCorporateModalOpen(false);
    setCorporateForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      destination: "",
    });
    setErrors({});
  };
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginForm({ email: "", password: "" });
    setErrors({});
  };
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
    setRegisterForm({
      fullName: "",
      username: "",
      cpassword: "",
      gender: "",
      address: "",
      email: "",
      password: "",
      phone: "",
    });
    setErrors({});
  };
  const openForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
    setForgotPasswordForm({ email: "" });
    setErrors({});
  };

  // Validation functions
  const validateCorporate = () => {
    const newErrors = {};
    if (!corporateForm.name) newErrors.name = "Name is required";
    if (!corporateForm.email || !/^\S+@\S+\.\S+$/.test(corporateForm.email))
      newErrors.email = "Valid email is required";
    if (!corporateForm.phone || !/^\+?\d{10,12}$/.test(corporateForm.phone))
      newErrors.phone = "Valid phone number is required";
    if (!corporateForm.company) newErrors.company = "Company name is required";
    if (!corporateForm.destination)
      newErrors.destination = "Destination is required";
    return newErrors;
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginForm.email || !/^\S+@\S+\.\S+$/.test(loginForm.email))
      newErrors.email = "Valid email is required";
    if (!loginForm.password || loginForm.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!registerForm.fullName) newErrors.fullName = "Full name is required";
    if (!registerForm.username || registerForm.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";

    if (!registerForm.email || !/^\S+@\S+\.\S+$/.test(registerForm.email))
      newErrors.email = "Valid email is required";

    if (!registerForm.password || registerForm.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (registerForm.password !== registerForm.cpassword)
      newErrors.cpassword = "Passwords do not match";

    if (!registerForm.phone || !/^\+?\d{10,12}$/.test(registerForm.phone))
      newErrors.phone = "Valid phone number is required";

    if (!registerForm.gender) newErrors.gender = "Please select your gender";

    if (!registerForm.address) newErrors.address = "Address is required";

    return newErrors;
  };

  const validateForgotPassword = () => {
    const newErrors = {};
    if (
      !forgotPasswordForm.email ||
      !/^\S+@\S+\.\S+$/.test(forgotPasswordForm.email)
    )
      newErrors.email = "Valid email is required";
    return newErrors;
  };

  // Form submission handlers
  const handleCorporateSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateCorporate();
    if (Object.keys(newErrors).length === 0) {
      toast.success("Enquiry sent successfully!");
      closeCorporateModal();
    } else {
      toast.error("Please fix the errors in the form!");
      setErrors(newErrors);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateLogin(); 

    if (Object.keys(newErrors).length === 0) {
      setErrors({}); 

      try {
        const dataToSend = {
          email: loginForm.email,
          password: loginForm.password,
        };

        const response = await fetch("http://localhost:5000/api/users/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success(result.message || "Logged in successfully!");
          localStorage.setItem("userToken", result.token);
          localStorage.setItem("userData", JSON.stringify(result.user));
          checkAuthStatus(); 
          closeLoginModal();
        } else {
          toast.error(result.message || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Network error. Could not connect to the server.");
      }
    } else {
      toast.error("Please enter valid credentials!");
      setErrors(newErrors);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateRegister();

    if (registerForm.password !== registerForm.cpassword) {
      newErrors.cpassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length === 0) {
      setErrors({});

      try {
        const dataToSend = {
          fullName: registerForm.fullName,
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password,
          phone: registerForm.phone,
          gender: registerForm.gender,
          address: registerForm.address,
        };

        const response = await fetch(
          "http://localhost:5000/api/users/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );

        const result = await response.json();

        if (response.ok) {
          toast.success(result.message || "Registration successful!");
          closeRegisterModal();
        } else {
          toast.error(result.message || "Registration failed on server.");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Network error. Please try again.");
      }
    } else {
      toast.error("Please fix the errors in the form!");
      setErrors(newErrors);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserName("");
    setIsProfileDropdownOpen(false);
    toast.success("Logged out successfully!");
  };
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForgotPassword();
    if (Object.keys(newErrors).length === 0) {
      toast.success("Password reset link sent!");
      closeForgotPasswordModal();
    } else {
      toast.error("Please fix the errors in the form!");
      setErrors(newErrors);
    }
  };
  const pathname = usePathname();
  //State hooks for toogling Categories
  const [openMain, setOpenMain] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <header className={styles.header}>
      <ToastContainer />
      {/* TopBar */}
      <div className={styles.topBar}>
        <div className={styles.contactInfo}>
          <span className={styles.contactItem}>
            <FaPhoneAlt /> +91 9579659074
          </span>
        </div>
        <div className={styles.languageSocial}>
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              className={styles.searchInput}
              onFocus={() => setShowResults(true)}
            />
            {showResults && searchQuery && (
              <div className={styles.searchResults}>
                {filteredResults.length > 0 ? (
                  filteredResults.map((item, index) => (
                    <Link
                      key={index}
                      href={item.link}
                      className={styles.searchResultItem}
                      onClick={() => setSearchQuery("")}
                    >
                      {item.name}
                    </Link>
                  ))
                ) : (
                  <p className={styles.noResults}>No results found</p>
                )}
              </div>
            )}
          </div>
          <div className={styles.socialIcons}>
            <a
              href="https://www.facebook.com/people/Travabay-Holidays/61555526094194/"
              className={styles.facebook}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/travabay/"
              className={styles.instagram}
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/102466205/admin/page-posts/published/"
              className={styles.linkedin}
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* MainNav */}
      <div className={styles.mainNav}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoText}>
              <span className={styles.trav}>TRAVA</span>
              <span className={styles.bay}>BAY</span>
            </span>
          </Link>
        </div>

        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Nav Links */}
        <nav className={styles.navLinks}>
          <Link
            href="/upcomingtrips"
            className={`${styles.navLink} ${
              pathname === "/upcomingtrips" ? styles.activeLink : ""
            }`}
            style={{ color: "#157DC2" }}
          >
            Upcoming Trips
          </Link>
          <Link
            href="/about"
            className={`${styles.navLink} ${
              pathname === "/about" ? styles.activeLink : ""
            }`}
          >
            About Us
          </Link>
          <Link
            href="/gallery"
            className={`${styles.navLink} ${
              pathname === "/gallery" ? styles.activeLink : ""
            }`}
          >
            Gallery
          </Link>
          <Link
            href="/corporate"
            onClick={(e) => {
              e.preventDefault();
              openCorporateModal();
            }}
            className={`${styles.navLink} ${
              pathname === "/corporate" ? styles.activeLink : ""
            }`}
          >
            Corporate Bookings
          </Link>
          <Link
            href="/blogs"
            className={`${styles.navLink} ${
              pathname === "/blogs" ? styles.activeLink : ""
            }`}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={`${styles.navLink} ${
              pathname === "/contact" ? styles.activeLink : ""
            }`}
          >
            Contact Us
          </Link>
          {/* CONDITIONAL RENDERING BLOCK FOR AUTH */}
          {!isLoggedIn ? (
            // SHOW LOGIN/REGISTER BUTTONS
            <>
              <Link
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  openLoginModal();
                }}
                className={`${styles.navLink} ${
                  pathname === "/login" ? styles.activeLink : ""
                }`}
              >
                LogIn
              </Link>
              <Link
                href="/register"
                onClick={(e) => {
                  e.preventDefault();
                  openRegisterModal();
                }}
                className={`${(styles.navLink, styles.registerLink)} ${
                  pathname === "/register" ? styles.activeLink : ""
                }`}
              >
                Register
              </Link>
            </>
          ) : (
            // SHOW PROFILE & CART ICONS
            <>
              <div className={styles.profileContainer}>
                {/* Profile Icon with Dropdown */}
                <div
                  className={styles.navIcon}
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                >
                  {/* Using an icon for the profile, e.g., FaUserCircle or FaUser */}
                  <FaUserCircle size={24} />
                </div>

                {isProfileDropdownOpen && (
                  <div className={styles.profileDropdown}>
                    <p className={styles.dropdownUsername}>Hello, {userName}</p>
                    <Link
                      href="/edit-profile"
                      className={styles.dropdownItem}
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Edit Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={styles.dropdownItem}
                      style={{ textAlign: "left" }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Icon (Assuming you need one) */}
              <Link href="/cart" className={styles.navIcon}>
                <FaShoppingCart size={24} />
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* BottomBar Categories (Desktop Only) */}
      <div className={styles.bottomBar}>
        <div className={styles.categoryLinks}>
          {categories.map((cat) => (
            <div key={cat.name} className={styles.categoryDropdown}>
              <div
                className={styles.categoryLink}
                onClick={() => toggleCategory(cat.name)}
              >
                {cat.name} ▾
              </div>

              {/* Show subcategories when the category is clicked */}
              {openCategory === cat.name && (
                <div
                  className={`${
                    styles.categoryDropdownContent
                  } ${getColumnClass(cat.subcategories)}`}
                >
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.link}
                      className={styles.dropdownItem}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Combined Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <span className={styles.closeIcon} onClick={toggleMenu}>
            <IoClose size={30} />
          </span>

          <nav className={styles.mobileNavLinks}>
            <Link
              href="/upcomingtrips"
              className={styles.navLink}
              onClick={handleNavClick}
            >
              Upcoming Trips
            </Link>
            <Link
              href="/about"
              className={styles.navLink}
              onClick={handleNavClick}
            >
              About Us
            </Link>
            <Link
              href="/gallery"
              className={styles.navLink}
              onClick={handleNavClick}
            >
              Gallery
            </Link>
            <Link
              href="/corporate"
              onClick={(e) => {
                e.preventDefault();
                openCorporateModal();
                setMenuOpen(false);
              }}
              className={styles.navLink}
            >
              Corporate Bookings
            </Link>
            <Link
              href="/blogs"
              className={styles.navLink}
              onClick={handleNavClick}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={styles.navLink}
              onClick={handleNavClick}
            >
              Contact Us
            </Link>
            {!isLoggedIn ? (
              // SHOW LOGIN/REGISTER LINKS IN MOBILE
              <>
                <Link
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    openLoginModal();
                    setMenuOpen(false);
                  }}
                  className={styles.navLink}
                >
                  LogIn
                </Link>
                <Link
                  href="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    openRegisterModal();
                    setMenuOpen(false);
                  }}
                  className={styles.navLink}
                >
                  Register
                </Link>
              </>
            ) : (
              // SHOW USER OPTIONS IN MOBILE
              <>
                <div className={styles.navLink} style={{ fontWeight: "bold" }}>
                  Hello, {userName}
                </div>
                <Link
                  href="/edit-profile"
                  className={styles.navLink}
                  onClick={handleNavClick}
                >
                  Edit Profile
                </Link>
                <Link
                  href="/cart"
                  className={styles.navLink}
                  onClick={handleNavClick}
                >
                  Cart
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    handleNavClick(); // Close the mobile menu after logging out
                  }}
                  className={styles.navLink}
                  style={{ textAlign: "left" }}
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          <div className={styles.mobileCategories}>
            {/* Main Accordion */}
            <div
              className={styles.categoryHeader}
              onClick={() => setOpenMain(!openMain)}
            >
              <span>Categories</span>
              <span className={styles.toggleIcon}>
                {openMain ? <FaMinus /> : <FaPlus />}
              </span>
            </div>

            {/* Show all categories only if main is open */}
            {openMain && (
              <div className={styles.categoriesList}>
                {categories.map((cat) => (
                  <div key={cat.name} className={styles.categoryItem}>
                    <div
                      className={styles.categoryHeader}
                      onClick={() => toggleCategory(cat.name)}
                    >
                      <span>{cat.name}</span>
                      <span className={styles.toggleIcon}>
                        {openCategory === cat.name ? <FaMinus /> : <FaPlus />}
                      </span>
                    </div>

                    {/* ✅ Show subcategories only when this category is open */}
                    {openCategory === cat.name &&
                      cat.subcategories.length > 0 && (
                        <div className={styles.subCategoryList}>
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.link}
                              className={styles.subCategoryItem}
                              onClick={handleNavClick}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {isCorporateModalOpen && (
          <Modal isOpen={isCorporateModalOpen} onClose={closeCorporateModal}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className={styles.modalContent}
            >
              <h2 className={styles.modalTitle}>Corporate Booking</h2>
              <form
                className={styles.modalForm}
                onSubmit={handleCorporateSubmit}
              >
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={corporateForm.name}
                    onChange={(e) =>
                      setCorporateForm({
                        ...corporateForm,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter name"
                  />
                  {errors.name && (
                    <span className={styles.error}>{errors.name}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Email Id</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    value={corporateForm.email}
                    onChange={(e) =>
                      setCorporateForm({
                        ...corporateForm,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <span className={styles.error}>{errors.email}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className={styles.formInput}
                    value={corporateForm.phone}
                    onChange={(e) =>
                      setCorporateForm({
                        ...corporateForm,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <span className={styles.error}>{errors.phone}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Company Name</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={corporateForm.company}
                    onChange={(e) =>
                      setCorporateForm({
                        ...corporateForm,
                        company: e.target.value,
                      })
                    }
                    placeholder="Enter company name"
                  />
                  {errors.company && (
                    <span className={styles.error}>{errors.company}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Destination</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={corporateForm.destination}
                    onChange={(e) =>
                      setCorporateForm({
                        ...corporateForm,
                        destination: e.target.value,
                      })
                    }
                    placeholder="Enter destination"
                  />
                  {errors.destination && (
                    <span className={styles.error}>{errors.destination}</span>
                  )}
                </div>
                <button type="submit" className={styles.submitButton}>
                  Send Enquiry
                </button>
              </form>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoginModalOpen && (
          <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className={styles.modalContent}
            >
              <h2 className={styles.modalTitle}>Log In</h2>
              <form className={styles.modalForm} onSubmit={handleLoginSubmit}>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className={styles.error}>{errors.email}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input
                    type="password"
                    className={styles.formInput}
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <span className={styles.error}>{errors.password}</span>
                  )}
                </div>
                <button type="submit" className={styles.submitButton}>
                  Log In
                </button>
                <p className={styles.forgotPassword}>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openForgotPasswordModal();
                    }}
                  >
                    Forgot Password?
                  </Link>
                </p>
              </form>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRegisterModalOpen && (
          <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className={styles.modalContent}
            >
              <h2 className={styles.modalTitle}>Register</h2>
              <form
                className={styles.modalForm}
                onSubmit={handleRegisterSubmit}
              >
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={registerForm.fullName}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        fullName: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <span className={styles.error}>{errors.fullName}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Username</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={registerForm.username}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        username: e.target.value,
                      })
                    }
                    placeholder="Enter your Username"
                  />
                  {errors.username && (
                    <span className={styles.error}>{errors.username}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className={styles.error}>{errors.email}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input
                    type="password"
                    className={styles.formInput}
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <span className={styles.error}>{errors.password}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className={styles.formInput}
                    value={registerForm.cpassword}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        cpassword: e.target.value,
                      })
                    }
                    placeholder="Confirm your password"
                  />
                  {errors.cpassword && (
                    <span className={styles.error}>{errors.cpassword}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className={styles.formInput}
                    value={registerForm.phone}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <span className={styles.error}>{errors.phone}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Gender</label>
                  <select
                    className={styles.formInput}
                    value={registerForm.gender}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <span className={styles.error}>{errors.gender}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Address</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={registerForm.address}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        address: e.target.value,
                      })
                    }
                    placeholder="Enter your full street address"
                  />
                  {errors.address && (
                    <span className={styles.error}>{errors.address}</span>
                  )}
                </div>
                <button type="submit" className={styles.submitButton}>
                  Register
                </button>
              </form>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isForgotPasswordModalOpen && (
          <Modal
            isOpen={isForgotPasswordModalOpen}
            onClose={closeForgotPasswordModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className={styles.modalContent}
            >
              {/* <button
                className={styles.closeButton}
                onClick={closeForgotPasswordModal}
              >
                &times;
              </button> */}
              <h2 className={styles.modalTitle}>Forgot Password</h2>
              <form
                className={styles.modalForm}
                onSubmit={handleForgotPasswordSubmit}
              >
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    value={forgotPasswordForm.email}
                    onChange={(e) =>
                      setForgotPasswordForm({
                        ...forgotPasswordForm,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className={styles.error}>{errors.email}</span>
                  )}
                </div>
                <button type="submit" className={styles.submitButton}>
                  Reset Password
                </button>
                <p className={styles.forgotPassword}>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      closeForgotPasswordModal();
                      openLoginModal();
                    }}
                  >
                    Back to Log In
                  </Link>
                </p>
              </form>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

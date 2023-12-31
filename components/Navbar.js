import Link from "next/link";
import { useState } from "react";
import { countries } from "./countriesOne";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logodropdownOpen, setLogodropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    filterCountries(value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleLogoDropdown = () => {
    setLogodropdownOpen(!logodropdownOpen);
  };

  const closeLogoDropdown = () => {
    setLogodropdownOpen(false);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const filterCountries = (query) => {
    const filtered = countries.filter((country) =>
      country.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const { data: session } = useSession();

  return (
    <div>
      <nav className=" w-full bg-gray-800 shadow nav-main">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link href="/">
                <h2 className="text-2xl text-white font-bold">ROAMCRAZE</h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white">
                  <Link href="/">HOME</Link>
                </li>

                <li className="text-white">
                  <Link href="/About">ABOUT US</Link>
                </li>
                {/* <li className="text-white">
                  <Link href="/Destination">Destinations</Link>
                  </li> */}
                <li className="relative">
                  <button
                    type="button"
                    className="flex items-center text-white focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    DESTINATIONS
                    <svg
                      className="w-4 h-4 ml-1 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute z-10 w-56 mt-2 space-y-2 bg-white rounded-md shadow-lg">
                      <div className="px-4">
                        <input
                          type="text"
                          className="w-full border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={handleInputChange}
                        />
                      </div>
                      {filteredCountries.map(({ name, title }) => (
                        <a
                          key={name}
                          href={`/${name}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdown}
                        >
                          {title}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
                <li className="text-white">
                  <Link href="/Contact">CONTACT US</Link>
                </li>

                {/* Handle Login */}

                <li className="text-white">
                  {session?.user ? (
                    <>
                      <div className="relative ml-3">
                        <div>
                          <button
                            type="button"
                            class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-800"
                            id="user-menu-button"
                            aria-expanded="false"
                            aria-haspopup="true"
                            onClick={toggleLogoDropdown}
                          >
                            <span class="sr-only">Open user menu</span>
                            <img
                              class="h-8 w-8 rounded-full"
                              src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
                              alt="git"
                            />
                          </button>
                          {logodropdownOpen && (
                            <div
                              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="user-menu-button"
                              tabindex="-1"
                            >
                              <a
                                href="#"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                role="menuitem"
                                tabindex="-1"
                                id="user-menu-item-0"
                              >
                                {session.user.name}
                              </a>

                              <a
                                  href="#"
                                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  role="menuitem"
                                  tabindex="-1"
                                  id="user-menu-item-0"
                                  onClick={closeLogoDropdown}
                                >
                              <button onClick={() => signOut()}>
                                
                                  SIGN OUT
                                
                              </button>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <button onClick={() => signIn()}>SIGN IN</button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
import { Link } from "react-router-dom";


const menuLists = [
  { name: "What We Do", link: "/what-we-do" },
  { name: "Who We Are", link: "/who-we-are" },
  { name: "Contact Us", link: "/contact-us" },
  { name: "Products", link: "/products" },
];

function MobileMenu({ closeMenu }: any) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeMenu}
      ></div>

      <div
        className="
          bg-[#3CBDE6]
          relative w-full max-w-full h-[75vh]
          text-white
          rounded-t-3xl
          shadow-xl
          flex flex-col p-6 space-y-8
          transform transition-transform duration-300
        "
      >
        <button
          onClick={closeMenu}
          className="self-end text-white text-2xl font-bold focus:outline-none"
        >
          ×
        </button>

        <nav className="flex-1 flex flex-col justify-center">
          <ul className="flex flex-col justify-center space-y-6 text-lg font-semibold text-center">
             {menuLists.map((item, index) => (
            <li
              onClick={()=> closeMenu(true)}
              key={index}
              className="rounded-3xl transition-colors duration-200 hover:bg-[#3CBDE6] hover:text-white"
            >
              <Link
                to={item.link}
                className={`block px-4 py-2 text-2xl ${
                  location.pathname === item.link
                    ? "rounded-3xl bg-[#3CBDE6] text-white"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
           
          </ul>
        </nav>

        
      </div>
    </div>
  );
}

export default MobileMenu;
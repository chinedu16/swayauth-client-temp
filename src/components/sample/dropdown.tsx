import DropDown from "../dropDown";

const Dropdown = () => {
  return <DropDown.Container>
    <DropDown.Toggle className="text-red-200">
      <p>Hello</p>
    </DropDown.Toggle>
    <DropDown.Body className="inline-block left-0 top-[100%]">
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 bg-black">
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
        </li>
      </ul>
    </DropDown.Body>
  </DropDown.Container>;
};

export default Dropdown;

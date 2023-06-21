import { Children } from "react"
import classNames from "classnames"
interface DropDownProps {
  children: unknown
  setCurrentDropDown: (key: string) => void
  currentDropDown: string
  label: string
}
const DropDown = ({ currentDropDown, setCurrentDropDown, children, label }: DropDownProps) => {
  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        data-dropdown-trigger="click"
        onClick={() => setCurrentDropDown(currentDropDown == label ? null : label)}
        data-dropdown-toggle="dropdown"
        className="hover:bg-blue-800 px-1 focus:outline-none font-medium text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        {`${label} `}
        <svg
          class="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className={classNames(
          currentDropDown !== label && "hidden",
          "z-10 bg-white divide-y divide-gray-100 dark:bg-gray-700"
        )}>
        <ul
          className="py-2 px-2 text-sm text-neutral-700 flex flex-col justify-start items-start absolute top-[25px] left-0 w-40 gap-2 bg-neutral-300"
          aria-labelledby="dropdownDefaultButton">
          {Children.map(children, (child, index) => {
            return <li key={index}>{child}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default DropDown

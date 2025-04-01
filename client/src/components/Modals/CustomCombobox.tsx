import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

interface CustomComboboxProps<T> {
  label: string;
  options: T[];
  selected: T;
  onChange: (value: T) => void;
  displayValue?: (value: T) => string;
  disabledOptions?: T[];
}

export default function CustomCombobox<T extends string | number>({
  label,
  options,
  selected,
  onChange,
  displayValue = (value) => String(value),
  disabledOptions = [],
}: CustomComboboxProps<T>) {
  return (
    <div className="mt-4 relative">
      <label className="block text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <Combobox value={selected} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <Combobox.Button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-md flex justify-between items-center">
              <span>{displayValue(selected)}</span>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </Combobox.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 max-h-0"
              enterTo="opacity-100 max-h-60"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 max-h-60"
              leaveTo="opacity-0 max-h-0"
            >
              <Combobox.Options className="absolute w-full mt-1 bg-white dark:bg-gray-700 shadow-md rounded-md border border-gray-300 dark:border-gray-600 p-2 space-y-1 z-50 max-h-60 overflow-y-auto scrollbar">
                {options.map((option) => {
                  const isSelected = option === selected;
                  const isDisabled = isSelected || disabledOptions.includes(option);

                  return (
                    <Combobox.Option
                      key={String(option)}
                      value={option}
                      disabled={isDisabled}
                      className={`px-4 py-2 rounded-md flex justify-between items-center
                        ${
                          isSelected
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium cursor-not-allowed"
                            : isDisabled
                            ? "text-gray-400 cursor-not-allowed"
                            : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white cursor-pointer"
                        }`}
                    >
                      <span>{displayValue(option)}</span>
                      {isSelected && (
                        <span className="text-xs text-gray-400 ml-2">
                          (selected)
                        </span>
                      )}
                      {!isSelected && disabledOptions.includes(option) && (
                        <span className="text-xs text-gray-400 ml-2">
                          (coming soon)
                        </span>
                      )}
                    </Combobox.Option>
                  );
                })}
              </Combobox.Options>
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  );
}

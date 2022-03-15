import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import { useGlobalState } from "../../context";
import { TokenLogo } from "../token-logo";

export const TokenPicker = () => {
  const { mode, tokens, token, setToken } = useGlobalState();

  console.log(token.address);

  if (mode !== "Token") {
    return null;
  }

  return (
    <div className="w-96 mx-2">
      <Combobox value={token} onChange={setToken}>
        <div className="relative mt-1">
          <div className="relative w-full flex text-left bg-white rounded-lg shadow-md cursor-default sm:text-sm overflow-hidden">
            <TokenLogo
              logoURI={token.logoURI}
              className="p-1 rounded-full"
              size={42}
            />
            <span className="flex items-center w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900">
              {token.name}
            </span>
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {tokens.map((token) => (
                <Combobox.Option
                  key={token.address}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? "text-white bg-teal-600" : "text-gray-900"
                    }`
                  }
                  value={token}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {token.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          {token.logoURI && (
                            <TokenLogo
                              logoURI={token.logoURI}
                              size={20}
                              className="rounded-full max-w-5 max-h-5"
                            />
                          )}
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

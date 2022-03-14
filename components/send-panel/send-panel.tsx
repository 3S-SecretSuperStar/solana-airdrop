import { faDropbox } from "@fortawesome/free-brands-svg-icons";
import { faCashRegister, faSync } from "@fortawesome/pro-light-svg-icons";
import { useGlobalState } from "../../context";
import { Button } from "../button";

export const SendPanel = () => {
  const { balance, network, dropAccounts, drop, dropDev, refreshBalance } =
    useGlobalState();

  const dropAmount = dropAccounts.reduce((agg, { amount }) => agg + amount, 0);

  return (
    <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow-lg divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-base font-normal text-gray-900">Balance</dt>
        <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
          <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
            {balance}
          </div>
          <div className="flex space-x-1">
            <Button icon={faSync} onClick={refreshBalance} />
            {network === "devnet" && (
              <Button icon={faDropbox} onClick={dropDev} />
            )}
          </div>
        </dd>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-base font-normal text-gray-900">Drop Amount</dt>
        <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
          <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
            {dropAmount}
          </div>
        </dd>
      </div>

      <div className="px-4 py-5 sm:p-6">
        <dt className="text-base font-normal text-gray-900"></dt>
        <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
          <Button icon={faCashRegister} text="Send" onClick={drop} />
        </dd>
      </div>
    </dl>
  );
};

import { faCashRegister, faSync } from "@fortawesome/pro-light-svg-icons";
import { useGlobalState } from "../../context";
import { Button } from "../button";
import { DebugButton } from "./debug-button";

export const SendPanel = () => {
  const { balance, accountInfo, dropAccounts, drop, refreshBalance } =
    useGlobalState();

  const dropAmount = dropAccounts.reduce(
    (agg, { drop: amount }) => agg + amount,
    0
  );

  return (
    <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow-lg divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-base font-normal text-gray-900">SOL</dt>
        <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
          <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
            {balance.sol}
          </div>
          <div className="flex space-x-1">
            <Button icon={faSync} onClick={refreshBalance} />
            <DebugButton />
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
        <dt className="text-base font-normal text-gray-900">Send</dt>
        <dd className="mt-1 flex items-baseline md:block lg:flex">
          {balance.sol > dropAmount && dropAmount > 0 && accountInfo ? (
            <Button icon={faCashRegister} text="Send" onClick={drop} />
          ) : (
            <div className="flex items-baseline text-2xl font-semibold">
              {dropAmount === 0 ? (
                <span className="text-green-600">All good</span>
              ) : dropAmount > balance.sol ? (
                <span className="text-red-600">
                  {(dropAmount - balance.sol).toPrecision(5)}
                </span>
              ) : (
                <span className="text-red-600">Need your mnemonic</span>
              )}
            </div>
          )}
        </dd>
      </div>
    </dl>
  );
};

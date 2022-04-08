import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  
  return (
    <>
      <p className="text-gray-500 font-bold mt-10">Agendamentos</p>
      {labels.map(({ label, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              updateLabel({ label, checked: !checked })
            }
            className={`form-checkbox h-5 w-5 text-${label}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{label}</span>
        </label>
      ))}
    </>
  );
}

import { IonIcon } from "@ionic/react";
import { sparkles } from "ionicons/icons";
import { useSettings } from "../../store/store";
import classNames from "classnames";

export default function GptIntro() {
  const [selectedModel, setModel] = useSettings((state) => [
    state.settings.selectedModal,
    state.setModal,
  ]);
  const isGptThreeSelected = selectedModel.startsWith("gpt-3");
  return (
    <>
      <div className="modals md:w-1/5 md:min-w-[300px] mx-2 relative flex items-center rounded-md justify-between mt-5 md:mx-auto  bg-gray-200 dark:bg-[#202123] gap-2">
      </div>
      <div className=" h-96 flex items-center justify-start flex-col">
        <h1 className=" text-4xl font-bold mt-5 text-center text-gray-300">
          Chidori ⚡️
        </h1>
        <h3 className=" text-xl font-bold mt-5 text-center text-gray-300">
          An AI CRUD UI Maker
        </h3>
      </div>
    </>
  );
}

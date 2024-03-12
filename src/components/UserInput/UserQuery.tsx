import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import { sendOutline, send } from "ionicons/icons";
import { useRef, useState } from "react";
import useChat, { useSettings } from "../../store/store";
import { createMessage } from "../../utils/createMessage";

export default function UserQuery() {
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState({
    method: '',
    url: '',
    query: '',
  });
  const formRef = useRef<null | HTMLFormElement>(null);
  const addChat = useChat((state) => state.addChat);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectedModal = useSettings((state) => state.settings.selectedModal);

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (formRef.current) {
        formRef.current.requestSubmit();
        target.style.height = "30px";
      }
    }
  }

  function handleOnInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    setQuery(target.value);
    target.style.height = "0px";
    target.style.height = `${target.scrollHeight}px`;
  }

  const handleChange = (event :React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement >) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query) {
      addChat(createMessage("user", query, "text"));
      addChat(
        createMessage(
          "assistant",
          "",
          selectedModal.startsWith("dall-e") ? "image_url" : "text"
        )
      );
      setQuery("");
      if (textareaRef.current) textareaRef.current.style.height = "30px";
    }
  }

  return (
    <form
      className="input shadow-md dark:bg-[#40414f] bg-white  dark:border-white border-gray-700 border-2 flex items-center   rounded-md"
      onSubmit={handleOnSubmit}
      ref={formRef}
    >
      <div className="w-11/12 p-3">
        <div className="flex">
          <div>
            <label htmlFor="method" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">API Request Type</label>
            <select name="method" value={formData.method} onChange={handleChange} id="apiRequest" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white" >
              <option value="">Select an option</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>

          <div className="ml-1 mb-6 w-full">
          <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL</label>
          <input type="text" id="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white" placeholder="https://randomuser.me/api/?results=1" required />
          </div> 
        </div>

        <div className="mb-6">
        <label htmlFor="query" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Query</label>
        <textarea
          name="query"
          ref={textareaRef}
          className="px-2 py-5 text-justify w-full resize-none overflow-hidden rounded-lg dark:text-white placeholder:font-bold bg-gray-50 border border-gray-300 text-gray-900  dark:bg-gray-700 dark:border-gray-600"
          placeholder="Send a message"
          onKeyDown={handleOnKeyDown}
          onChange={handleOnInputChange}
          value={query}
          autoFocus
        ></textarea>
        </div> 
      </div>
      <div className=" w-1/12 text-center mx-2">
        <button
          type="submit"
          className={classNames(
            " text-center  text-gray-600 dark:text-white transition inline-flex items-center justify-center py-2 px-2 rounded-md",
            { "bg-green-500 dark:text-gray-200 text-white": query }
          )}
        >
          <IonIcon icon={query ? send : sendOutline} />
        </button>
      </div>
    </form>
  );
}

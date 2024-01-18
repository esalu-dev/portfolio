import { useRef, useState } from "react";
import { sendEmail } from "../services/sendEmail";

export function ContactForm({ API_KEY }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    show: boolean;
  }>({
    title: "Error!",
    message: " Please fill all the fields",
    show: false,
  });
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const messageInput = useRef<HTMLTextAreaElement>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      nameInput.current?.classList.remove("outline-red-500", "outline");
    }
    if (name === "email") {
      emailInput.current?.classList.remove("outline-red-500", "outline");
    }
    if (name === "message") {
      messageInput.current?.classList.remove("outline-red-500", "outline");
    }
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const showAlert = () => {
    setAlertInfo((prevState) => ({ ...prevState, show: true }));
    setTimeout(() => {
      setAlertInfo((prevState) => ({ ...prevState, show: false }));
    }, 5000);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.name === "") {
      nameInput.current?.classList.add("outline-red-500", "outline");
      showAlert();
      return;
    }

    if (form.email === "") {
      emailInput.current?.classList.add("outline-red-500", "outline");
      showAlert();
      return;
    }

    if (form.message === "") {
      messageInput.current?.classList.add("outline-red-500", "outline");
      showAlert();
      return;
    }

    if (!validateEmail(form.email)) {
      emailInput.current?.classList.add("outline-red-500", "outline");
      setAlertInfo((prevState) => ({
        ...prevState,
        message: " Please enter a valid email",
      }));
      showAlert();
      return;
    }

    const response = sendEmail(form, API_KEY);
    response.then((res) => {
      if (res) {
        window.location.href = "/success";
      } else {
        setAlertInfo((prevState) => ({
          ...prevState,
          message: " Something went wrong, please try again later",
        }));
        showAlert();
      }
    });
  };

  return (
    <section className="flex justify-center items-center h-dvh w-full">
      <form className="w-[400px] dark mx-10" onSubmit={handleSubmit}>
        <h2 className="font-Onest font-bold text-xl my-8 w-72">
          Let's make something great together =D
        </h2>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your name:
          </label>
          <input
            ref={nameInput}
            name="name"
            onChange={handleChange}
            value={form.name}
            id="name"
            className="font-Onest bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Freddy Mercury"
            autoComplete="on"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your email:
          </label>
          <input
            ref={emailInput}
            name="email"
            onChange={handleChange}
            value={form.email}
            id="email"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Onest"
            placeholder="youremail@esalu.site"
            autoComplete="on"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message:
          </label>
          <textarea
            ref={messageInput}
            id="message"
            rows={4}
            className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Onest"
            placeholder="Let's make an amazing website..."
            name="message"
            value={form.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="sm:mr-2 text-white bg-esalu-green-600 hover:bg-esalu-green-900 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full block mb-4 sm:inline-block sm:w-auto px-5 py-2.5 text-center font-Onest"
        >
          Submit
        </button>
        <a
          href="/"
          className=" text-white bg-woodsmoke-700 hover:bg-woodsmoke-900 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full block sm:inline-block sm:w-auto px-5 py-2.5 text-center font-Onest"
        >
          Cancel
        </a>
      </form>
      <AlertDialog
        title={alertInfo.title}
        desc={alertInfo.message}
        show={alertInfo.show}
      />
    </section>
  );
}

const AlertDialog = ({ title, desc, show }) => {
  return (
    <div
      className={`${
        show ? `opacity-100` : `opacity-0`
      } transition-opacity duration-500 font-Onest sm:right-4 sm:w-auto w-[90%] bottom-2 absolute flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{title}</span>
        {desc}
      </div>
    </div>
  );
};

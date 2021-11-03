import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";

const categories = [
  { value: "startup", label: "Startup" },
  { value: "individual", label: "Individual" },
  { value: "large-enterprise", label: "Large Enterprise" },
];

const budgets = [
  { value: "< 1K USD", label: "< 1K USD" },
  { value: "1K USD - 5K USD", label: "1K USD - 5K USD" },
  { value: "5K USD - 10K USD", label: "5K USD - 10K USD" },
  { value: "10K USD - 20K USD", label: "10K USD - 20K USD" },
  { value: "20K+ USD", label: "20K+ USD" },
];

const Form = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [prefStack, setPrefStack] = useState("");
  const [documented, setDocumented] = useState(true);
  const [budget, setBudget] = useState(budgets[0]);
  const [projectDescription, setProjectDescription] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    const formData = {
      name,
      contact,
      email,
      category,
      prefStack,
      documented,
      budget,
      projectDescription,
    };
    axios
      .post("/get-quote", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
        } else if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="w-1/2 rounded-b-lg bg-gray-200 py-5 px-5 mx-auto">
      <form onSubmit={submitForm}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="contact-number"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contact-number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-6">
          <span className="text-sm font-medium text-gray-900 block mb-2">
            How would you categorize yourself?
          </span>
          <Select
            options={categories}
            defaultValue={categories[0]}
            onChange={(value) => setCategory(value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="preferref-stack"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            Do you have a preferred tech stack? If yes, which one?
          </label>
          <input
            type="text"
            id="preferred-stack"
            value={prefStack}
            onChange={(e) => setPrefStack(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-6">
          <span className="text-sm font-medium text-gray-900 block mb-2">
            Do you have product specs or wireframes documented?
          </span>
          <Select
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ]}
            defaultValue={{ value: true, label: "Yes" }}
            onChange={(value) => setDocumented(value)}
          />
        </div>
        <div className="mb-6">
          <span className="text-sm font-medium text-gray-900 block mb-2">
            What is your estimated budget?
          </span>
          <Select
            options={budgets}
            defaultValue={budgets[0]}
            onChange={(value) => setBudget(value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="project-description"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            Describe the project in few lines
          </label>
          <textarea
            type="text"
            id="project-description"
            onChange={(e) => setProjectDescription(e.target.value)}
            value={projectDescription}
            className="bg-gray-50 h-48 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;

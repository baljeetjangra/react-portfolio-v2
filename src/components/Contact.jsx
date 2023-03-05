import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../style";
import { slideIn } from "../utils/motion";
import { EarthCanvas } from "./canvas";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_15tf2a7",
        "template_zvtyymi",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: "Baljeet",
          to_email: "baljeetjagnraa@gmail.com",
        },
        "VxYRehbY9RtCgSV0H"
      )
      .then(
        (result) => {
          setLoading(false);
          alert("Message sent successfully");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.log("error", error);
          alert("Message not sent");
        }
      );
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 rounded-2xl p-8"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.heroHeadText}>Contact.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label htmlFor="" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type={"text"}
              name={"name"}
              value={form.name}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 rounded-lg text-white placeholder:text-secondary outlined-none border-none font-medium"
              placeholder="What's your name?"
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type={"email"}
              name={"email"}
              value={form.email}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 rounded-lg text-white placeholder:text-secondary outlined-none border-none font-medium"
              placeholder="What's your email?"
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={"7"}
              name={"message"}
              value={form.message}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 rounded-lg text-white placeholder:text-secondary outlined-none border-none font-medium"
              placeholder="What do you want to say?"
            />
          </label>
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow:md shadow-primary rounded-xl"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

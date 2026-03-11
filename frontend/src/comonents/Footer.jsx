import Insta from "../assets/instagram.png";
import Link from "../assets/lindin2.png";
import Gmail from "../assets/gmail.png";
import {motion } from "framer-motion"

function Footer() {
  return (
    <>
      <div className="h-45 w-full border-t border-t-indigo-400 bg-cover  bg-center flex justify-center items-center bg-gray-100">
        <motion.div
          className=" h-30 w-150 flex flex-col gap-2 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <p className="text-xl">
            © 2026 Pawandeep Singh. All rights reserved.
          </p>
          <div className="flex gap-2 ">
            <a href="https://www.instagram.com/prince_dhima_n?igsh=OGwzaGNhOXk5Y29l">
              <img src={Insta} alt="" className=" h-10 rounded-xl" />
            </a>
            <a href="https://www.linkedin.com/in/pawandeep-65128132a">
              <img src={Link} alt="" className="h-10 rounded-xl" />
            </a>
            <a href="https://www.linkedin.com/in/pawandeep-65128132a">
              <img src={Gmail} alt="" className="h-10 rounded-xl" />
            </a>
          </div>
          <p className="text-center  ">Built with using React.js</p>
        </motion.div>
      </div>
    </>
  );
}

export default Footer;

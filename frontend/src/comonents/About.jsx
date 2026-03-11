import React from "react";
import Img from "../assets/logo.jpg";
import Abouts from "../assets/about.jpg";
import { motion } from "framer-motion";

function About() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="h-[60vh] md:h-[80vh] w-full bg-cover bg-center flex items-center text-white px-6 md:px-20"
        style={{ backgroundImage: `URL(${Img})` }}
      >
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }} // animate only when visible
          transition={{ duration: 2 }}
        >
          <p className="text-5xl md:text-7xl font-bold">About Us</p>
          <p className="text-2xl md:text-3xl font-semibold mt-6">
            People with a passion for auto parts,
            <br /> service & relationships
          </p>
        </motion.div>
      </div>

      {/* Middle Section */}
      <div className="bg-gray-100 py-20 flex flex-col items-center px-6 md:px-20 text-center">
        <motion.p
          className="text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          We Understand Cars
        </motion.p>
        <motion.p
          className="text-xl md:text-2xl mt-6 max-w-4xl"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          Showcase the characteristics and capabilities that make your product
          stand out. Highlight key features and explain how each translates into
          practical benefits.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 w-full max-w-6xl">
          {/* Feature Box */}
          <motion.div
            className="p-6 bg-white rounded-xl shadow hover:-translate-y-2 transition-transform duration-300"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }} // animate only when visible
            transition={{ duration: 2 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p className="text-2xl font-bold mb-4">Dependability</p>
            <p className="text-gray-700">
              Highlight the strengths that help your product outperform others.
            </p>
          </motion.div>

          <div className="p-6 bg-white rounded-xl shadow hover:-translate-y-2 transition-transform duration-300">
            <p className="text-2xl font-bold mb-4">Affordability</p>
            <p className="text-gray-700">
              Show why customers get the best value when choosing your product.
            </p>
          </div>

          <motion.div
            className="p-6 bg-white rounded-xl shadow hover:-translate-y-2 transition-transform duration-300"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }} // animate only when visible
            transition={{ duration: 2 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p className="text-2xl font-bold mb-4">Availability</p>
            <p className="text-gray-700">
              Explain how your products are always accessible and ready to ship.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Banner Section */}
      <div
        className="min-h-[60vh] md:min-h-[70vh] bg-cover bg-center text-white flex items-center px-6 md:px-20"
        style={{ backgroundImage: `URL(${Abouts})` }}
      >
        <motion.div
          className="max-w-3xl bg-black/40 p-8 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <p className="text-4xl md:text-5xl font-bold">
            A One-Stop Shop for Automotive Enthusiasts
          </p>

          <p className="text-lg md:text-2xl mt-6 leading-relaxed">
            Showcase the most impressive features that make you stand out.
            Explain your product reliability, strong performance, and commitment
            to quality.
          </p>

          <ol className="mt-10 space-y-4 text-lg md:text-xl list-disc pl-5">
            <li>Free shipping on all orders over $75</li>
            <li>All products tested & proven before hitting shelves</li>
            <li>Guaranteed durability and performance</li>
          </ol>
        </motion.div>
      </div>
    </>
  );
}

export default About;

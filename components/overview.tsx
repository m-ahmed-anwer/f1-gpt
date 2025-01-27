import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}>
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <Image
          src="/f1.png" // Ensure the path matches the location of your image
          alt="logo"
          width={200} // Add width and height for better performance
          height={200}
          className="mx-auto mb-5"
        />
        <p>
          Experience the thrill of Formula 1, powered by cutting-edge AI.{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://github.com/m-ahmed-anwer/f1-gpt"
            target="_blank">
            Open-source
          </Link>{" "}
          and built with precision using Next.js.
        </p>
        <p>
          Crafted with passion and innovation by{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://ahmedanwer.vercel.app/"
            target="_blank">
            Ahmed Anwer
          </Link>
          .
        </p>
      </div>
    </motion.div>
  );
};

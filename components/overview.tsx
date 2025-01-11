// import { motion } from "framer-motion";
import Link from "next/link";

export const Overview = () => {
  return (
    // <motion.div
    //   key="overview"
    //   className="max-w-3xl mx-auto md:mt-20"
    //   initial={{ opacity: 0, scale: 0.98 }}
    //   animate={{ opacity: 1, scale: 1 }}
    //   exit={{ opacity: 0, scale: 0.98 }}
    //   transition={{ delay: 0.5 }}>
    <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
      <p>
        This is an{" "}
        <Link
          className="font-medium underline underline-offset-4"
          href="https://github.com/m-ahmed-anwer/f1-gpt"
          target="_blank">
          open source
        </Link>{" "}
        F1 chatbot built with Next.js.
      </p>
      <p>
        Made with ❤️ by{" "}
        <Link
          className="font-medium underline underline-offset-4"
          href="https://ahmedanwer-dev.netlify.app/"
          target="_blank">
          Ahmed Anwer
        </Link>
        .
      </p>
    </div>
    // </motion.div>
  );
};

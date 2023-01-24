import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingDots from "@/components/app/loading-dots";
import toast, { Toaster } from "react-hot-toast";

const pageTitle = "Login";
const logo = "/favicon.ico";
const description = "Diskusi pajak pertama dan terbesar di Indonesia";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const [google, setGoogle] = useState(false);
  const [github, setGithub] = useState(false);

  // Get error message added by next/auth in URL.
  const { query } = useRouter();
  const { error } = query;

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href={logo} />
        <link rel="shortcut icon" type="image/x-icon" href={logo} />
        <link rel="apple-touch-icon" sizes="180x180" href={logo} />
        <meta name="theme-color" content="#7b46f6" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta itemProp="name" content={pageTitle} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={logo} />
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={logo} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kelaspajakwithless" />
        <meta name="twitter:creator" content="@lesssummerize" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={logo} />
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="Platforms Starter Kit"
          width={100}
          height={100}
          className="relative mx-auto h-12 w-auto"
          src="/logo.png"
        />
        <h2 className="mt-6 font-cal text-center text-3xl font-extrabold text-gray-900">
          Pajak365
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Diskusi Pajak pertama dan terbesar di Indonesia
          {/* <br /> Read the <a
            className="font-medium text-black hover:text-gray-800"
            href="https://demo.pajak365.com/platforms-starter-kit"
            rel="noreferrer"
            target="_blank"
          >
            blog post
          </a> */}
        </p>
      </div>

      <div className="mt-8 mx-auto sm:w-full w-11/12 sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
          <button
            disabled={github}
            onClick={() => {
              setGithub(true);
              signIn("github");
            }}
            className={`${
              github ? "cursor-not-allowed bg-gray-600" : "bg-[#333]"
            } group flex justify-center items-center space-x-5 w-full sm:px-4 h-16 my-2 rounded-md focus:outline-none text-white font-cal`}
          >
            {github ? <LoadingDots color="#fff" /> : "login with github"}
          </button>
          <button
            disabled={google}
            onClick={() => {
              setGoogle(true);
              signIn("google");
            }}
            className={`${
              google ? "cursor-not-allowed bg-gray-600" : "bg-[#4285F4]"
            } group flex justify-center items-center space-x-5 w-full sm:px-4 h-16 my-2 rounded-md focus:outline-none text-white font-cal`}
          >
            {google ? <LoadingDots color="#fff" /> : "login with google"}
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

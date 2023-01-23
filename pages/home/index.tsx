import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-400">
      <Head>
        <title>
          Pajak365 | Diskusi pajak pertama dan terbesar di Indonesia
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="m-auto max-w-5xl">
        <Image width={512} height={512} src="/hero.webp" alt="pajak365" />
      </div>
    </div>
  );
}

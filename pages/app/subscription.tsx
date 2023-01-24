import { useState, useRef } from "react";
import Layout from "@/components/app/Layout";
import Modal from "@/components/Modal";
import LoadingDots from "@/components/app/loading-dots";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { HttpMethod } from "@/types";
import toast, { Toaster } from "react-hot-toast";
import type { Subscription } from "@prisma/client";
import { toDateString } from "@/lib/utils";

export default function AppIndex() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [creatingSubscription, setCreatingSubscription] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const bulanRef = useRef<HTMLInputElement | null>(null);

  const CurrentDate = new Date();
  const expires = CurrentDate.setMonth(CurrentDate.getMonth() + 4 );
  const router = useRouter();

  console.log(expires)

  const { data: session } = useSession();
  const sessionId = session?.user?.id;

  const { data: subscriptions } = useSWR<Array<Subscription>>(
    sessionId && `/api/subscription`,
    fetcher
  );

  async function createSubscription() {
    const res = await fetch("/api/subscription", {
      method: HttpMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: sessionId,
        billingCycleStart: bulanRef.current?.value,
      }),
    });

    if (!res.ok) {
      toast.error("Failed to create subscription");
    }

    const data = await res.json();
    router.push(`/subscription/`);
  }

  return (
    <Layout>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setCreatingSubscription(true);
            createSubscription();
          }}
          className="inline-block w-full max-w-md pt-8 overflow-hidden text-center align-middle transition-all bg-white shadow-xl rounded-lg"
        >
          <h2 className="font-cal text-2xl mb-6">Create a New Site</h2>
          <div className="grid gap-y-5 w-5/6 mx-auto">
            <div className="border border-gray-700 rounded-lg flex flex-start items-center">
              <span className="pl-5 pr-1">📌</span>4x
              <input
                className="w-full hidden px-5 py-3 text-gray-700 bg-white border-none focus:outline-none focus:ring-0 rounded-none rounded-r-lg placeholder-gray-400"
                name="name"
                required
            value="12"
                ref={bulanRef}
                type="number"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-10 w-full">
            <button
              type="button"
              className="w-full px-5 py-5 text-sm text-gray-600 hover:text-black border-t border-gray-300 rounded-bl focus:outline-none focus:ring-0 transition-all ease-in-out duration-150"
              onClick={() => {
                setError(null);
                setShowModal(false);
              }}
            >
              CANCEL
            </button>

            <button
              type="submit"
              disabled={creatingSubscription || error !== null}
              className={`${
                creatingSubscription || error
                  ? "cursor-not-allowed text-gray-400 bg-gray-50"
                  : "bg-white text-gray-600 hover:text-black"
              } w-full px-5 py-5 text-sm border-t border-l border-gray-300 rounded-br focus:outline-none focus:ring-0 transition-all ease-in-out duration-150`}
            >
              {creatingSubscription ? <LoadingDots /> : "CREATE SUBSCRIPTION"}
            </button>
          </div>
        </form>
      </Modal>

      <div className="py-20 max-w-screen-xl mx-auto px-10 sm:px-20">
        <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 justify-between items-center">
          <h1 className="font-cal text-5xl"></h1>
          <button
            onClick={() => setShowModal(true)}
            className="font-cal text-lg w-3/4 sm:w-40 tracking-wide text-white bg-black border-black border-2 px-5 py-3 hover:bg-white hover:text-black transition-all ease-in-out duration-150"
          >
            Beli Akses <span className="ml-2">＋</span>
          </button>
        </div>
        <div className="my-10 grid gap-y-10">
          {subscriptions ? (
            subscriptions.length > 0 ? (
              subscriptions.map((subscription) => (
                <Link
                  href={`/subscription/${subscription.id}`}
                  key={subscription.id}
                >
                  <div className="flex flex-col md:flex-row md:h-60 rounded-lg overflow-hidden border border-gray-200">
                    <div className="relative p-10">
                      <h2 className="font-cal text-3xl">
                        billing cycle {subscription.billingCycleStart}
                      </h2>
                      <h2 className="font-cal text-3xl">
                        start Date {toDateString(subscription.startDate)}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <div className="flex flex-col md:flex-row md:h-60 rounded-lg overflow-hidden border border-amber-200">
                  <div className="relative w-full h-60 md:h-auto md:w-1/3 md:flex-none bg-amber-300" />
                  <div className="relative p-10 grid gap-5">
                    <div className="w-28 h-10 rounded-md bg-amber-300" />
                    <div className="w-48 h-6 rounded-md bg-amber-300" />
                    <div className="w-48 h-6 rounded-md bg-amber-300" />
                    <div className="w-48 h-6 rounded-md bg-amber-300" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-cal text-gray-600">
                    No subscriptions yet. Click &quot;New Site&quot; to create
                    one.
                  </p>
                </div>
              </>
            )
          ) : (
            [0, 1].map((i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:h-60 rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="relative w-full h-60 md:h-auto md:w-1/3 md:flex-none bg-amber-300 animate-pulse" />
                <div className="relative p-10 grid gap-5">
                  <div className="w-28 h-10 rounded-md bg-amber-300 animate-pulse" />
                  <div className="w-48 h-6 rounded-md bg-amber-300 animate-pulse" />
                  <div className="w-48 h-6 rounded-md bg-amber-300 animate-pulse" />
                  <div className="w-48 h-6 rounded-md bg-amber-300 animate-pulse" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

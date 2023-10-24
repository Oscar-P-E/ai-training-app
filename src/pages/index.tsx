/* eslint-disable @next/next/no-img-element */
import { SignIn, UserButton } from "@clerk/nextjs";
import { DayView } from "~/components/DayView";
import { useData } from "~/server/api/helpers/useData";

export default function Home() {
  const { isSignedIn } = useData();

  return (
    <>
      <div className="absolute inset-0">
        <div className="flex h-full w-full">
          <main className="scrollbar-hide h-full w-full overflow-auto">
            <div className="relative h-full w-full max-w-screen-lg lg:mx-auto">
              <div className="w-full p-4">
                <div className="flex items-center justify-between">
                  {/* <div className="w-8"></div> */}
                  {/* <div className="flex items-center gap-4"> */}
                  {/* <img
                      src="http://placehold.co/32x32"
                      alt="gAIns Logo"
                      className="h-8 w-8"
                    /> */}
                  <div className="text-sm font-bold">gAIns AI Training App</div>
                  {/* </div> */}
                  <div className="bg-primary h-8 w-8 rounded-full">
                    {!isSignedIn && <SignIn />}
                    {isSignedIn && <UserButton afterSignOutUrl="/" />}
                  </div>
                </div>
              </div>

              <DayView />

              <div className="bg-secondary sticky -bottom-4 flex items-start justify-between px-6 pb-8 pt-4">
                <div className="text-accent text-sm">Cancel</div>
                <div className="text-special text-sm">45:17</div>
                <div className="text-accent text-sm font-bold">Finish</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useRootContext } from "../../context/root.context";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";

const Home = () => {
  const { socket } = useRootContext();

  return (
    <div className="w-full h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border"
      >
        {/* Sidebar Panel */}
        <ResizablePanel
          minSize={20}
          className="bg-blue-500 hidden lg:block"
          maxSize={35}
          defaultSize={35}
        >
          <div className="flex flex-col w-full h-full text-white p-8 font-mono items-center">
            {/* TOP */}
            <h1 className="font-semibold text-4xl">
              Tingle
              <br />
              <p className="mt-10 text-lg text-gray-200">
                Talk with other users by passing his personal code or talk with
                strangers!
              </p>
            </h1>

            {/* Middle - Takes up remaining space */}
            <div className="flex-grow p-10">
              <Card>
                <CardTitle>Personal Code</CardTitle>
                <CardContent>
                  <p>Your Personal Code</p>
                  <div className="flex justify-between items-center">
                    <p>Code</p>
                    <Copy />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom - Sticks to the bottom */}
            <div className="flex items-end justify-center">
              {/* You can add content here that sticks to the bottom */}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Content Panel */}
        <ResizablePanel className="w-full">
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Context</span>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />
      </ResizablePanelGroup>
    </div>
  );
};

export default Home;

import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"

import { Button } from "~/components/ui/button";

import AppSidebar from "~/components/app-sidebar"
import ChatTitle from "~/components/chat-title";

import { platform as tauriPlatform } from '@tauri-apps/plugin-os';
import { getCurrentWindow } from '@tauri-apps/api/window';

import { useEffect, useState } from "react";

import { MessageSquarePlus } from "lucide-react";

import { useAtomValue } from "jotai";
import { isSidebarOpenAtom } from "~/atoms/main-atoms";

interface LayoutProps {
  children: React.ReactNode;
}

const MockTrafficLights = () => {
  return (
    <div className="fixed left-2 items-center z-20 w-[3.38rem] h-11 flex justify-between border border-transparent">
      <div className="bg-slate-400 w-3 h-3 rounded-xl"></div>
      <div className="bg-slate-400 w-3 h-3 rounded-xl"></div>
      <div className="bg-slate-400 w-3 h-3 rounded-xl"></div>
    </div>
  )
};
 
export default function Layout({ 
  children,
}: LayoutProps ) {

  const platform = tauriPlatform()
  const [isFullScreen, setIsFullscreen] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const isSidebarOpen = useAtomValue(isSidebarOpenAtom);

  useEffect(() => {
    const setWindowListeners = async () => {
      const currWindow = await getCurrentWindow();
      await currWindow.onResized( async ({}) => {
        setIsFullscreen(await currWindow.isFullscreen());
      });
      currWindow.onFocusChanged( async ({ payload: focused }) => {
        setIsFocused(focused);
      });
    }
    setWindowListeners();
  }, []);
  
  return (
    <>
    <SidebarProvider className="h-full">
      <div data-tauri-drag-region className="w-full h-11 fixed top-0 left-0 right-0 z-20"></div>
      {platform === "macos" && !isFullScreen && !isFocused && <MockTrafficLights />}
      <AppSidebar/>
      <div className="z-30 flex flex-row justify-between items-center fixed w-16 h-11 left-20">
          <SidebarTrigger />
          <Button id="new-chat" variant="ghost" size="icon" className="h-7 w-7">
            <MessageSquarePlus width={22} height={22}></MessageSquarePlus>
          </Button>
        </div>
      <main className="h-screen w-screen overflow-hidden flex flex-col">
        <ChatTitle>
          <h1 className={`transition-[margin] duration-300 ease-in-out ${isSidebarOpen ? "ml-4" : "ml-40"}`}>
            Chat title
          </h1>
        </ChatTitle>
        {children}
      </main>
    </SidebarProvider>
    </>
  )
}
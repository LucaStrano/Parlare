import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import AppSidebar from "~/components/app-sidebar"
import { ChatItem } from "~/types/main-types"
import { platform as tauriPlatform } from '@tauri-apps/plugin-os';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from "react";
interface LayoutProps {
  children: React.ReactNode;
  chats: ChatItem[];
}

const MockTrafficLights = () => {
  return (
    <div className="fixed top-[1.375rem] left-2 items-center -translate-y-1/2 z-20 w-[3.38rem] h-5 flex justify-between border border-transparent">
      <div className="bg-slate-400 w-3 h-3 rounded-xl"></div>
      <div className="bg-slate-400 w-3 h-3 rounded-xl"></div>
      <div className="bg-slate-400 w-3 h-3 rounded-xl"></div>
    </div>
  )
};
 
export default function Layout({ children, chats }: LayoutProps  ) {

  const platform = tauriPlatform()
  const [isFullScreen, setIsFullscreen] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const setWindowListeners = async () => {
      const currWindow = await getCurrentWindow()
      await currWindow.onResized( async ({}) => {
        setIsFullscreen(await currWindow.isFullscreen());
      });
      currWindow.onFocusChanged( async ({ payload: focused }) => {
        setIsFocused(focused);
      });
    };
    setWindowListeners();
  }, []);
  
  return (
    <>
    <SidebarProvider>
      <div data-tauri-drag-region className="w-full h-11 fixed top-0 left-0 right-0 z-20"></div>
      {platform === "macos" && !isFullScreen && !isFocused && <MockTrafficLights />}
      <AppSidebar chats={chats}/>
      <main>
        <SidebarTrigger className="z-30 fixed top-[1.375rem] -translate-y-1/2 left-20"/>
        {children}
      </main>
    </SidebarProvider>
    </>
  )
}
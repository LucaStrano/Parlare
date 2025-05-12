import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import AppSidebar from "~/components/app-sidebar"
import ChatTitle from "~/components/chat-title";
import { ChatItem } from "~/types/main-types"
import { platform as tauriPlatform } from '@tauri-apps/plugin-os';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { MessageSquarePlus } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  chats: ChatItem[];
  selectedChat: ChatItem | null;
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
  chats,
  selectedChat
}: LayoutProps  ) {

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
      <main className="w-full h-full">
        <div className="z-30 flex flex-row justify-between items-center fixed w-16 h-11 left-20">
        <SidebarTrigger />
        <Button id="new-chat" variant="ghost" size="icon" className="h-7 w-7">
          <MessageSquarePlus width={22} height={22}></MessageSquarePlus>
        </Button>
        </div>
        <ChatTitle>

        </ChatTitle>
        {children}
      </main>
    </SidebarProvider>
    </>
  )
}
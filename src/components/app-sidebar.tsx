import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "~/components/ui/sidebar"

import { useSidebar } from "~/components/ui/sidebar"

import { Settings } from "lucide-react"

import {chatsAtom, isSidebarOpenAtom} from "~/atoms/main-atoms"
import { useAtomValue, useSetAtom } from "jotai"
import { useEffect } from "react"

function SidebarStateManager() {
  const { open } = useSidebar();
  const setIsSiderbarOpen = useSetAtom(isSidebarOpenAtom);

  useEffect(() => {
    setIsSiderbarOpen(open);
    console.log("Sidebar is now: ", open ? "open" : "closed");
  }, [open]);

  return null;
}

export default function AppSidebar() {

  const chats = useAtomValue(chatsAtom);

  return (
    <Sidebar>
      <SidebarStateManager /> {/* manage open and close state for chat-title dynamic padding */}
      <SidebarHeader className="mt-11">Chats</SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
            <SidebarGroupContent>
              <SidebarMenu>
                {chats.map( (chat) =>
                  (
                    <SidebarMenuItem key={chat.id} className=" text-lg mt-1">
                      <SidebarMenuButton asChild>
                        <span>{chat.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter>
        <Settings/>
      </SidebarFooter>
      
    </Sidebar>
  )
}

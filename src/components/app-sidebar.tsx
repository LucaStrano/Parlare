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
import { Input } from "~/components/ui/input"


import { Search, Settings } from "lucide-react"

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
    <Sidebar className="select-none">
      <SidebarStateManager /> {/* manage open and close state for chat-title dynamic padding */}
      <SidebarHeader className="mt-11">Chats</SidebarHeader>

      <SidebarContent>

        {/* SEARCH GROUP */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="relative flex-row items-center">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="text" placeholder="Search Chats..." className="h-8 placeholder:italic pl-8">
              </Input>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* CHATS GROUP */}
        <SidebarGroup />
            <SidebarGroupContent>
              <SidebarMenu>
                {chats.map( (chat) =>
                  (
                    <SidebarMenuItem key={chat.id} className=" text-lg">
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

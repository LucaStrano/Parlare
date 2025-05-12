import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"

import { Settings } from "lucide-react"
import { ChatItem } from "~/types/main-types"

import {chatsAtom} from "~/atoms/main-atoms"
import { useAtomValue } from "jotai"

export default function AppSidebar() {
  const chats = useAtomValue(chatsAtom);
  return (
    <Sidebar>

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

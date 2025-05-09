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

interface AppSidebarProps {
  chats: ChatItem[];
}

export default function AppSidebar({chats} : AppSidebarProps) {
  return (
    <Sidebar>

      <SidebarHeader>Chats</SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
            <SidebarGroupContent>
              <SidebarMenu>
                {chats.map( (chat) =>
                  (
                    <SidebarMenuItem key={chat.id} className=" text-lg ml-1 mt-1">
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

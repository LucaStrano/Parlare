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

export default function AppSidebar() {
  return (
    <Sidebar>

      <SidebarHeader>Chats</SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
            <SidebarGroupContent>
                {}
            </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter>
        <Settings/>
      </SidebarFooter>
      
    </Sidebar>
  )
}

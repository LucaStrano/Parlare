import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import AppSidebar from "~/components/app-sidebar"
import { ChatItem } from "~/types/main-types"

interface LayoutProps {
  children: React.ReactNode;
  chats: ChatItem[];
}
 
export default function Layout({ children, chats }: LayoutProps  ) {
  return (
    <SidebarProvider>
      <AppSidebar chats={chats}/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
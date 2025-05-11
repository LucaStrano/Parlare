import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import AppSidebar from "~/components/app-sidebar"
import { ChatItem } from "~/types/main-types"

interface LayoutProps {
  children: React.ReactNode;
  chats: ChatItem[];
}
 
export default function Layout({ children, chats }: LayoutProps  ) {
  return (
    <>
    <SidebarProvider>
      <div data-tauri-drag-region className="w-full h-11 fixed top-0 left-0 right-0 z-20 border border-red-500">
      </div>
      <AppSidebar chats={chats}/>
      <main>
        <SidebarTrigger className="z-30 fixed top-[1.375rem] -translate-y-1/2 left-20"/>
        {children}
      </main>
    </SidebarProvider>
    </>
  )
}
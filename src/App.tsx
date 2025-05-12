import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Layout from "~/Layout";
import "~/App.css";
import type { ChatItem } from "~/types/main-types";

const mockData: ChatItem[] = [
  {
    id: "1",
    name: "Chat 1",
    date: new Date(),
  },
  {
    id: "2",
    name: "Chat 2",
    date: new Date(),
  },
  {
    id: "3",
    name: "Chat 3",
    date: new Date(),
  },
];

function App() {

  const [chats, setChats] = useState<ChatItem[]>([]);
  const [selectedChat, setselectedChat] = useState<ChatItem | null>(null);

  useEffect(() => {
    const fetchChats = () => {
      setChats(mockData);
    };
    fetchChats();
    // latest chat by default
    if(chats.length >= 1){
      setselectedChat(chats[0]);
    }
  }, []);


  return (
    <div id="app">
      <Layout chats={chats} selectedChat={selectedChat}>
        <div></div>
      </Layout>
    </div>
  )


}

export default App;

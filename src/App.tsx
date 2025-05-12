import { useEffect } from "react";

import {chatsAtom} from "~/atoms/main-atoms"
import { useAtom, useSetAtom } from "jotai";

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

  const setChats = useSetAtom(chatsAtom);

  useEffect(() => {
    const fetchChats = () => {
      setChats(mockData);
    };
    fetchChats();
  }, []);


  return (
    <div id="app">
      <Layout>
        <div></div>
      </Layout>
    </div>
  )


}

export default App;

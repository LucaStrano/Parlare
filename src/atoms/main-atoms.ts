import {atom} from "jotai";
import type { ChatItem, ChatMessage } from "~/types/main-types";

const isSidebarOpenAtom = atom(true); // default open

const chatsAtom = atom<ChatItem[]>([]);
const activeChatAtom = atom<ChatItem | null>(null);

const chatMessagesAtom = atom<ChatMessage[] | null>(null);

export {isSidebarOpenAtom, chatsAtom, activeChatAtom, chatMessagesAtom};

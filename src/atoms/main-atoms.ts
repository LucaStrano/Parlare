import {atom} from "jotai";
import type { ChatItem } from "~/types/main-types";

const chatsAtom = atom<ChatItem[]>([]);
const activeChatAtom = atom<ChatItem | null>(null);

export {chatsAtom, activeChatAtom};

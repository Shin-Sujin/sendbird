// src/lib/sendbird.ts
import SendbirdChat from "@sendbird/chat";
import { GroupChannelModule } from "@sendbird/chat/groupChannel";

let sb: SendbirdChat | null = null;

export async function getSB() {
  if (sb) return sb;
  const appId = process.env.REACT_APP_SENDBIRD_APP_ID!;
  sb = await SendbirdChat.init({
    appId,
    modules: [new GroupChannelModule()],
  });
  return sb;
}

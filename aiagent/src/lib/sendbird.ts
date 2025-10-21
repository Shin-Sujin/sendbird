// src/lib/sendbird.ts
import SendbirdChat from "@sendbird/chat";
import { GroupChannelModule } from "@sendbird/chat/groupChannel";

// ✅ 가변 배열로 선언 (readonly 튜플 X)
const modules: GroupChannelModule[] = [new GroupChannelModule()];

async function createSB() {
  const appId = process.env.REACT_APP_SENDBIRD_APP_ID!;
  return SendbirdChat.init({
    appId,
    modules, // ← Module[] 요구사항과 호환 (GroupChannelModule extends Module)
  });
}

type SBInstance = Awaited<ReturnType<typeof createSB>>;

let sbInstance: SBInstance | null = null;

/** Sendbird 클라이언트 초기화 (싱글턴) */
export async function getSB(): Promise<SBInstance> {
  if (!sbInstance) {
    sbInstance = await createSB();
  }
  // 이 시점에서는 null 아님이 보장
  return sbInstance!;
}

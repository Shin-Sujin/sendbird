// src/lib/chatChannels.ts
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { getSB } from "./sendbird";

/** 사용자 연결 후 AI 채팅용 그룹 채널을 반환 */
export async function connectAndGetChannel(
  userId: string
): Promise<GroupChannel> {
  const sb = await getSB();

  // 이미 로그인된 유저가 다르면 재연결
  if (!sb.currentUser || sb.currentUser.userId !== userId) {
    await sb.connect(userId);
  }

  // 내 채널 목록 조회
  const query = sb.groupChannel.createMyGroupChannelListQuery({
    includeEmpty: true,
    limit: 20,
  });
  const channels = await query.next(); // GroupChannel[]

  // “AI 채팅 전용” 채널 찾기
  const existing = channels.find((c) => c.customType === "ai_dm");
  if (existing) return existing;

  // 없으면 새 채널 생성 (현재 유저는 자동 포함, 상대만 userIds로 지정)
  const newChannel = await sb.groupChannel.createChannel({
    name: "AI Assistant",
    isDistinct: true,
    // userIds: [userId], // 1:1처럼 현재 유저와 userId로 구성
    customType: "ai_dm",
  });

  return newChannel;
}

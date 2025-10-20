import { GroupChannel } from "@sendbird/chat/groupChannel";
import { getSB } from "./sendbird";

const BOT_USER_ID = "ai_bot"; // 나중에 서버 봇 붙일 때 사용 예정

export async function connectAndGetChannel(
  userId: string
): Promise<GroupChannel> {
  const sb: any = await getSB();
  await sb.connect(userId);

  // “AI와 나” 전용 채널 찾기 (customType 으로 구분)
  const query = sb.groupChannel.createMyGroupChannelListQuery({
    limit: 10,
    includeEmpty: true,
  });

  let channel: GroupChannel | undefined;

  const page = await query.next();
  channel = page.channels.find((c: any) => c.customType === "ai_dm");

  if (!channel) {
    channel = await sb.groupChannel.createChannel({
      name: "AI Assistant",
      isDistinct: true,
      invitedUserIds: [userId /*, BOT_USER_ID*/],
      customType: "ai_dm",
    });
  }
  return channel!;
}

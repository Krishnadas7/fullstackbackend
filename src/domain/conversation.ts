export interface IConversation {
    _id?: string;
    members?: string[];
    unreadCount?: Map<string, number>;
  }
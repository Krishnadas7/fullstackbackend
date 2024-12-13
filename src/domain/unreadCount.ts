export interface IUnreadCount{
  _id?: string;
  user: string;
  chat: Map<string, number>;  
  interestReceived: string[];
}
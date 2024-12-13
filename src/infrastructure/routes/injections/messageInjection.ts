import { MessageAdapter } from "../../../controller/messageAdapter";
import MessageModel from "../../database/model/messageModel";
import { MessageUseCase } from "../../../usecase/usecase/messageuseCase";
import { MessageRepository } from "../../database/repository/messageRepository";
import UnreadModel from "../../database/model/unreadModel";
import { UnreadRepository } from "../../database/repository/unreadRepository";
import conversationModel from "../../database/model/conversatoinModel";
import { ConversationRepository } from "../../database/repository/conversationRepository";
const messageRepository = new MessageRepository(MessageModel)
const unreadRepository = new UnreadRepository(UnreadModel)
const conversationRepository = new ConversationRepository(conversationModel)

const messageusecase = new MessageUseCase(messageRepository,unreadRepository)

const messageAdapter = new MessageAdapter(messageusecase)
export{messageAdapter}
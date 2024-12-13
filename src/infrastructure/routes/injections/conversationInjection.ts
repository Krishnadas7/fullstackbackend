import { ConversationAdapter } from "../../../controller/conversationAdapter";
import { ConversationUseCase } from "../../../usecase/usecase/conversationuseCase";
import { ConversationRepository } from "../../database/repository/conversationRepository";
import ConversationModel from "../../database/model/conversatoinModel";

const conversationRepository = new ConversationRepository(ConversationModel)

const conversationusecase = new ConversationUseCase(
    conversationRepository
)
const conversationAdapter =new ConversationAdapter(conversationusecase)
export{conversationAdapter}
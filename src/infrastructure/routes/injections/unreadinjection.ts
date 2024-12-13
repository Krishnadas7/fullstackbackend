import { UnreadAdapter } from "../../../controller/unreadAdapter";
import UnreadModel from "../../database/model/unreadModel";
import { UnreadUseCase } from "../../../usecase/usecase/unreaduseCase";
import { UnreadRepository } from "../../database/repository/unreadRepository";

const unreadRepository = new UnreadRepository(UnreadModel)
const unreadusecase = new UnreadUseCase(unreadRepository)
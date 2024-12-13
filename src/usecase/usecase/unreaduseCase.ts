import { IUnreadRepository } from "../interface/repository/IunreadRepository";


export class UnreadUseCase{
private readonly unreadRepository:IUnreadRepository
constructor(unreadRepository:IUnreadRepository){
    this.unreadRepository=unreadRepository
}
   
}
import { IEvent } from "../../../domain/event";


export interface IEventRepository{
    createEvent(event:IEvent):Promise<IEvent>;
    uploadProfileImage(image:string,id:string):Promise<Boolean>;
    getEventWithCompany():Promise<IEvent[]>;
    blockEvent(eventId:string):Promise<boolean>;
    getEvent(companyId:string):Promise<IEvent[]>;
    userEventList(pagination:number):Promise<IEvent[]>;
    selectedEvent(eventId:string):Promise<IEvent>;
    searchEvent(search:string):Promise<IEvent[]>;
    filterEvents(type:string,ticket:string,date:string):Promise<IEvent[]>;
    liveEvents(companyId:string):Promise<IEvent[]>;
    allMembers(eventId:string):Promise<unknown>;
    closeEvent(eventId:string):Promise<boolean>;
    findParticipants(eventId:string):Promise<string[]>;
    eventCount():Promise<number>;
    liveEventCount():Promise<number>;
    piechartData():Promise<string[]>
    checkingUserExist(userId:string,eventId:string):Promise<boolean>
    findEventById(eventId:string):Promise<IEvent>;
    
}
import EventModel from "../../model/eventModel";

export const getEvent = async (
    companyId: string,
    eventModel: typeof EventModel
) => {
    try {
        const event = await eventModel.find({company_id: companyId}).sort({createdAt:-1})
        return event;
    } catch (error) {
        throw error;
    }
};

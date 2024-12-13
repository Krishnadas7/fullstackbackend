import EventModel from "../../model/eventModel";

export const checkingUserExist = async (
    userId: string,
    eventId: string,
    eventModels: typeof EventModel
):Promise<boolean> => {
    try {
        // Use $addToSet to add userId only if it does not already exist in the registrations array
        const event = await eventModels.findOneAndUpdate(
            { _id: eventId, registrations: { $ne: userId } },
            { $addToSet: { registrations: userId } },
            { new: true, useFindAndModify: false }
        );

        // If the event is null, it means the userId was already in the array
        if (!event) {
            return false; // User was already registered
        }

        return true; // User successfully registered
    } catch (error) {
        throw error;
    }
};

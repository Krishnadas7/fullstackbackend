import EventModel from "../../model/eventModel";

export const filterEvents = async (
    type: string,
    ticket: string,
    date: string,
    eventModel: typeof EventModel
) => {
    try {
     
        // Ensure the inputs are strings
        if (typeof type !== 'string' || typeof ticket !== 'string' || typeof date !== 'string') {
            throw new Error('type, ticket, and date must be strings');
        }

        const events = await eventModel.find({
            event_type: { $regex: type, $options: 'i' },
            ticket: { $regex: ticket, $options: 'i' },
            start_date: { $regex: date, $options: 'i' }
        });

        return events;
    } catch (error) {
        throw error;
    }
};

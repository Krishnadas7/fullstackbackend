import BookingModel from '../../model/bookingModel';
import EventModel from '../../model/eventModel';
import { IBooking } from '../../../../domain/booking';

export const ticketBooking =async (
    booking:IBooking,
    bookingModels:typeof BookingModel,
) =>{
    try {
        
        const newBooking = await bookingModels.create(booking)
        await newBooking.save()
        return newBooking
    } catch (error) {
        throw error
    }
}
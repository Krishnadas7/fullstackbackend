import cron from 'node-cron';
import { sendingEmail } from '../../usecase/usecase/croneJob/croneJob';


export const sample = () =>{
    cron.schedule('0 * * * *', () => {
  sendingEmail()
});

}


import UserModel from "../../model/userModel";
import { FilterUserResult } from "../../../../utils/typeDatas";
import { IUser } from "../../../../domain/user";


export const filterUser = async (
    userModel:typeof UserModel
) =>{
  try {
    const yearlyData = await userModel.aggregate([
        {
          $group: {
            _id: { year: { $year: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1 }
        }
      ]);
      const monthlyData = await UserModel.aggregate([
        {
          $group: {
            _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ]);
    
      const weeklyData = await UserModel.aggregate([
        {
          $group: {
            _id: { year: { $year: "$createdAt" }, week: { $week: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.week": 1 }
        }
      ]);
      
 
      return {yearlyData,monthlyData,weeklyData} 
  } catch (error) {
    console.log(error);
    
  }
}
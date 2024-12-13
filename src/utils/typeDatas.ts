export interface PData{
  name:string;
  value:string;
}
interface YearlyData {
    _id: {
      year: number;
    };
    count: number;
  }
  
  interface MonthlyData {
    _id: {
      year: number;
      month: number;
    };
    count: number;
  }
  
  interface WeeklyData {
    _id: {
      year: number;
      week: number;
    };
    count: number;
  }
  
 export interface FilterUserResult {
    yearlyData: YearlyData[];
    monthlyData: MonthlyData[];
    weeklyData: WeeklyData[];
  }
  
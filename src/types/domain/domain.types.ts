export type tDBResult<T> = DBSuccess<T> | DBFailure;


interface DBSuccess <T>{
   success: true;
   dbData: T;
}

export interface DBFailure {
   success: false,
   reason: any,
   message?: string,
}

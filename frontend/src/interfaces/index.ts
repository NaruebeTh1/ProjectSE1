export interface ParcelList {
    ParcelNumber: string;
    ParcelName: string;
    PricePerPiece: number;
    Valume: number;
    ParcelDetail: string;
    PLDate: string;
    ParcelTypeId: number;
    ParcelUnitId: number;
    RoomId: number;
    ParcelType: ParcelType;
    ParcelUnit: ParcelUnit;
    Room: Room;
}
  
export interface ImportParcelList  {
    ImportValume: string;
    ImportNumber: string;
    Seller: number;
    ImportDate: string;
    ParcelList: ParcelList;
    PersonnelId: number;
    Personnel: Personnel;
}
  
export interface ParcelUnit {
    ParcelUnit: string;
}
  
export interface ParcelType {
    ParcelType: string;
}
  
export interface ExportParcelList {
    ParcelListId: number;
    PickUpParcelListId: number;
    ParcelList: ParcelList;
    PickUpParcelList: PickUpParcelList;
}
  
export interface PickUpParcelList {
    BillNumber: number;
    DetailOfRequest: string;
    ExportVolume: number;
    Budget: number;
    PUPLDate: string;
    PersonnelId: number;
    Personnel: Personnel;
}


export interface Personnel {

}

export interface Room {

}

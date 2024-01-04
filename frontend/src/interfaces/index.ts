export interface ParcelList {
    ID?: number;
    ParcelNumber: string;
    ParcelName: string;
    PricePerPiece: number;
    Volume: number;
    ParcelDetail: string;

    ParcelTypeId: number;
    ParcelUnitId: number;
    RoomId: number;
    
    ParcelType: InterfaceParcelType;
    ParcelUnit: InterfaceParcelUnit;
    Room: InterfaceRoom;
}
  
export interface ImportParcelList  {
    ID: number;
    ImportVolume: number;
    ImportNumber: string;
    Seller: string;
    ImportDate: string;
    ParcelList: ParcelList;
    ParcelListId:number;
    PersonnelId?: number;
    PersonnelName?: InterfacePersonnel;
}
  
export interface InterfaceParcelUnit {
    ID?: number;
    ParcelUnit?: string;
}
  
export interface InterfaceParcelType {
    ID?: number;
    ParcelType?: string;
}
  
export interface ExportParcelList {
    ID: number;
    ExportVolume: number;

    ParcelListId: number;
    PickUpParcelListId: number;
    PickUpParcelList: PickUpParcelList;
    ParcelName: ParcelList;
}
  
export interface PickUpParcelList {
    ID?: number;
    BillNumber: string;
    DetailOfRequest: string;
    PUPLDate: string;

    PersonnelId: number;
    PersonnelName?: InterfacePersonnel;

    PickUpStatusId: number;
    PickUpStatusName?: InterfacePickUpStatus;
}

export interface InterfacePickUpStatus {
    ID?: number;
    PUPLStatus?: string;
}

export interface InterfacePersonnel {
    ID?: number;
    TitleName: 	        string;
	FirstName: 	        string;	
	LastName:	        string;	
}

export interface InterfaceRoom {
    ID?: number;
    RoomName: string
}

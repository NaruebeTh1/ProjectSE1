export interface ParcelList {
    ID: number;
    ParcelNumber: string;
    ParcelName: string;
    PricePerPiece: number;
    Valume: number;
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
    ImportValume: number;
    ImportNumber: string;
    Seller: string;
    ImportDate: string;
    ParcelList: string;
    PersonnelId?: number;
    PersonnelName?: Personnel;
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
    Budget: number;
    
    ParcelListId: number;
    PickUpParcelListId: number;
    ParcelList: ParcelList;
    PickUpParcelList: PickUpParcelList;
}
  
export interface PickUpParcelList {
    ID: number;
    BillNumber: number;
    DetailOfRequest: string;
    PUPLDate: string;
    PersonnelId: number;
    Personnel: Personnel;
}

export interface Personnel {
    ID: number;
    TitleName: 	        string;
	FirstName: 	        string;	
	LastName:	        string;	
	PersonnelTel: 	    string;
	PersonnelPicture:   string;

// PositionId: number;
// Position: Position;

// DepartmentId: number;
// Department: Department;

//  GenderId: number;
//  Gender: Gender;

}

export interface InterfaceRoom {
    ID?: number;
    RoomName: string
}
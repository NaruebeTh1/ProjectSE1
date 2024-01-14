package entity

import (

	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	Email 			string `gorm:"uniqueIndex"`
	Password 		string `gorm:"uniqueIndex"`
	TiltleName  	string
	FirstName 		string 
	LastName  		string
	
	// FK SchoolId this here

	SchoolId *uint
	School   School 	`gorm:"foreignKey:SchoolId"`

}

type School struct {
	gorm.Model
	SchoolName 		string
	Address 		string
	TaxId 			string

	//FK go to Budget, Finance, Equipment, User

	Budgets 	[]Budget 		`gorm:"foreignKey:SchoolId"`
	Finances 	[]Finance 		`gorm:"foreignKey:SchoolId"`
	Equipments 	[]Equipment 	`gorm:"foreignKey:SchoolId"`
	Users 		[]User 			`gorm:"foreignKey:SchoolId"`

}

type Personnel struct {
	gorm.Model
	TitleName 			string
	FirstName 			string
	LastName			string
	PersonnelTel 		string
	PersonnelPicture 	string

	// FK PositionId, DepartmentId, GenderId this here

	PositionId *uint
	Position   Position 	`gorm:"foreignKey:PositionId"`

	DepartmentId *uint
	Department   Department `gorm:"foreignKey:DepartmentId"`

	GenderId *uint
	Gender   Gender 		`gorm:"foreignKey:GenderId"`

	//FK go to PinkUpParcelList, Course, ReservePlace, Budget, Finance

	PickUpParcelLists 	[]PickUpParcelList 		`gorm:"foreignKey:PersonnelId"`
	ImportParcelListห 	[]ImportParcelList 		`gorm:"foreignKey:PersonnelId"`
	Courses 			[]Course 				`gorm:"foreignKey:PersonnelId"`
	ReservePlaces 		[]ReservePlace 			`gorm:"foreignKey:PersonnelId"`
	Budgets 			[]Budget 				`gorm:"foreignKey:PersonnelId"`
	Finances 			[]Finance 				`gorm:"foreignKey:PersonnelId"`

}

type Position struct {
	gorm.Model
	Position 			string

	//FK go to PosonnelId

	Personnels []Personnel `gorm:"foreignkey:PositionId"`
}

type Student struct {
	gorm.Model
	TitleNameStudent 	string
	StudentName 		string
	StudentPicture 		string
	Tel 				string
	GPAX 				float32
	

	//FK GenderId this here

	GenderId *uint
	Gender   Gender 		`gorm:"foreignKey:GenderId"`

	//FK go to ClassRoom, Attendance, BehaviorScore

	ClassRooms 		[]ClassRoom 		`gorm:"foreignkey:StudentId"`
	Attendances 	[]Attendance 		`gorm:"foreignkey:StudentId"`
	BehaviorScores 	[]BehaviorScore 	`gorm:"foreignkey:StudentId"`

}

type ClassRoom struct {
	gorm.Model
	Matthayom 			string

	//FK StudentId this here

	StudentId *uint
	Student   Student 		`gorm:"foreignKey:StudentId"`

	Attendances 		[]Attendance 		`gorm:"foreignkey:ClassRoomId"`

}

type Gender struct {
	gorm.Model
	Gender  			string

	//FK go to Student, Personnel

	Students 	[]Student 		`gorm:"foreignkey:GenderId"`
	Personnels 	[]Personnel 	`gorm:"foreignkey:GenderId"`
}

type Activity struct {
	gorm.Model

	ActivityDetail 		string
	ActivityList 		string

	//FK go to BehaviorScore, Attendance

	BehaviorScores 	[]BehaviorScore 	`gorm:"foreignkey:ActivityId"`
	Attendances 	[]Attendance 		`gorm:"foreignkey:ActivityId"`
}

type BehaviorScore struct {
	gorm.Model

	Date 				time.Time
	Score 				float32
	AddScoreDetail		string
	Scorecriteria       bool

	//FK Activity, Attendance, Student this here

	StudentId *uint
	Student   Student 			`gorm:"foreignKey:StudentId"`

	ActivityId *uint
	Activity   Activity 		`gorm:"foreignKey:ActivityId"`

	AttendanceId *uint
	Attendance   Attendance 	`gorm:"foreignKey:AttendanceId"`
}

type Attendance struct {
	gorm.Model

	Date 				time.Time
	AttendanceType      string

	//FK go to BehaviorScore

	BehaviorScores 	[]BehaviorScore 		`gorm:"foreignkey:AttendanceId"`

	//FK Activity, Student, Personnel, ClassRoom, AttendanceReport   this here

	StudentId *uint
	Student   Student 			`gorm:"foreignKey:StudentId"`

	ActivityId *uint
	Activity   Activity 		`gorm:"foreignKey:ActivityId"`

	PersonnelId *uint
	Personnel   Personnel 		`gorm:"foreignKey:PersonnelId"`

	ClassRoomId *uint
	ClassRoom   ClassRoom 		`gorm:"foreignKey:ClassRoomId"`

	AttendanceReportId  *uint
    AttendanceReport    AttendanceReport `gorm:"foreignKey:AttendanceReportId"`

}

type AttendanceReport struct {
	gorm.Model
    TotalDays            	int64
    AttendancePercentage 	float64
    ShouldNotify         	bool

	//FK go to  Attendance
	Attendances 	[]Attendance 		`gorm:"foreignkey:AttendanceReportId"`
}

type Budget struct {
	gorm.Model

	Date 			time.Time
	Name 			string
	Amount 			float32

	//FK BudgetType, School, Posonnel this here

	PersonnelId *uint
	Personnel   Personnel 	`gorm:"foreignKey:PersonnelId"`

	SchoolId *uint
	School   School 		`gorm:"foreignKey:SchoolId"`

	BudgetTypeId *uint
	BudgetType   BudgetType `gorm:"foreignKey:BudgetTypeId"`

}

type BudgetType struct {
	gorm.Model

	Type 				string

	//FK go to Budget

	Budgets 	[]Budget 		`gorm:"foreignkey:BudgetTypeId"`
	
}

type Finance struct {
	gorm.Model

	Date 				time.Time
	Name 				string
	Amount 				float32
	Picture 			string

	//FK FinanceType, School, Posonnel this here

	PersonnelId *uint
	Personnel   Personnel 		`gorm:"foreignKey:PersonnelId"`

	SchoolId *uint
	School   School 			`gorm:"foreignKey:SchoolId"`

	FinanceTypeId *uint
	FinanceType   FinanceType 	`gorm:"foreignKey:FinanceTypeId"`
}

type FinanceType struct {
	gorm.Model

	Type 				string

	//FK go to Finance

	Finances 	[]Finance 		`gorm:"foreignkey:FinanceTypeId"`
}

type Course struct {
	gorm.Model

	CourseName 			string
	Hours				float32
	Credit				int
	Description			string
	LearningOutcomes    string

	//FK Posonnel, Education, Department this here 

	PersonnelId *uint
	Personnel   Personnel 		`gorm:"foreignKey:PersonnelId"`

	EducationId *uint
	Education   Education 		`gorm:"foreignKey:EducationId"`

	DepartmentId *uint
	Department   Department 	`gorm:"foreignKey:DepartmentId"`
}

type Education struct {
	gorm.Model

	EducationName 		string

	//FK go to Course

	Courses 	[]Course 		`gorm:"foreignkey:EducationId"`
}

type Department struct {
	gorm.Model

	Department 			string

	//FK go to Course, Personnel

	Courses 	[]Course 		`gorm:"foreignkey:DepartmentId"`
	Personnels 	[]Personnel 	`gorm:"foreignkey:DepartmentId"`
}

type Equipment struct {
	gorm.Model

	EquipmentName 		string

	//FK School this here 

	SchoolId *uint
	School   School 			`gorm:"foreignKey:SchoolId"`
}

type ReservePlace struct {
	gorm.Model

	Date 					time.Time
	NumberParticipants		int   
	Equipment				string   

	//FK Room, Personnel this here 

	PersonnelId *uint
	Personnel   Personnel 		`gorm:"foreignKey:PersonnelId"`

	RoomId *uint
	Room   Room 				`gorm:"foreignKey:RoomId"`

	UseForId *uint
	UseFor   UseFor 			`gorm:"foreignKey:UseForId"`

}

type UseFor struct {
	gorm.Model

	UsedForName     	string    

	ReservePlaces 	[]ReservePlace 	`gorm:"foreignkey:UseForId"`
}

type Building struct {
	gorm.Model

	BuildingName 		string
	
	//FK go to Room

	Rooms 	[]Room 	`gorm:"foreignkey:BuildingId"`
}

type Room struct {
	gorm.Model

	RoomName 			string

	//FK go to ReservePlace, ParcelList

	ReservePlaces 	[]ReservePlace 	`gorm:"foreignkey:RoomId"`
	ParcelLists 	[]ParcelList 	`gorm:"foreignkey:RoomId"`

	//FK Building this here 

	BuildingId *uint
	Building   Building 				`gorm:"foreignKey:BuildingId"`
}


type ParcelList struct {
	gorm.Model
	
	ParcelNumber 		string 		`gorm:"unique" valid:"required~กรุณากรอกรหัสพัสดุ,matches(^[P]\\d{5}$)~รูปแบบรหัสพัสดุไม่ถูกต้อง"`
	ParcelName 			string		`valid:"required~กรุณากรอกชื่อรายการพัสดุ"`	
	PricePerPiece		float32		`valid:"required~ราคาต้องมากกว่า 0 เท่านั้น,isPositivefloat~ราคาต้องมากกว่า 0 เท่านั้น"`
	Volume				int			` valid:"required~จำนวนต้องมากกว่า 0 เท่านั้น,isPositiveint~จำนวนต้องมากกว่า 0 เท่านั้น"`
	ParcelDetail 		string		`valid:"required~กรุณากรอกรายละเอียดพัสดุ"`	

	//FK go to ExportParcelList, ImportParcelList

	ExportParcelLists 	[]ExportParcelList 	`gorm:"foreignkey:ParcelListId"`
	ImportParcelLists 	[]ImportParcelList 	`gorm:"foreignkey:ParcelListId"`

	//FK ParcelType, Room this here
	
	ParcelTypeId uint			`valid:"required~กรุณาเลือกประเภท"`	
	ParcelType   ParcelType 	`gorm:"foreignKey:ParcelTypeId"`

	ParcelUnitId uint			`valid:"required~กรุณาเลือกหน่วยนับ"`	
	ParcelUnit   ParcelUnit 	`gorm:"foreignKey:ParcelUnitId"`

	RoomId uint					`valid:"required~กรุณาเลือกสถานที่เก็บพัสดุ"`	
	Room   Room 				`gorm:"foreignKey:RoomId"`
}

type ImportParcelList struct {
	gorm.Model

	ImportVolume 		int 		`valid:"required~must be more than 0,isPositiveint~must be more than 0"`
	ImportNumber 		string 		`gorm:"unique" valid:"required~กรุณากรอกรหัสการนำเข้า,matches(^[I][M][P]\\d{5}$)~รูปแบบรหัสการนำเข้าไม่ถูกต้อง"`
	Seller      		string		`valid:"required~กรุณากรอกข้อมูลผู้ขาย"`
	ImportDate			time.Time	

	//FK ParcelList this here 

	ParcelListId uint			
	ParcelList   ParcelList 	`gorm:"foreignKey:ParcelListId"`

	PersonnelId uint			`valid:"required~กรุณาเลือกผู้ตรวจรับพัสดุ"`
	Personnel   Personnel 		`gorm:"foreignKey:PersonnelId"`
}

type ParcelUnit struct {
	gorm.Model

	ParcelUnit 			string `gorm:"unique" `

	//FK go to ParcelList

	ParcelLists 	[]ParcelList 	`gorm:"foreignkey:ParcelUnitId"`
}

type ParcelType struct {
	gorm.Model

	ParcelType 			string `gorm:"unique"`

	//FK go to ParcelList

	ParcelLists 	[]ParcelList 	`gorm:"foreignkey:ParcelTypeId"`
}

type ExportParcelList struct {
	gorm.Model
	
	ExportVolume    	int 		`valid:"required~จำนวนต้องมากกว่า 0 เท่านั้น,isPositiveint~จำนวนต้องมากกว่า 0 เท่านั้น"`

	//FK ParcelList, PinkUpParcelList this here
	
	ParcelListId uint						`valid:"required~กรุณาเลือกรายการพัสดุ"`
	ParcelList   ParcelList 				`gorm:"foreignKey:ParcelListId"`

	PickUpParcelListId uint				
	PickUpParcelList   PickUpParcelList 	`gorm:"foreignKey:PickUpParcelListId"`
}

type PickUpParcelList struct {
	gorm.Model

	BillNumber			string   	`gorm:"unique" valid:"required~กรุณากรอกเลขที่ใบเบิก, matches(^[E][X][P]\\d{5}$)~รูปแบบเลขที่ใบเบิกไม่ถูกต้อง"`
	DetailOfRequest 	string		`valid:"required~กรุณากรอกข้อมูลเหตุผลในการขอเบิก"`

	PUPLDate			time.Time   

	//FK PersonnelId this here

	PersonnelId uint					`valid:"required~กรุณาเลือกผู้ขอเบิกพัสดุ"`
	Personnel   Personnel 				`gorm:"foreignKey:PersonnelId"`

	PickUpStatusId uint				
	PickUpStatus   PickUpStatus 		`gorm:"foreignKey:PickUpStatusId"`
}

type PickUpStatus struct {
	gorm.Model

	PUPLStatus 	string `gorm:"unique"`

	PickUpParcelLists 	[]PickUpParcelList 	`gorm:"foreignkey:PickUpStatusId"`
}
package entity

import (

	"gorm.io/gorm"
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

	//FK go to PinkUpParcelList, Course, ReservePlace

	PinkUpParcelLists 	[]PinkUpParcelList 		`gorm:"foreignKey:PersonnelId"`
	Courses 			[]Course 				`gorm:"foreignKey:PersonnelId"`
	ReservePlaces 		[]ReservePlace 			`gorm:"foreignKey:PersonnelId"`

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
	GPA 				float32
	

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

	//Date date
	Score 				float32
	AddScoreDetail		string

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

	//Date date
	Status 				string

	//FK go to BehaviorScore

	BehaviorScores 	[]BehaviorScore 		`gorm:"foreignkey:AttendanceId"`

	//FK Activity, Student, Personnel this here

	StudentId *uint
	Student   Student 			`gorm:"foreignKey:StudentId"`

	ActivityId *uint
	Activity   Activity 		`gorm:"foreignKey:ActivityId"`

	PersonnelId *uint
	Personnel   Personnel 		`gorm:"foreignKey:PersonnelId"`

}

type Budget struct {
	gorm.Model

	//Date date
	Name 				string
	Amount 				float32

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

	//Date date
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

	//FK Room, Personnel this here 

	PersonnelId *uint
	Personnel   Personnel 		`gorm:"foreignKey:PersonnelId"`

	RoomId *uint
	Room   Room 				`gorm:"foreignKey:RoomId"`

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

	ParcelNumber 		string
	ParcelName 			string
	PricePerPiece		int
	Amount				int
	ParcelUnit			string
	ParcelDetail 		string
	//PLDate			date

	//FK go to ExportParcelList, ImportParcelList

	ExportParcelLists 	[]ExportParcelList 	`gorm:"foreignkey:ParcelListId"`
	ImportParcelLists 	[]ImportParcelList 	`gorm:"foreignkey:ParcelListId"`

	//FK ParcelType, Room this here
	
	ParcelTypeId *uint
	ParcelType   ParcelType 	`gorm:"foreignKey:ParcelTypeId"`

	RoomId *uint
	Room   Room 				`gorm:"foreignKey:RoomId"`
}

type ImportParcelList struct {
	gorm.Model

	ImportValume 		string
	ImportNumber 		string
	Seller      		int
	//ImprotDate		date

	//FK ParcelList this here 

	ParcelListId *uint
	ParcelList   ParcelList 	`gorm:"foreignKey:ParcelListId"`
}

type ParcelType struct {
	gorm.Model

	ParcelType 			string

	//FK go to ParcelList

	ParcelLists 	[]ParcelList 	`gorm:"foreignkey:ParcelTypeId"`
}

type ExportParcelList struct {
	gorm.Model

	//FK ParcelList, PinkUpParcelList this here
	
	ParcelListId *uint
	ParcelList   ParcelList 				`gorm:"foreignKey:ParcelListId"`

	PinkUpParcelListId *uint
	PinkUpParcelList   PinkUpParcelList 	`gorm:"foreignKey:PinkUpParcelListId"`
}

type PinkUpParcelList struct {
	gorm.Model

	BillNumber			int
	DetailOfRequest 	string
	ExportValume    	int
	Budget				int
	//PUPLDate			date

	//FK PersonnelId this here

	PersonnelId *uint
	Personnel   Personnel 				`gorm:"foreignKey:PersonnelId"`
}
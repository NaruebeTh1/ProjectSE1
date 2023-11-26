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

}

type School struct {
	gorm.Model
	SchoolName 		string
	Address 		string
	TaxId 			string

	//FK go to Budget, Finance, Equipment

}

type Personnel struct {
	gorm.Model
	TitleNamePersonnel 	string
	FirstNamePersonnel 	string
	LastNamePersonnel 	string
	PersonnelTel 		string
	PersonnelPicture 	string

	// FK PositionId, DepartmentId, GenderId 
	// this here

	//FK go to PinkUpParcelListId, CourseId, ReservePlace

}

type Position struct {
	gorm.Model
	Position 			string

	//FK go to PosonnelId
}

type Student struct {
	gorm.Model
	TitleNameStudent 	string
	StudentName 		string
	StudentPicture 		string
	Tel 				string
	GPA 				float32
	

	//FK GenderId this here
	//FK go to ClassRoom, Attendance, BehaviorScore

}

type ClassRoom struct {
	gorm.Model
	Matthayom 			string

	//FK StudentId this here

}

type Gender struct {
	gorm.Model
	Gender  			string

	//FK go to Student, Personnel
}

type Activity struct {
	gorm.Model

	ActivityDetail 		string
	ActivityList 		string

	//FK go to BehaviorScore, Attendance
}

type BehaviorScore struct {
	gorm.Model

	//Date date
	Score 				float32
	AddScoreDetail		string

	//FK Activity, Attendance, Student this here
}

type Attendance struct {
	gorm.Model

	//Date date
	Status 				string

	//FK go to BehaviorScore
	//FK Activity, Student, Posonnel this here
}

type Budget struct {
	gorm.Model

	//Date date
	Name 				string
	Amount 				float32

	//FK BudgetType, School, Posonnel this here
}

type BudgetType struct {
	gorm.Model

	Type 				string

	//FK go to Budget
	
}

type Finance struct {
	gorm.Model

	//Date date
	Name 				string
	Amount 				float32
	Picture 			string

	//FK FinanceType, School, Posonnel this here
}

type FinanceType struct {
	gorm.Model

	Type 				string

	//FK go to Finance
}

type Course struct {
	gorm.Model

	CourseName 			string

	//FK Posonnel, Education, Department this here 
}

type Education struct {
	gorm.Model

	EducationName 		string

	//FK go to Course
}

type Department struct {
	gorm.Model

	Department 			string

	//FK go to Course, Posonnel
}

type Equipment struct {
	gorm.Model

	EquipmentName 		string

	//FK School this here 
}

type ReservePlace struct {
	gorm.Model

	//FK Room, Personnel this here 

}

type Building struct {
	gorm.Model

	BuildingName 		string
	
	//FK go to Room
}

type Room struct {
	gorm.Model

	RoomName 			string

	//FK go to ReservePlace, ParcelList
	//FK Building this here 
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
	//FK ParcelType, Room this here 
}

type ImportParcelList struct {
	gorm.Model

	ImportValume 		string
	ImportNumber 		string
	Seller      		int
	//ImprotDate		date

	//FK ParcelList this here 
}

type ParcelType struct {
	gorm.Model

	ParcelType 			string

	//FK go to ParcelList
}

type ExportParcelList struct {
	gorm.Model

	//FK ParcelList, PinkUpParcelList this here 
}

type PinkUpParcelList struct {
	gorm.Model

	BillNumber			int
	DetailOfRequest 	string
	ExportValume    	int
	Budget				int
	//PUPLDate			date

	//FK ParcelList this here
}
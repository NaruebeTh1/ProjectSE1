package entity

import (
	"time"

	"gorm.io/gorm"

	"github.com/lib/pq"
	_ "github.com/lib/pq"
)

type User struct {
	gorm.Model
	Email     string `gorm:"uniqueIndex"`
	Password  string `gorm:"uniqueIndex"`
	Avartar   string //รูปโปรไฟล์ +++
	Position  string //ตำแหน่งงานในโรงเรียน +++
	TitleName string
	FirstName string
	LastName  string

	// FK SchoolId this here

	SchoolId *uint
	School   School `gorm:"foreignKey:SchoolId"`
}

type School struct {
	gorm.Model
	SchoolName string `gorm:"unique"`
	Address    string `gorm:"unique"`

	//FK go to Budget, Account, Equipment, User

	Budgets    []Budget    `gorm:"foreignKey:SchoolId"`
	Accounts   []Account   `gorm:"foreignKey:SchoolId"`
	Equipments []Equipment `gorm:"foreignKey:SchoolId"`
	Users      []User      `gorm:"foreignKey:SchoolId"`
	Personnels []Personnel `gorm:"foreignKey:SchoolId"`
}

type Personnel struct {
	gorm.Model
	TitleName        string
	FirstName        string
	LastName         string
	PersonnelTel     string `valid:"required~กรุณากรอกเบอร์โทร!, matches(^[0]\\d{9}$)~ข้อมูลเบอร์โทรไม่ถูกต้อง"`
	PersonnelPicture string
	PersonnelEmail   string

	// FK PositionId, DepartmentId, GenderId this here

	PositionId *uint
	Position   Position `gorm:"foreignKey:PositionId"`

	DepartmentId *uint
	Department   Department `gorm:"foreignKey:DepartmentId"`

	GenderId *uint
	Gender   Gender `gorm:"foreignKey:GenderId"`

	SchoolId *uint
	School   School `gorm:"foreignKey:SchoolId"`

	//FK go to PinkUpParcelList, Course, ReservePlace, Budget, Account

	PickUpParcelLists []PickUpParcelList `gorm:"foreignKey:PersonnelId"`
	ImportParcelLists []ImportParcelList `gorm:"foreignKey:PersonnelId"`
	Courses           []Course           `gorm:"foreignKey:PersonnelId"`
	ReservePlaces     []ReservePlace     `gorm:"foreignKey:PersonnelId"`
	Budgets           []Budget           `gorm:"foreignKey:PersonnelId"`
	Accounts          []Account          `gorm:"foreignKey:PersonnelId"`
}

type Position struct {
	gorm.Model
	Position string

	//FK go to PosonnelId

	Personnels []Personnel `gorm:"foreignkey:PositionId"`
}

type Student struct {
	gorm.Model
	TitleNameStudent string
	StudentName      string
	StudentPicture   string
	Tel              string
	GPAX             float32

	//FK GenderId this here

	GenderId *uint
	Gender   Gender `gorm:"foreignKey:GenderId"`

	ClassRoomId *uint
	ClassRoom   ClassRoom `gorm:"foreignKey:ClassRoomId"`

	//FK go to Attendance, BehaviorScore

	// ClassRooms     []ClassRoom     `gorm:"foreignkey:StudentId"`
	Attendances    []Attendance    `gorm:"foreignkey:StudentId"`
	BehaviorScores []BehaviorScore `gorm:"foreignkey:StudentId"`
}

type ClassRoom struct {
	gorm.Model
	Matthayom string

	//FK StudentId this here
	Students []Student `gorm:"foreignkey:ClassRoomId"`
	// StudentId *uint
	// Student   Student `gorm:"foreignKey:StudentId"`

}

type Gender struct {
	gorm.Model
	Gender string

	//FK go to Student, Personnel

	Students   []Student   `gorm:"foreignkey:GenderId"`
	Personnels []Personnel `gorm:"foreignkey:GenderId"`
}

type Activity struct {
	gorm.Model

	ActivityDetail string `valid:"required~กรุณากรอกรายละเอียดกิจกรรม"`
	ActivityList   string `valid:"required~กรุณากรอกชื่อกิจกรรม,stringlength(4|20)"`

	//FK go to BehaviorScore, Attendance

	BehaviorScores []BehaviorScore `gorm:"foreignkey:ActivityId"`
	Attendances    []Attendance    `gorm:"foreignkey:ActivityId"`
}

type BehaviorScore struct {
	gorm.Model

	Date           time.Time `valid:"isPast~behaviorscore date is past"`
	Score          float32   `valid:"InRangeFloat32~Score must be between -50 and 40"`
	AddScoreDetail string    `valid:"maxstringlength(40)~AddScoreDetail is require"`
	CurrentScore   float32

	//FK Activity, Attendance, Student this here

	StudentId *uint
	Student   Student `gorm:"foreignKey:StudentId"`

	ActivityId *uint
	Activity   *Activity `gorm:"foreignKey:ActivityId"`

	AttendanceId *uint
	Attendance   *Attendance `gorm:"foreignKey:AttendanceId"`
}

type Attendance struct {
	gorm.Model

	Date           time.Time
	AttendanceType string
	Status         string
	//FK go to BehaviorScore

	BehaviorScores []BehaviorScore `gorm:"foreignkey:AttendanceId"`

	//FK Activity, Student, Personnel, ClassRoom, AttendanceReport   this here

	StudentId *uint
	Student   *Student `gorm:"foreignKey:StudentId"`

	ActivityId *uint
	Activity   *Activity `gorm:"foreignKey:ActivityId"`

	PersonnelId *uint
	Personnel   *Personnel `gorm:"foreignKey:PersonnelId"`
}

type Budget struct {
	gorm.Model
	Date   time.Time `valid:"required~กรุณาเลือกวันที่,isPast~วันที่ต้องเป็นวันที่ผ่านมาแล้ว"`
	Name   string    `valid:"required~กรุณากรอกชื่อโครงการงบประมาณ,matches(^[ก-๛]+$)~ต้องเป็นภาษาไทยและไม่มีตัวเลข"`
	Amount float32   `valid:"required~ไม่ได้ใส่จำนวนงบประมาณ,float"`

	//FK BudgetType, School, Posonnel this here

	BudgetTypeID *uint
	BudgetType   BudgetType `gorm:"foreignKey:BudgetTypeID"`

	PersonnelId *uint
	Personnel   Personnel `gorm:"foreignKey:PersonnelId" valid:"-"`

	SchoolId *uint
	School   School `gorm:"foreignKey:SchoolId"`
}

type BudgetType struct {
	gorm.Model
	Type string `gorm:"uniqueIndex"`

	//FK go to Budget
	Budgets []Budget `gorm:"foreignkey:BudgetTypeID"`
}

// ทำ entity, validation
type Account struct {
	gorm.Model
	Date      time.Time `valid:"required~กรุณาเลือกวันที่,isPast~วันที่ต้องเป็นวันที่ผ่านมาแล้ว"`
	DocNumber string    `valid:"required~กรุณากรอกเลขที่เอกสาร,matches(^[ก-๛]+$)~ต้องเป็นภาษาไทยและไม่มีตัวเลข"`
	Amount    float32   `valid:"required~ไม่ได้ใส่จำนวนงบประมาณ,float"`
	Receipt   string

	//FK AccountType, School, Posonnel this here

	AccountTypeID *uint
	AccountType   AccountType `gorm:"foreignKey:AccountTypeID"`

	PersonnelId *uint
	Personnel   Personnel `gorm:"foreignKey:PersonnelId" valid:"-"`

	SchoolId *uint
	School   School `gorm:"foreignKey:SchoolId"`
}

type AccountType struct {
	gorm.Model
	Type string `gorm:"uniqueIndex"`

	//FK go to Account

	Accounts []Account `gorm:"foreignkey:AccountTypeID"`
}

type Course struct {
	ID        string `gorm:"primaryKey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`

	CourseName       string         `valid:"required~CourseName is required"`
	Hours            float32        `valid:"required~Hours is required,float"`
	Credit           int            `valid:"isPositive,required~Credit is required"`
	Description      string         `valid:"required~Description is required"`
	LearningOutcomes pq.StringArray `gorm:"type:text[]" valid:"isArraygt3,required~LearningOutcomes is required"`

	//FK Posonnel, Education, Department this here

	PersonnelId *uint
	Personnel   *Personnel `gorm:"foreignKey:PersonnelId"`

	EducationId *uint
	Education   Education `gorm:"foreignKey:EducationId"`

	DepartmentId *uint
	Department   Department `gorm:"foreignKey:DepartmentId"`
}

type Education struct {
	gorm.Model

	EducationName string

	//FK go to Course

	Courses []Course `gorm:"foreignkey:EducationId"`
}

type Department struct {
	gorm.Model

	Department string

	//FK go to Course, Personnel

	Courses    []Course    `gorm:"foreignkey:DepartmentId"`
	Personnels []Personnel `gorm:"foreignkey:DepartmentId"`
}

type Equipment struct {
	gorm.Model

	EquipmentName string

	//FK School this here

	SchoolId uint
	School   School `gorm:"foreignKey:SchoolId"`
}

type ReservePlace struct {
	gorm.Model

	Date time.Time `valid:"required~Date is required,isFuture"`
	// NumberParticipants int `valid:"ispositive"`
	NumberParticipants int            `valid:"isPositive,required~NumberParticipants is required"`
	Equipment          pq.StringArray `gorm:"type:text[]"`
	Topic              string         `valid:"required~Topic is required"`
	Tel                string         `valid:"required~Tel is required, stringlength(10|10)"`
	//FK Room, Personnel this here
	PersonnelId *uint
	Personnel   *Personnel `gorm:"foreignKey:PersonnelId"`

	RoomId *uint `valid:"required~Room is required"`
	Room   Room  `gorm:"foreignKey:RoomId"`

	UseForId *uint
	UseFor   UsedFor `gorm:"foreignKey:UseForId"`
}

type UsedFor struct {
	gorm.Model

	UsedFor       string
	Color         string
	ReservePlaces []ReservePlace `gorm:"foreignkey:UseForId"`
}

type Building struct {
	gorm.Model

	BuildingName string

	//FK go to Room

	Rooms []Room `gorm:"foreignkey:BuildingId"`
}

type Room struct {
	gorm.Model

	RoomName string `gorm:"unique"`

	//FK go to ReservePlace, ParcelList

	ReservePlaces []ReservePlace `gorm:"foreignkey:RoomId"`
	ParcelLists   []ParcelList   `gorm:"foreignkey:RoomId"`

	//FK Building this here

	BuildingId uint
	Building   Building `gorm:"foreignKey:BuildingId"`
}

type ParcelList struct {
	gorm.Model

	ParcelNumber  string  `gorm:"unique" valid:"required~กรุณากรอกรหัสพัสดุ,matches(^[P]\\d{5}$)~รูปแบบรหัสพัสดุไม่ถูกต้อง"`
	ParcelName    string  `valid:"required~กรุณากรอกชื่อรายการพัสดุ"`
	PricePerPiece float32 `valid:"required~ราคาต้องมากกว่า 0 เท่านั้น,isPositivefloat~ราคาต้องมากกว่า 0 เท่านั้น"`
	Volume        int     ` valid:"required~จำนวนต้องมากกว่า 0 เท่านั้น,isPositiveint~จำนวนต้องมากกว่า 0 เท่านั้น"`
	ParcelDetail  string  `valid:"required~กรุณากรอกรายละเอียดพัสดุ"`

	//FK go to ExportParcelList, ImportParcelList

	ExportParcelLists []ExportParcelList `gorm:"foreignkey:ParcelListId"`
	ImportParcelLists []ImportParcelList `gorm:"foreignkey:ParcelListId"`

	//FK ParcelType, Room this here

	ParcelTypeId uint       `valid:"required~กรุณาเลือกประเภท"`
	ParcelType   ParcelType `gorm:"foreignKey:ParcelTypeId"`

	ParcelUnitId uint       `valid:"required~กรุณาเลือกหน่วยนับ"`
	ParcelUnit   ParcelUnit `gorm:"foreignKey:ParcelUnitId"`

	RoomId uint `valid:"required~กรุณาเลือกสถานที่เก็บพัสดุ"`
	Room   Room `gorm:"foreignKey:RoomId"`
}

type ImportParcelList struct {
	gorm.Model

	ImportVolume int    `valid:"required~จำนวนต้องมากกว่า 0 เท่านั้น,isPositiveint~จำนวนต้องมากกว่า 0 เท่านั้น"`
	ImportNumber string `gorm:"unique" valid:"required~กรุณากรอกรหัสการนำเข้า,matches(^[I][M][P]\\d{5}$)~รูปแบบรหัสการนำเข้าไม่ถูกต้อง"`
	Seller       string `valid:"required~กรุณากรอกข้อมูลผู้ขาย"`
	ImportDate   time.Time

	//FK ParcelList this here

	ParcelListId uint
	ParcelList   *ParcelList `gorm:"foreignKey:ParcelListId"`

	PersonnelId uint       `valid:"required~กรุณาเลือกผู้ตรวจรับพัสดุ"`
	Personnel   *Personnel `gorm:"foreignKey:PersonnelId"`
}

type ParcelUnit struct {
	gorm.Model

	ParcelUnit string `gorm:"unique" `

	//FK go to ParcelList

	ParcelLists []ParcelList `gorm:"foreignkey:ParcelUnitId"`
}

type ParcelType struct {
	gorm.Model

	ParcelType string `gorm:"unique"`

	//FK go to ParcelList

	ParcelLists []ParcelList `gorm:"foreignkey:ParcelTypeId"`
}

type ExportParcelList struct {
	gorm.Model

	ExportVolume int `valid:"required~จำนวนต้องมากกว่า 0 เท่านั้น,isPositiveint~จำนวนต้องมากกว่า 0 เท่านั้น"`

	//FK ParcelList, PinkUpParcelList this here

	ParcelListId uint        `valid:"required~กรุณาเลือกรายการพัสดุ"`
	ParcelList   *ParcelList `gorm:"foreignKey:ParcelListId"`

	PickUpParcelListId uint
	PickUpParcelList   *PickUpParcelList `gorm:"foreignKey:PickUpParcelListId"`
}

type PickUpParcelList struct {
	gorm.Model

	BillNumber      string `gorm:"unique" valid:"required~กรุณากรอกเลขที่ใบเบิก, matches(^[E][X][P]\\d{5}$)~รูปแบบเลขที่ใบเบิกไม่ถูกต้อง"`
	DetailOfRequest string `valid:"required~กรุณากรอกข้อมูลเหตุผลในการขอเบิก"`

	PUPLDate time.Time

	//FK PersonnelId this here

	PersonnelId uint       `valid:"required~กรุณาเลือกผู้ขอเบิกพัสดุ"`
	Personnel   *Personnel `gorm:"foreignKey:PersonnelId"`

	PickUpStatusId uint
	PickUpStatus   PickUpStatus `gorm:"foreignKey:PickUpStatusId"`
}

type PickUpStatus struct {
	gorm.Model

	PUPLStatus string `gorm:"unique"`

	PickUpParcelLists []PickUpParcelList `gorm:"foreignkey:PickUpStatusId"`
}

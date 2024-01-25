package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("school_management.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		&User{},
		&School{},
		&Personnel{},
		&Position{},
		&Student{},
		&ClassRoom{},
		&Gender{},
		&Activity{},
		&BehaviorScore{},
		&Attendance{},
		&Budget{},
		&BudgetType{},
		&Account{},
		&AccountType{},
		&Course{},
		&Education{},
		&Department{},
		&Equipment{},
		&ReservePlace{},
		&Building{},
		&UsedFor{},
		&Room{},
		&ParcelList{},
		&ImportParcelList{},
		&ParcelType{},
		&ExportParcelList{},
		&PickUpParcelList{},
	)
	db = database
	ParcelType := []ParcelType{
		{ParcelType: "วัสดุสํานักงาน"},
		{ParcelType: "วัสดุไฟฟ้าและวิทยุ"},
		{ParcelType: "วัสดุงานบ้านงานครัว"},
		{ParcelType: "วัสดุก่อสร้าง"},
		{ParcelType: "วัสดุยานพาหนะและขนส่ง"},
		{ParcelType: "วัสดุเชื้อเพลิงและหล่อลื่น"},
		{ParcelType: "วัสดุวิทยาศาสตร์หรือการแพทย์"},
		{ParcelType: "วัสดุการเกษตร"},
		{ParcelType: "วัสดุโฆษณาและเผยแพร่"},
		{ParcelType: "วัสดุเครื่องแต่งกาย"},
		{ParcelType: "วัสดุกีฬา"},
		{ParcelType: "วัสดุคอมพิวเตอร์"},
	}
	for _, ParcelType := range ParcelType {
		db.Create(&ParcelType)
	}

	ParcelUnit := []ParcelUnit{
		{ParcelUnit: "ม้วน"},
		{ParcelUnit: "กล่อง"},
		{ParcelUnit: "ชิ้น"},
		{ParcelUnit: "แพ็ค"},
		{ParcelUnit: "รีม"},
		{ParcelUnit: "ด้าม"},
		{ParcelUnit: "อัน"},
		{ParcelUnit: "ขวด"},
		{ParcelUnit: "ตลับ"},
		{ParcelUnit: "ผืน"},
		{ParcelUnit: "กระป๋อง"},
		{ParcelUnit: "แผ่น"},
	}
	for _, ParcelUnit := range ParcelUnit {
		db.Create(&ParcelUnit)
	}

	PUPLStatus := []PickUpStatus{
		{PUPLStatus: "รออนุมัติ"},
		{PUPLStatus: "อนุมัติแล้ว"},
	}
	for _, PUPLStatus := range PUPLStatus {
		db.Create(&PUPLStatus)
	}

	Building := []Building{{BuildingName: "เอกอลงกรณ์"},
		{BuildingName: "ทวิราชสุด"},
		{BuildingName: "ตรีวลัยลักษณ์"},
		{BuildingName: "จตุบงกชรัตน์"},
		{BuildingName: "เบญจนัดดา"},
		{BuildingName: "ฉัตรานุสรณ์"}}
	for _, Building := range Building {
		db.Create(&Building)
	}
	var BuildingName1 = uint(1)
	var BuildingName2 = uint(2)
	var BuildingName3 = uint(3)
	var BuildingName4 = uint(4)
	var BuildingName5 = uint(5)
	var BuildingName6 = uint(6)

	Room := []Room{
		{RoomName: "1001", BuildingId: BuildingName1},
		{RoomName: "1002", BuildingId: BuildingName1},
		{RoomName: "1003", BuildingId: BuildingName1},
		{RoomName: "1004", BuildingId: BuildingName1},
		{RoomName: "1005", BuildingId: BuildingName1},
		{RoomName: "1006", BuildingId: BuildingName1},
		{RoomName: "1007", BuildingId: BuildingName1},
		{RoomName: "1008", BuildingId: BuildingName1},
		{RoomName: "1009", BuildingId: BuildingName1},
		{RoomName: "1010", BuildingId: BuildingName1},

		{RoomName: "2001", BuildingId: BuildingName2},
		{RoomName: "2002", BuildingId: BuildingName2},
		{RoomName: "2003", BuildingId: BuildingName2},
		{RoomName: "2004", BuildingId: BuildingName2},
		{RoomName: "2005", BuildingId: BuildingName2},
		{RoomName: "2006", BuildingId: BuildingName2},
		{RoomName: "2007", BuildingId: BuildingName2},
		{RoomName: "2008", BuildingId: BuildingName2},
		{RoomName: "2009", BuildingId: BuildingName2},
		{RoomName: "2010", BuildingId: BuildingName2},

		{RoomName: "3001", BuildingId: BuildingName3},
		{RoomName: "3002", BuildingId: BuildingName3},
		{RoomName: "3003", BuildingId: BuildingName3},
		{RoomName: "3004", BuildingId: BuildingName3},
		{RoomName: "3005", BuildingId: BuildingName3},
		{RoomName: "3006", BuildingId: BuildingName3},
		{RoomName: "3007", BuildingId: BuildingName3},
		{RoomName: "3008", BuildingId: BuildingName3},
		{RoomName: "3009", BuildingId: BuildingName3},
		{RoomName: "3010", BuildingId: BuildingName3},

		{RoomName: "4001", BuildingId: BuildingName4},
		{RoomName: "4002", BuildingId: BuildingName4},
		{RoomName: "4003", BuildingId: BuildingName4},
		{RoomName: "4004", BuildingId: BuildingName4},
		{RoomName: "4005", BuildingId: BuildingName4},
		{RoomName: "4006", BuildingId: BuildingName4},
		{RoomName: "4007", BuildingId: BuildingName4},
		{RoomName: "4008", BuildingId: BuildingName4},
		{RoomName: "4009", BuildingId: BuildingName4},
		{RoomName: "4010", BuildingId: BuildingName4},

		{RoomName: "5001", BuildingId: BuildingName5},
		{RoomName: "5002", BuildingId: BuildingName5},
		{RoomName: "5003", BuildingId: BuildingName5},
		{RoomName: "5004", BuildingId: BuildingName5},
		{RoomName: "5005", BuildingId: BuildingName5},
		{RoomName: "5006", BuildingId: BuildingName5},
		{RoomName: "5007", BuildingId: BuildingName5},
		{RoomName: "5008", BuildingId: BuildingName5},
		{RoomName: "5009", BuildingId: BuildingName5},
		{RoomName: "5010", BuildingId: BuildingName5},

		{RoomName: "6001", BuildingId: BuildingName6},
		{RoomName: "6002", BuildingId: BuildingName6},
		{RoomName: "6003", BuildingId: BuildingName6},
		{RoomName: "6004", BuildingId: BuildingName6},
		{RoomName: "6005", BuildingId: BuildingName6},
		{RoomName: "6006", BuildingId: BuildingName6},
		{RoomName: "6007", BuildingId: BuildingName6},
		{RoomName: "6008", BuildingId: BuildingName6},
		{RoomName: "6009", BuildingId: BuildingName6},
		{RoomName: "6010", BuildingId: BuildingName6},
	}
	for _, Room := range Room {
		db.Create(&Room)
	}

	usedfor := []UsedFor{
		{UsedFor: "จัดกิจกรรม", Color: "#9844E7"},
		{UsedFor: "ประชุม", Color: "#4461E7"},
		{UsedFor: "สอบ", Color: "#0073CC"},
		{UsedFor: "สอนนอกเวลา", Color: "#F6945D"},
		{UsedFor: "ติวเตอร์", Color: "#2A9D8F"},
		{UsedFor: "บันทึกคลิปวิดีโอหรือถ่ายภาพ", Color: "#E23424"},
		{UsedFor: "อื่นๆ", Color: "#4BE744"}}

	for _, usedfor := range usedfor {
		db.Create(&usedfor)
	}
	equipment := []Equipment{
		{EquipmentName: "เครื่องเสียง", SchoolId: 1},
		{EquipmentName: "โปรเจคเตอร์", SchoolId: 1},
		{EquipmentName: "โต๊ะ", SchoolId: 1},
		{EquipmentName: "เก้าอี้", SchoolId: 1},
		{EquipmentName: "คอมพิวเตอร์", SchoolId: 1},
	}

	for _, equipment := range equipment {
		db.Create(&equipment)
	}

	education := []Education{
		{EducationName: "มัธยมศึกษาปีที่ 1"},
		{EducationName: "มัธยมศึกษาปีที่ 2"},
		{EducationName: "มัธยมศึกษาปีที่ 3"},
		{EducationName: "มัธยมศึกษาปีที่ 4"},
		{EducationName: "มัธยมศึกษาปีที่ 5"},
		{EducationName: "มัธยมศึกษาปีที่ 6"},
	}

	for _, education := range education {
		db.Create(&education)
	}

	department := []Department{
		{Department: "คณะบริหาร"},
		{Department: "คณิตศาสตร์"},
		{Department: "วิทยาศาสตร์และเทคโนโลยี"},
		{Department: "ภาษาไทย"},
		{Department: "ภาษาต่างประเทศ"},
		{Department: "สังคมศึกษา ศาสนาและวัฒนธรรม"},
		{Department: "สุขศึกษา พลศึกษา"},
		{Department: "ศิลปศึกษา"},
		{Department: "การงานอาชีพ"},
	}

	for _, department := range department {
		db.Create(&department)
	}
	Gender := []Gender{
		{Gender: "ชาย"},
		{Gender: "หญิง"},
		{Gender: "อื่นๆ"},
	}

	for _, Gender := range Gender {
		db.Create(&Gender)
	}

	Position := []Position{
		{Position: "ผู้อำนวยการ"},
		{Position: "คณะบริหาร"},
		{Position: "หัวหน้ากลุ่มสาระ"},
		{Position: "ครู"},
	}

	for _, Position := range Position {
		db.Create(&Position)
	}
	PersonnelId := uint(1)

	course := []Course{
		{CourseName: "123456", Hours: 2.5, Credit: 10, Description: "asd", LearningOutcomes: []string{"ada132", "1adad32", "13adad2", "13adadadad2"}, PersonnelId: &PersonnelId},
		{CourseName: "123456", Hours: 2.5, Credit: 10, Description: "asd", LearningOutcomes: []string{"ada132", "1adad32", "13adad2", "13adadadad2"}, PersonnelId: &PersonnelId},
		{CourseName: "123456", Hours: 2.5, Credit: 10, Description: "asd", LearningOutcomes: []string{"ada132", "1adad32", "13adad2", "13adadadad2"}, PersonnelId: &PersonnelId},
		{CourseName: "123456", Hours: 2.5, Credit: 10, Description: "asd", LearningOutcomes: []string{"ada132", "1adad32", "13adad2", "13adadadad2"}, PersonnelId: &PersonnelId},
	}

	for _, course := range course {
		db.Create(&course)
	}

	personnel := []Personnel{
		{FirstName: "นายนฤเบศน์", LastName: "จิตรช่วย"},
	}

	for _, personnel := range personnel {
		db.Create(&personnel)
	}

	budgettype := []BudgetType{
		{Type: "งบประเภท 1"},
		{Type: "งบประเภท 2"},
		{Type: "งบประเภท 3"},
	}

	for _, budgettype := range budgettype {
		db.Create(&budgettype)
	}

	accounttype := []AccountType{
		{Type: "รับเข้า"},
		{Type: "เบิกจ่าย"},
	}

	for _, accounttype := range accounttype {
		db.Create(&accounttype)
	}

	school := []School{
		{SchoolName: "โรงเรียนก้าวไก่", Address: "111, Maha Witthayalai Rd, Suranari, Mueang Nakhon Ratchasima District, Nakhon Ratchasima 30000"},
	}

	for _, school := range school {
		db.Create(&school)
	}
}

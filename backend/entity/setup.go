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
		&Finance{},
		&FinanceType{},
		&Course{},
		&Education{},
		&Department{},
		&Equipment{},
		&ReservePlace{},
		&Building{},
		&UseFor{},
		&Room{},
		&ParcelList{},
		&ImportParcelList{},
		&ParcelType{},
		&ExportParcelList{},
		&PickUpParcelList{},
		&PickUpStatus{},
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
}
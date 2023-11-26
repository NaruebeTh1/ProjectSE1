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
		&Room{},
		&ParcelList{},
		&ImportParcelList{},
		&ParcelType{},
		&ExportParcelList{},
		&PinkUpParcelList{},
	)
	db = database
}
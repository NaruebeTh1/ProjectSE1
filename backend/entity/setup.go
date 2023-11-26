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
		// &User_account{},
		// &WorkHasUser{},
		// &Resume{},
		// &Operator_account{},
		// &Notification{},
		// &Candidatepost{},
		// &CandidateSelection{},
	)
	db = database
}
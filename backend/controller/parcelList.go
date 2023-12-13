package controller

import (
	"net/http"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/gin-gonic/gin"
)

// GET /ParcelList


func ListParcelList(c *gin.Context) {
	var parcelList []entity.ParcelList

	// ใช้ GORM method แทน Raw SQL query
	if err := entity.DB().Preload("ParcelUnit").Preload("ParcelType").Preload("Room").Find(&parcelList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": parcelList})
}

// POST /ParcelList
func CreateParcelList(c *gin.Context) {
	var parcellists entity.ParcelList
	var parcelunits entity.ParcelUnit
	var parceltype entity.ParcelType
	var room entity.Room

	// bind เข้าตัวแปร ParcelList
	if err := c.ShouldBindJSON(&parcellists); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", parcellists.ParcelUnitId).First(&parcelunits); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ParcelUnit gnot found"})
		return
	}

	if tx := entity.DB().Where("id = ?", parcellists.ParcelTypeId).First(&parceltype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ParcelType not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", parcellists.RoomId).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}

	// สร้าง ParcelList
	parcel := entity.ParcelList{
		ParcelUnit: 		parcelunits,         
		ParcelType: 		parceltype,         
		Room:    			room,        

		ParcelNumber: 		parcellists.ParcelNumber, 
		ParcelName:  		parcellists.ParcelName,  
		PricePerPiece:     	parcellists.PricePerPiece,    
		Valume:     		parcellists.Valume,   
		ParcelDetail:   	parcellists.ParcelDetail,   
	}

	// บันทึก
	if err := entity.DB().Create(&parcel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": parcel})
}


// GET /ParcelList/:id

func GetParcelList(c *gin.Context) {
	var parcelList entity.ParcelList
	id := c.Param("id")
	if err := entity.DB().Preload("ParcelUnit").Preload("ParcelType").Preload("Room").Raw("SELECT * FROM parcel_lists WHERE id = ?", id).Find(&parcelList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": parcelList})
}


// DELETE /ParcelList/:id

func DeleteParcelList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM parcel_lists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ParcelList not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /ParcelList

func UpdateParcelList(c *gin.Context) {
	var parcelList entity.ParcelList
	var result entity.ParcelList

	if err := c.ShouldBindJSON(&parcelList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา ParcelList ด้วย id
	if tx := entity.DB().Where("id = ?", parcelList.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ParcelList not found"})
		return
	}

	if err := entity.DB().Save(&parcelList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": parcelList})
}

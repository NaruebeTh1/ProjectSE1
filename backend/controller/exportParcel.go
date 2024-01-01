package controller

import (
	"net/http"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

func ListExportParcel(c *gin.Context) {
	var exportparcel []entity.ExportParcelList
	if err := entity.DB().Preload("ParcelList").Preload("PickUpParcelList").Raw("SELECT * FROM export_parcel_lists").Scan(&exportparcel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": exportparcel})
}


// POST /ExportParcel

func CreateExportParcel(c *gin.Context) {
	var exportparcel entity.ExportParcelList
	var parcellists entity.ParcelList
	var pickUpParcelList entity.PickUpParcelList


	// bind เข้าตัวแปร exportparcel
	if err := c.ShouldBindJSON(&exportparcel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(exportparcel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", exportparcel.ParcelListId).First(&parcellists); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ParcelList not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", exportparcel.PickUpParcelListId).First(&pickUpParcelList); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pickUpParcelList not found"})
		return
	}

	exportParcelData  := entity.ExportParcelList{
		PickUpParcelList:   pickUpParcelList,
		ParcelList:   		parcellists,
		ExportVolume: 		exportparcel.ExportVolume,
	}

	// นำค่า Valume ลบค่า ExportValume

    newValume := parcellists.Valume - exportparcel.ExportVolume

    if err := entity.DB().Model(&parcellists).Update("Valume", newValume).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

	// บันทึก
	if err := entity.DB().Create(&exportParcelData).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": exportParcelData})
}
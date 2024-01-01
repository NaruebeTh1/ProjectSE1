package controller

import (
	"net/http"
	"time"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)


func ListPersonnel(c *gin.Context) {
	var personnel []entity.Personnel
	if err := entity.DB().Raw("SELECT * FROM personnels").Scan(&personnel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": personnel})
}

func ListImportParcel(c *gin.Context) {
	var importparcel []entity.ImportParcelList
	if err := entity.DB().Preload("Personnel").Preload("ParcelList").Raw("SELECT * FROM import_parcel_lists").Scan(&importparcel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": importparcel})
}

func GetImportParcelListByParcelListId(c *gin.Context) {
    var importParcels []entity.ImportParcelList
    parcelListId := c.Param("id")

    if err := entity.DB().Preload("Personnel").Preload("ParcelList").Where("parcel_list_id = ?", parcelListId).Find(&importParcels).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": importParcels})
}



// POST /ImportParcel

func CreateImportParcel(c *gin.Context) {
	var importparcels entity.ImportParcelList
	var parcellists entity.ParcelList
	var personnels entity.Personnel


	// bind เข้าตัวแปร importparcel
	if err := c.ShouldBindJSON(&importparcels); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(importparcels); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", importparcels.ParcelListId).First(&parcellists); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ParcelList not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", importparcels.PersonnelId).First(&personnels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Personnel not found"})
		return
	}

	importParcelData  := entity.ImportParcelList{
		Personnel:    personnels,
		ParcelList:   parcellists,
		ImportNumber: importparcels.ImportNumber,
		ImportValume: importparcels.ImportValume,
		Seller:       importparcels.Seller,
		ImportDate:   time.Now(),
	}

	// บวกค่า ImportValume กับ Valume

    newValume := parcellists.Valume + importparcels.ImportValume

    if err := entity.DB().Model(&parcellists).Update("Valume", newValume).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

	// บันทึก
	if err := entity.DB().Create(&importParcelData).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": importParcelData})
}


// GET /ImportParcel/:id

func GetImportParcel(c *gin.Context) {
	var importparcel entity.ImportParcelList
	id := c.Param("id")
	if err := entity.DB().Preload("Personnel").Preload("ParcelList").Raw("SELECT * FROM import_parcel_lists WHERE id = ?", id).Find(&importparcel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": importparcel})
}


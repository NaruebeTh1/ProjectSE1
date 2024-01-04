package controller

import (
	"net/http"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)


func GetExportParcelListByPickUpParcelListId(c *gin.Context) {
    var exportparcel []entity.ExportParcelList
    pickUpParcelListId := c.Param("id")

    if err := entity.DB().Preload("ParcelList").Preload("PickUpParcelList").Where("pick_up_parcel_list_id = ?", pickUpParcelListId).Find(&exportparcel).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": exportparcel})
}

func GetExportParcelListByParcelListId(c *gin.Context) {
    var exportparcel []entity.ExportParcelList
    parcelListId := c.Param("id")

    if err := entity.DB().Preload("ParcelList").Preload("PickUpParcelList").Where("parcel_list_id = ?", parcelListId).Find(&exportparcel).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": exportparcel})
}


// POST /ExportParcel

func CreateExportParcel(c *gin.Context) {
	var exportparcel entity.ExportParcelList
	var parcelLists entity.ParcelList
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

	if tx := entity.DB().Where("id = ?", exportparcel.ParcelListId).First(&parcelLists); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ParcelList not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", exportparcel.PickUpParcelListId).First(&pickUpParcelList); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pickUpParcelList not found"})
		return
	}

	exportParcelData  := entity.ExportParcelList{
		PickUpParcelList:   pickUpParcelList,
		ParcelList:   		parcelLists,
		ExportVolume: 		exportparcel.ExportVolume,
	}

	// นำค่า Valume ลบค่า ExportValume

    newVolume := parcelLists.Volume - exportparcel.ExportVolume

    if err := entity.DB().Model(&parcelLists).Update("Volume", newVolume).Error; err != nil {
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

// DELETE /ParcelList/:id
// ลบแล้วอัปเดตค่า Volume กลับคืนไป โดย Volume = ExportVolume + Volume
func DeleteExportParcelList(c *gin.Context) {
    id := c.Param("id")

    var exportParcel entity.ExportParcelList
    if result := entity.DB().First(&exportParcel, id); result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "ExportParcelList not found"})
        return
    }

    if tx := entity.DB().Exec("DELETE FROM export_parcel_lists WHERE id = ?", id); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "ExportParcelList not found"})
        return
    }

    if tx := entity.DB().Exec("UPDATE parcel_lists SET Volume = Volume + ? WHERE id = ?", exportParcel.ExportVolume, exportParcel.ParcelListId); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Corresponding ParcelList not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": id})
}

package controller

import (
	"net/http"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/gin-gonic/gin"
)

// GET /ParcelUnit

func ListParcelUnit(c *gin.Context) {
	var parcelUnits []entity.ParcelUnit
	if err := entity.DB().Raw("SELECT * FROM parcel_units").Scan(&parcelUnits).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": parcelUnits})
}


func ListRoom(c *gin.Context) {
	var room []entity.Room
	if err := entity.DB().Raw("SELECT * FROM rooms").Scan(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}
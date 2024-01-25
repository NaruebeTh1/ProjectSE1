package controller

import (
	"net/http"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/gin-gonic/gin"
)

// GET /ParcelType

func ListParcelType(c *gin.Context) {
	var parcelTypes []entity.ParcelType
	if err := entity.DB().Raw("SELECT * FROM parcel_types").Scan(&parcelTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": parcelTypes})
}



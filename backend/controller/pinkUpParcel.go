package controller

import (
	"net/http"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/gin-gonic/gin"
)

// GET /PinkUpParcelList

func ListPinkUpParcelList(c *gin.Context) {
	var pinkUpParcelList []entity.PinkUpParcelList
	if err := entity.DB().Raw("SELECT * FROM pink_up_parcel_lists").Scan(&pinkUpParcelList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pinkUpParcelList})
}

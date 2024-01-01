package main

import (
	"github.com/NaruebeTh1/ProjectSE1/controller"
	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/gin-gonic/gin"
)


func main() {
	entity.SetupDatabase()
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/parcelTypes", controller.ListParcelType)
	router.GET("/parcelUnits", controller.ListParcelUnit)
	router.GET("/parcelLists", controller.ListParcelList)
	router.GET("/parcelList/:id", controller.GetParcelList)
	router.GET("/importparcelLists/:id", controller.GetImportParcel)
	router.GET("/importparcelLists", controller.ListImportParcel)
	router.GET("/rooms", controller.ListRoom)
	router.GET("/personnelsP", controller.ListPersonnel)
	router.GET("/getListImportParcel/:id", controller.GetImportParcelListByParcelListId)

	router.POST("/parcelLists", controller.CreateParcelList)
	router.POST("/importparcelLists", controller.CreateImportParcel)
	router.DELETE("/parcelList/:id", controller.DeleteParcelList)
	router.PATCH("/parcelLists", controller.UpdateParcelList)

	router.GET("/pickUpParcelLists", controller.ListPickUpParcelList)
	router.GET("/pickUpParcelListsByStatusId1", controller.GetPickUpParcelListByPickUpStatusId1)
	router.GET("/pickUpParcelListsByStatusId2", controller.GetPickUpParcelListByPickUpStatusId2)
	router.GET("/pickUpParcelLists/:id", controller.GetPickUpParcelListById)
	router.GET("/pickUpstatuses", controller.ListPickUpParcelStatus)

	router.POST("/pickUpParcelLists", controller.CreatePickUpParcelList)
	router.PATCH("/pickUpParcelLists", controller.UpdatePickUpParcelList)
	router.DELETE("/pickUpParcelLists/:id", controller.DeletePickUpParcelList)

	router.GET("/exportparcelLists", controller.ListExportParcel)
	router.POST("/exportparcelLists", controller.CreateExportParcel)

	router.Run(":8080")
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

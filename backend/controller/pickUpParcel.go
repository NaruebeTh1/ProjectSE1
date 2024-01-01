package controller

import (
	"net/http"
	"time"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// GET /PickUpParcelList

func ListPickUpParcelList(c *gin.Context) {
    var pickUpParcelList []entity.PickUpParcelList
    if err := entity.DB().Preload("Personnel").Preload("PickUpStatus").Find(&pickUpParcelList).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": pickUpParcelList})
}



// GET /PickUpStatus

func ListPickUpParcelStatus(c *gin.Context) {
	var pickUpStatus []entity.PickUpStatus
	if err := entity.DB().Raw("SELECT * FROM pick_up_statuses").Scan(&pickUpStatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pickUpStatus})
}


// POST /PickUpParcelList
func CreatePickUpParcelList(c *gin.Context) {
	var pickUpParcelLists entity.PickUpParcelList
	var personnels entity.Personnel
	var pickUpStatus entity.PickUpStatus


	// bind เข้าตัวแปร PickUpParcelList
	if err := c.ShouldBindJSON(&pickUpParcelLists); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(pickUpParcelLists); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", pickUpParcelLists.PersonnelId).First(&personnels); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Personnel gnot found"})
		return
	}

	if tx := entity.DB().Where("id = ?", pickUpParcelLists.PickUpStatusId).First(&pickUpStatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PickUpStatus not found"})
		return
	}

	// สร้าง PickUpParcelList
	pupl := entity.PickUpParcelList{
		Personnel:    		personnels,     
		PickUpStatus: 		pickUpStatus,              

		BillNumber: 		pickUpParcelLists.BillNumber, 
		DetailOfRequest:  	pickUpParcelLists.DetailOfRequest,  
		PUPLDate:     		time.Now(),   
	}

	// บันทึก
	if err := entity.DB().Create(&pupl).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pupl})
}


// GET /PickUpParcelList/:id

func GetPickUpParcelListById(c *gin.Context) {
	var pickUpParcelList entity.PickUpParcelList
	id := c.Param("id")
	if err := entity.DB().Preload("Personnel").Preload("PickUpStatus").Raw("SELECT * FROM pick_up_parcel_lists WHERE id = ?", id).Find(&pickUpParcelList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pickUpParcelList})
}


// DELETE /PickUpParcelList/:id

func DeletePickUpParcelList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM pick_up_parcel_lists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PickUpParcelList not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}


// PATCH /PickUpParcelList

func UpdatePickUpParcelList(c *gin.Context) {
	var pickUpParcelList entity.PickUpParcelList
	var result entity.PickUpParcelList

	if err := c.ShouldBindJSON(&pickUpParcelList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา pickUpParcelList ด้วย id
	if tx := entity.DB().Where("id = ?", pickUpParcelList.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PickUpParcelList not found"})
		return
	}

	if err := entity.DB().Save(&pickUpParcelList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pickUpParcelList})
}


/*การดึงข้อมูล จำแนกสถานะการนุมัติ*/

//รออนุมัติ
func GetPickUpParcelListByPickUpStatusId1(c *gin.Context) {
    var pickUpParcelList []entity.PickUpParcelList

    if err := entity.DB().Preload("Personnel").Preload("PickUpStatus").Where("pick_up_status_id = 1", ).Find(&pickUpParcelList).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": pickUpParcelList})
}


//อนุมัติแล้ว
func GetPickUpParcelListByPickUpStatusId2(c *gin.Context) {
    var pickUpParcelList []entity.PickUpParcelList

    if err := entity.DB().Preload("Personnel").Preload("PickUpStatus").Where("pick_up_status_id = 2", ).Find(&pickUpParcelList).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": pickUpParcelList})
}
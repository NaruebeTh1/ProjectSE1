package integration

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/NaruebeTh1/ProjectSE1/controller"
	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

type resp struct {
	Error string `json:"error"`
}

func TestCreateParcelListIntegration(t *testing.T) {
	entity.SetupDatabase()

	t.Run(`created parcelList success`, func(t *testing.T) {
		// Create a new Gin router
		router := gin.Default()
		// Register the route handler for creating ParcelLists
		router.POST("/parcelLists", controller.CreateParcelList)

		// Define a sample ParcelList
		parcelList := entity.ParcelList{
			ParcelNumber:  "P10009",
			ParcelName:    "parcel name",
			PricePerPiece: 6,
			Volume:         2,
			ParcelDetail:  "detail",
			ParcelTypeId:  1,
			ParcelUnitId:  1,
			RoomId:         1,
		}

		jsonValue, _ := json.Marshal(parcelList)
		reqFound, _ := http.NewRequest("POST", "/parcelLists", bytes.NewBuffer(jsonValue))
		w := httptest.NewRecorder()
		router.ServeHTTP(w, reqFound)

		fmt.Println(w.Body)

		assert.Equal(t, http.StatusCreated, w.Code)
	
	})

	t.Run(`create parcelList is error as field `, func(t *testing.T) {
		r := gin.Default()
		r.POST("/parcelLists", controller.CreateParcelList)
		parcelList := entity.ParcelList{
			ParcelNumber:  "",
			ParcelName:    "parcel name",
			PricePerPiece: 6,
			Volume:         2,
			ParcelDetail:  "detail",
			ParcelTypeId:  1,
			ParcelUnitId:  1,
			RoomId:         1,
		}
		jsonValue, _ := json.Marshal(parcelList)
		reqFound, _ := http.NewRequest("POST", "/parcelLists", bytes.NewBuffer(jsonValue))
		w := httptest.NewRecorder()
		r.ServeHTTP(w, reqFound)
		response := w.Result()
		body, _ := ioutil.ReadAll(response.Body)
		var respJson resp
		json.Unmarshal(body, &respJson)

		// สื่งที่คาดหวังจากการทดสอบ
		assert.Equal(t, http.StatusBadRequest, w.Code)
		assert.Equal(t, "ParcelNumber is required", respJson.Error)

	})
}

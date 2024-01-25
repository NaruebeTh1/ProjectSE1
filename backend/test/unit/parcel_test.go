package unit_test

import (
	"testing"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)



func TestParcelNumberPattern(t *testing.T) {

	g := NewGomegaWithT(t)

    t.Run(`Create Success`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Volume:         2, 
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })

    t.Run(`ParcelNumber Not Null`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "", // not null
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Volume:         2, 
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสพัสดุ"))
    })

    t.Run(`ParcelNumber Pattern Is Not True`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P1000009",
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Volume:         2, 
            ParcelDetail:  "detail", // not null
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("รูปแบบรหัสพัสดุไม่ถูกต้อง"))
    })
}



func TestParcelList(t *testing.T) {

	g := NewGomegaWithT(t)

    t.Run(`Create Success`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Volume:         2, 
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })

    t.Run(`ParcelName Not Null`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "", //not null
            PricePerPiece: 6.5,
            Volume:         2, 
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อรายการพัสดุ"))
    })

    t.Run(`ParcelDetail Not Null`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Volume:         2, 
            ParcelDetail:  "", // not null
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("กรุณากรอกรายละเอียดพัสดุ"))
    })
}

func TestNumberFromParcelList(t *testing.T) {

    // validator.Validators()
	g := NewGomegaWithT(t)

    t.Run(`Create Success`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Volume:         2, 
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })

    t.Run(`PricePerPiece must be more than 0`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P11001", 
            ParcelName:    "parcel name",
            PricePerPiece: -6, // must be more than 0
            Volume:         2, 
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("ราคาต้องมากกว่า 0 เท่านั้น"))
    })

    t.Run(`PricePerPiece must be more than 0`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P11001", 
            ParcelName:    "parcel name",
            PricePerPiece: 0, // must be more than 0
            Volume:         2, 
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("ราคาต้องมากกว่า 0 เท่านั้น"))
    })
   

    t.Run(`Volume must be more than 0`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P11001", 
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Volume:         -5, // must be more than 0
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("จำนวนต้องมากกว่า 0 เท่านั้น"))
    })

    t.Run(`Volume must be more than 0`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P11001", 
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Volume:         0, // must be more than 0
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("จำนวนต้องมากกว่า 0 เท่านั้น"))
    })


   
}
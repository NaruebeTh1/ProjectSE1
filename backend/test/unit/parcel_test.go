package unit_test

import (
	"testing"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/asaskevich/govalidator"
	."github.com/onsi/gomega"
)

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
        g.Expect(err.Error()).To(Equal("ParcelNumber is required"))
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
        g.Expect(err.Error()).To(Equal("ParcelName is required"))
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
        g.Expect(err.Error()).To(Equal("ParcelDetail is required"))
    })
}



func TestNumberFromParcelList(t *testing.T) {
    g := NewGomegaWithT(t)

    t.Run(`PricePerPiece Less Than 0`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "parcel name",
            PricePerPiece:  -5, // negative number
            Volume:         2, 
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("PricePerPiece must be more than 0"))
    })

    t.Run(`PricePerPiece equal 0`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "parcel name",
            PricePerPiece:  0,
            Volume:         2, 
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("PricePerPiece must be more than 0"))
    })

    // t.Run(`Volume Less Than 0`, func(t *testing.T) {
    //     parcelList := entity.ParcelList{
    //         ParcelNumber:  "P10009",
    //         ParcelName:    "parcel name",
    //         PricePerPiece:  10,
    //         Volume:         -2, 
    //         ParcelDetail:  "detail",
    //         ParcelTypeId:  1,
    //         ParcelUnitId:  1,
    //         RoomId:         1,
    //     }

    //     ok, err := govalidator.ValidateStruct(parcelList)

    //     g.Expect(ok).NotTo(BeTrue())
    //     g.Expect(err).NotTo(BeNil())
    //     g.Expect(err.Error()).To(Equal("Volume must be more than or equal 0"))
    // })

    // t.Run(`Create Success`, func(t *testing.T) {
    //     parcelList := entity.ParcelList{
    //         ParcelNumber:  "P10009",
    //         ParcelName:    "parcel name",
    //         PricePerPiece:  10,
    //         Volume:         2, 
    //         ParcelDetail:  "detail",
    //         ParcelTypeId:  1,
    //         ParcelUnitId:  1,
    //         RoomId:         1,
    //     }

    //     ok, err := govalidator.ValidateStruct(parcelList)

    //     g.Expect(ok).To(BeTrue())
    //     g.Expect(err).To(BeNil())
    // })
}


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
            Valume:         2, 
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })

    t.Run(`ParcelNumber is required`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "",
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Valume:         2, 
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

    t.Run(`ParcelName is required`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "",
            PricePerPiece: 6.5,
            Valume:         2, 
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

    t.Run(`ParcelDetail is required`, func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Valume:         2, 
            ParcelDetail:  "",
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




func TestParcelListValidation(t *testing.T) {
    g := NewGomegaWithT(t)

    t.Run("Valume is a positive number", func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Valume:         5,
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })

    t.Run("Valume is zero", func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Valume:         0,
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
    })

    t.Run("Valume is required", func(t *testing.T) {
        parcelList := entity.ParcelList{
            ParcelNumber:  "P10009",
            ParcelName:    "parcel name",
            PricePerPiece: 6.5,
            Valume:         -1,
            ParcelDetail:  "detail",
            ParcelTypeId:  1,
            ParcelUnitId:  1,
            RoomId:         1,
        }

        ok, err := govalidator.ValidateStruct(parcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Valume is required"))
    })
}
package unit_test

import (
	"testing"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestExportParcelList(t *testing.T) {

	g := NewGomegaWithT(t)

    t.Run(`Create Success`, func(t *testing.T) {
        exportparcelList := entity.ExportParcelList{
            ExportVolume:  10,    
            ParcelListId:  1,
            PickUpParcelListId:  1,
        }

        ok, err := govalidator.ValidateStruct(exportparcelList)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })

    t.Run(`ExportVolume is Zero`, func(t *testing.T) {
        exportparcelList := entity.ExportParcelList{
            ExportVolume:  0, // not zero
            ParcelListId:  1,
            PickUpParcelListId:  1,
        }

        ok, err := govalidator.ValidateStruct(exportparcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("จำนวนต้องมากกว่า 0 เท่านั้น"))
    })

	t.Run(`ExportVolume is negative number`, func(t *testing.T) {
        exportparcelList := entity.ExportParcelList{
            ExportVolume:  -10, // nagative number
            ParcelListId:  1,
            PickUpParcelListId:  1,
        }

        ok, err := govalidator.ValidateStruct(exportparcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("จำนวนต้องมากกว่า 0 เท่านั้น"))
    })

    t.Run(`ParcelList Is Required`, func(t *testing.T) {
        exportparcelList := entity.ExportParcelList{
            ExportVolume:  10,    
            //ParcelListId:  1, // not null
            PickUpParcelListId:  1,
        }

        ok, err := govalidator.ValidateStruct(exportparcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("กรุณาเลือกรายการพัสดุ"))
    })
}

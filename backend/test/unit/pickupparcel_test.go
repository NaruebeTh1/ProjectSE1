package unit_test

import (
	"testing"
	"time"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)


func TestPickUpParcelList(t *testing.T) {

	g := NewGomegaWithT(t)

    t.Run(`Create Success`, func(t *testing.T) {
        pickUpParcelList := entity.PickUpParcelList{
            BillNumber:  "EXP12345",
            DetailOfRequest:   "detail test", 
            PUPLDate: time.Now(),
            PersonnelId:  2,
            PickUpStatusId:  1,
        }

        ok, err := govalidator.ValidateStruct(pickUpParcelList)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })

    t.Run(`BillNumber is Required`, func(t *testing.T) {
        pickUpParcelList := entity.PickUpParcelList{
            BillNumber:  "", // not null
            DetailOfRequest:   "detail", 
            PUPLDate: time.Now(),
            PersonnelId:  1,
            PickUpStatusId:  1,
        }

        ok, err := govalidator.ValidateStruct(pickUpParcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("กรุณากรอกเลขที่ใบเบิก"))
    })

	t.Run(`BillNumber Pattern is not true`, func(t *testing.T) {
        pickUpParcelList := entity.PickUpParcelList{
            BillNumber:  "EXP123456", //pattern is not true
            DetailOfRequest:   "detail", 
            PUPLDate: time.Now(),
            PersonnelId:  1,
            PickUpStatusId:  1,
        }

        ok, err := govalidator.ValidateStruct(pickUpParcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("รูปแบบเลขที่ใบเบิกไม่ถูกต้อง"))
    })

	t.Run(`DetailOfRequest is Required`, func(t *testing.T) {
        pickUpParcelList := entity.PickUpParcelList{
            BillNumber:  "EXP10001",
            DetailOfRequest:   "", // not null
            PUPLDate: time.Now(),
            PersonnelId:  1,
            PickUpStatusId:  1,
        }

        ok, err := govalidator.ValidateStruct(pickUpParcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("กรุณากรอกข้อมูลเหตุผลในการขอเบิก"))
    })

	t.Run(`Personnel is Required`, func(t *testing.T) {
        pickUpParcelList := entity.PickUpParcelList{
            BillNumber:  "EXP10001",
            DetailOfRequest:   "detail", 
            PUPLDate: time.Now(),
            //PersonnelId:  1, // required
            PickUpStatusId:  1,
        }

        ok, err := govalidator.ValidateStruct(pickUpParcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("กรุณาเลือกผู้ขอเบิกพัสดุ"))
    })

}

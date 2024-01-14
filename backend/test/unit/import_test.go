package unit_test

import (
	"testing"
	"time"

	"github.com/NaruebeTh1/ProjectSE1/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestImportNumberPattern(t *testing.T) {

	g := NewGomegaWithT(t)

    t.Run(`Create Success`, func(t *testing.T) {
        importparcelList := entity.ImportParcelList{
            ImportVolume:  10,
            ImportNumber:   "IMP10001",
            Seller: "ร้านไทยพัสดุ",    
            ImportDate: time.Now(),
            ParcelListId:  1,
            PersonnelId:  1,
        }

        ok, err := govalidator.ValidateStruct(importparcelList)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })

    t.Run(`ImportNumber Not Null`, func(t *testing.T) {
        importparcelList := entity.ImportParcelList{
            ImportVolume:  10,
            ImportNumber:   "", // not null
            Seller: "ร้านไทยพัสดุ",    
            ImportDate: time.Now(),
            ParcelListId:  1,
            PersonnelId:  1,
        }

        ok, err := govalidator.ValidateStruct(importparcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสการนำเข้า"))
    })

    t.Run(`ImportNumber Pattern Is Not True`, func(t *testing.T) {
        importparcelList := entity.ImportParcelList{
            ImportVolume:  10,
            ImportNumber:   "IMP10001111", // pattern is not true
            Seller: "ร้านไทยพัสดุ",    
            ImportDate: time.Now(),
            ParcelListId:  1,
            PersonnelId:  1,
        }

        ok, err := govalidator.ValidateStruct(importparcelList)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("รูปแบบรหัสการนำเข้าไม่ถูกต้อง"))
    })
}



// func TestImportParcelList(t *testing.T) {

// 	g := NewGomegaWithT(t)

    // t.Run(`Create Success`, func(t *testing.T) {
    //     importparcelList := entity.ImportParcelList{
    //         ImportVolume:  10,
    //         ImportNumber:   "ImportNumber",
    //         Seller: "Seller",    
    //         ImportDate: time.Now(),
    //         ParcelListId:  1,
    //         PersonnelId:  1,
    //     }

    //     ok, err := govalidator.ValidateStruct(importparcelList)

    //     g.Expect(ok).To(BeTrue())
    //     g.Expect(err).To(BeNil())
    // })

//     t.Run(`ImportVolume is zero`, func(t *testing.T) {
//         importparcelList := entity.ImportParcelList{
//             ImportVolume:  0,
//             ImportNumber:   "ImportNumber",
//             Seller: "Seller",    
//             ImportDate: time.Now(),
//             ParcelListId:  1,
//             PersonnelId:  1,
//         }

//         ok, err := govalidator.ValidateStruct(importparcelList)

//         g.Expect(ok).NotTo(BeTrue())
//         g.Expect(err).NotTo(BeNil())
//         g.Expect(err.Error()).To(Equal("must be more than 0"))
//     })

// 	t.Run(`ImportVolume is nagative number`, func(t *testing.T) {
//         importparcelList := entity.ImportParcelList{
//             ImportVolume:  -5,
//             ImportNumber:   "ImportNumber",
//             Seller: "Seller",    
//             ImportDate: time.Now(),
//             ParcelListId:  1,
//             PersonnelId:  1,
//         }

//         ok, err := govalidator.ValidateStruct(importparcelList)

//         g.Expect(ok).NotTo(BeTrue())
//         g.Expect(err).NotTo(BeNil())
//         g.Expect(err.Error()).To(Equal("จำนวนต้องมากกว่า 0 เท่านั้น"))
//     })

// 	t.Run(`Seller not null`, func(t *testing.T) {
//         importparcelList := entity.ImportParcelList{
//             ImportVolume:  10,
//             ImportNumber:   "ImportNumber",
//             Seller: "",    
//             ImportDate: time.Now(),
//             ParcelListId:  1,
//             PersonnelId:  1,
//         }

//         ok, err := govalidator.ValidateStruct(importparcelList)

//         g.Expect(ok).NotTo(BeTrue())
//         g.Expect(err).NotTo(BeNil())
//         g.Expect(err.Error()).To(Equal("กรุณากรอกข้อมูลผู้ขาย"))
//     })

// 	t.Run(`ImportDate not null`, func(t *testing.T) {
//         importparcelList := entity.ImportParcelList{
//             ImportVolume:  10,
//             ImportNumber:   "ImportNumber",
//             Seller: "Seller",    
//             //ImportDate: time.Now(),
//             ParcelListId:  1,
//             PersonnelId:  1,
//         }

//         ok, err := govalidator.ValidateStruct(importparcelList)

//         g.Expect(ok).NotTo(BeTrue())
//         g.Expect(err).NotTo(BeNil())
//         g.Expect(err.Error()).To(Equal("กรุณาเลือกวันที่นำเข้า"))
//     })

// 	t.Run(`Personnel not null`, func(t *testing.T) {
//         importparcelList := entity.ImportParcelList{
//             ImportVolume:  10,
//             ImportNumber:   "ImportNumber",
//             Seller: "Seller",    
//             ImportDate: time.Now(),
//             ParcelListId:  1,
//         }

//         ok, err := govalidator.ValidateStruct(importparcelList)

//         g.Expect(ok).NotTo(BeTrue())
//         g.Expect(err).NotTo(BeNil())
//         g.Expect(err.Error()).To(Equal("กรุณาเลือกผู้ตรวจรับพัสดุ"))
//     })

// }

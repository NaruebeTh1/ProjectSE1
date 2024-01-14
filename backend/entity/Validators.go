package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
)

func init() {
	Validatenumber()
}

func Validatenumber() {
	govalidator.CustomTypeTagMap.Set("isPositiveint", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		n := i.(int)
		return n >= 0
	}))

	govalidator.CustomTypeTagMap.Set("isPositivefloat", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		n := i.(float32)
		return n > 0
	}))

	govalidator.CustomTypeTagMap.Set("isFuture", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	}))
}
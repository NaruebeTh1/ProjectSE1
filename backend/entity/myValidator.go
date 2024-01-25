package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/lib/pq"
)

func init() {
	govalidator.CustomTypeTagMap.Set("isPositive", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		n := i.(int)
		return n > 0
	}))
	govalidator.CustomTypeTagMap.Set("isFuture", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	}))
	govalidator.CustomTypeTagMap.Set("isPast", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	}))
	govalidator.CustomTypeTagMap.Set("isArraygt3", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		s, ok := i.(pq.StringArray)
		return ok && len(s) > 2
	}))
	govalidator.CustomTypeTagMap.Set("isPositiveint", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		n := i.(int)
		return n >= 0
	}))
	govalidator.CustomTypeTagMap.Set("isPositivefloat", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		n := i.(float32)
		return n > 0
	}))

	govalidator.CustomTypeTagMap.Set("InRangeFloat32", govalidator.CustomTypeValidator(func(i interface{}, _ interface{}) bool {
		value, ok := i.(float32)
		if !ok {
			return false
		}
	
		// Adjust these values according to your specific requirements
		left := float32(-50)
		right := float32(40)

		if left > right {left, right = right, left}
		return value >= left && value <= right
	}))
	
}

package validator

import (
	"regexp"
	"strconv"
	"time"
	"github.com/asaskevich/govalidator"
)

func init() {
	Validators()
}


func Validators() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, c interface{}) bool {
		return i.(time.Time).Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, c interface{}) bool {
		return i.(time.Time).After(time.Now())
	})

	govalidator.ParamTagMap["gte"] = func(str string, params ...string) bool {
		int_param, _ := strconv.ParseInt(params[0], 10, 64)
		int_input, _ := strconv.ParseInt(str, 10, 64)
		return int_input >= int_param
	}


	govalidator.ParamTagMap["gt"] = func(str string, params ...string) bool {
		float32_param, _ := strconv.ParseFloat(params[0], 32)
		float32_input, _ := strconv.ParseFloat(str, 32)
		return float32_input > float32_param
	}
	

	govalidator.ParamTagRegexMap["gte"] = regexp.MustCompile(`gte=(\d+)`)
	govalidator.ParamTagRegexMap["gt"] = regexp.MustCompile(`gt=(\d+)`)
}
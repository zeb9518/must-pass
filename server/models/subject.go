package models

/** 科目 */
type Subject struct {
	Base
	Name        string `gorm:"name" json:"name" form:"name"`                      // 科目名称
	Code        string `gorm:"code" json:"code" form:"code"`                      // 科目编号
	Image       string `gorm:"image" json:"image" form:"image"`                   // 科目图片
	Description string `gorm:"description" json:"description" form:"description"` // 科目描述
}

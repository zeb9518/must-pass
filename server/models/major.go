package models

/** 专业 */
type Major struct {
	Base
	Name string `gorm:"name" json:"name" form:"name"` // 专业名称
}

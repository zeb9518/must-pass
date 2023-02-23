package models

import "time"

// @description: 数据结构超类
// @return {*}
type Base struct {
	Id uint64 `gorm:"primaryKey" json:"id" form:"id"` // 编号
	//Status  uint   `gorm:"status" json:"status" form:"status"` // 状态
	CreatedAt time.Time // 创建时间
	UpdatedAt time.Time // 更新时间
	Page      Page      `gorm:"-"`
}

// @description: 分页参数模型
// @return {*}
type Page struct {
	PageNum  int `form:"pageNum"  json:"pageNum"`
	PageSize int `form:"pageSize" json:"pageSize"`
}

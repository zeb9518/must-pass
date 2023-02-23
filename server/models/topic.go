package models

type QTopic struct {
	Base
	SubjectId   uint64 `gorm:"subject_id" json:"subjectId" form:"subjectId"`
	Type        uint64 `gorm:"type" json:"type" form:"type"`
	Title       string `gorm:"title" json:"title" form:"title"`
	Answer      string `gorm:"answer" json:"answer" form:"answer"`
	Description string `gorm:"description" json:"description" form:"description"`
	A           string `gorm:"a" json:"A" form:"A"`
	B           string `gorm:"b" json:"B" form:"B"`
	C           string `gorm:"c" json:"C" form:"C"`
	D           string `gorm:"d" json:"D" form:"D"`
	E           string `gorm:"e" json:"E" form:"E"`
	F           string `gorm:"f" json:"F" form:"F"`
}

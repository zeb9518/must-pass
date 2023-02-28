package service

import (
	"server/global"
	"server/models"
)

type TopicService struct {
}

// 创建题目
func (this *TopicService) Create(qTopics []models.QTopic) int64 {
	var count int64 = 0
	for _, topic := range qTopics {
		count += global.Db.Create(&topic).RowsAffected
	}
	return count
}

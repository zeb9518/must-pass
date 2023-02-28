package app

import (
	"github.com/gin-gonic/gin"
	"server/service"
)

type TopicApi struct {
	service.TopicService
}

// 获取题目
func (this *TopicApi) GetTopic(c *gin.Context) {

}

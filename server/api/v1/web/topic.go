package web

import (
	"github.com/gin-gonic/gin"
	"z-issue/global"
	"z-issue/models"
	"z-issue/service"
)

type TopicApi struct {
	topicService *service.TopicService
}

// 获取app业务配置
func (this *TopicApi) CreateTopic(c *gin.Context) {
	var param []models.QTopic
	if err := c.ShouldBind(&param); err != nil {
		global.Failed(global.ParamInvalid, c)
	}
	global.Success(global.SaveSuccess, this.topicService.Create(param), c)
}

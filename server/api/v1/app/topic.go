package app

import (
	"github.com/gin-gonic/gin"
	"z-issue/service"
)

type TopicApi struct {
	topicService *service.TopicService
}

func (this *TopicApi) getTopic(c *gin.Context) {

}

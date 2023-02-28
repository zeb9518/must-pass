package initialize

import (
	"github.com/gin-gonic/gin"
	v1 "server/api/v1"
)

func Router() {
	engine := gin.Default()
	Api := engine.Group("/api")
	{
		Api.POST("/topic/create", v1.Group.TopicApi.CreateTopic)
	}

	App := engine.Group("/app/api")
	{
		App.GET("subject/list", v1.Group.AppSubject.GetSubjectList)
		App.GET("topic/list", v1.Group.AppTopic.GetTopic)
	}

	// 启动、监听端口
	_ = engine.Run(":9910")
}

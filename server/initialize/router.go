package initialize

import (
	"github.com/gin-gonic/gin"
	v1 "z-issue/api/v1"
)

func Router() {
	engine := gin.Default()
	Api := engine.Group("/api")
	{
		Api.POST("/topic/create", v1.Group.TopicApi.CreateTopic)
	}

	// 启动、监听端口
	_ = engine.Run(":9910")
}

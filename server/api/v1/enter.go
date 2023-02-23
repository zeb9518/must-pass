package v1

import (
	"z-issue/api/v1/app"
	"z-issue/api/v1/web"
)

type WebGroup struct {
	AppTopic app.TopicApi
	web.TopicApi
}

var Group = new(WebGroup)

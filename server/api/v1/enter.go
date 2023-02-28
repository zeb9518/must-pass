package v1

import (
	"server/api/v1/app"
	"server/api/v1/web"
)

type WebGroup struct {
	AppTopic   app.TopicApi
	AppSubject app.SubjectApi
	web.TopicApi
}

var Group = new(WebGroup)

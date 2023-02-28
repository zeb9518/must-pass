package app

import (
	"github.com/gin-gonic/gin"
	"server/global"
	"server/service"
)

type SubjectApi struct {
	service.SubjectService
}

func (this *SubjectApi) GetSubjectList(ctx *gin.Context) {
	global.Success(global.Selected, this.FindSubjectList(), ctx)
}

package global

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"

	"github.com/gin-gonic/gin"
)

const (
	ParamInvalid = "请求参数无效"
	Created      = "已添加"
	Deleted      = "已删除"
	Canceled     = "已取消"
	Updated      = "已编辑"
	Selected     = "查询成功"

	NotCreated  = "添加失败"
	NotDeleted  = "删除失败"
	NotCanceled = "取消失败"
	NotUpdated  = "编辑失败"
	NotSelected = "未查询到数据"

	SendSuccess = "发送成功"
	SendFailed  = "发送失败"

	LoginSuccess = "登录成功"
	LoginFailed  = "登录失败"

	SaveSuccess = "保存成功"
	SaveFailed  = "保存失败"
)

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

// PageResult 分页结果返回
type PageResult struct {
	Total int64       `json:"total"`
	List  interface{} `json:"list"`
}

// Success 请求成功返回
func Success(message string, data interface{}, c *gin.Context) {
	c.JSON(http.StatusOK, Response{200, message, data})
}

// Failed 请求失败返回
func Failed(message string, c *gin.Context) {
	c.JSON(http.StatusOK, Response{400, message, 0})
}

// Overdue 登录过期返回
func Overdue(message string, c *gin.Context) {
	c.JSON(http.StatusOK, Response{401, message, 0})
}

// SuccessPage 请求成功返回分页结果
func SuccessPage(message string, data interface{}, rows int64, c *gin.Context) {
	page := &PageResult{Total: rows, List: data}
	c.JSON(http.StatusOK, Response{200, message, page})
}

// Excel下载
func Excel(c *gin.Context, content io.ReadSeeker, fileName string) {

	c.Header("Access-Control-Expose-Headers", "Content-Disposition")
	fileName = url.QueryEscape(fileName)

	c.Writer.Header().Add("Content-Disposition", fmt.Sprintf(`attachment; filename=%s`, fileName))
	// c.Writer.Header().Add("Content-Disposition", fmt.Sprintf("attachment; filename*=utf-8''%s", url.QueryEscape(fileName)))
	c.Writer.Header().Add("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

	http.ServeContent(c.Writer, c.Request, fileName, time.Now(), content)
}

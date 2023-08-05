package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func handler(ctx *gin.Context, f func(ctx *gin.Context) error) {
	if err := f(ctx); err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
	}
}

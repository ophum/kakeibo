package main

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/ophum/kakeibo/models"
)

type History struct {
	ID        int                `json:"id"`
	Type      models.HistoryType `json:"type"`
	Amount    int                `json:"amount"`
	Date      time.Time          `json:"date"`
	CreatedAt time.Time          `json:"created_at"`
}
type HistoriesResponse struct {
	Histories []History `json:"histories"`
}

type NewHistoryRequest struct {
	Type   models.HistoryType `json:"type" binding:"required,oneof=received send"`
	Amount int                `json:"amount" binding:"required"`
	Date   time.Time          `json:"date" binding:"required"`
}

func main() {
	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	r.Use(cors.New(config))

	mu := sync.Mutex{}
	increment := 0
	histories := []*models.History{}

	r.GET("/histories", func(ctx *gin.Context) {
		res := HistoriesResponse{
			Histories: make([]History, len(histories)),
		}
		for i, h := range histories {
			res.Histories[i] = History{
				ID:        h.ID,
				Type:      h.Type,
				Amount:    h.Amount,
				Date:      h.Date,
				CreatedAt: h.CreatedAt,
			}
		}
		ctx.JSON(http.StatusOK, res)
	})
	r.POST("/histories", func(ctx *gin.Context) {
		var req NewHistoryRequest
		if err := ctx.ShouldBindJSON(&req); err != nil {
			ctx.AbortWithError(http.StatusBadRequest, err)
			return
		}

		mu.Lock()
		increment++
		history := &models.History{
			ID:        increment,
			Type:      req.Type,
			Amount:    req.Amount,
			Date:      req.Date,
			CreatedAt: time.Now(),
		}
		histories = append(histories, history)
		mu.Unlock()

		ctx.JSON(http.StatusCreated, History{
			ID:        history.ID,
			Type:      history.Type,
			Amount:    history.Amount,
			Date:      history.Date,
			CreatedAt: history.CreatedAt,
		})
	})
	if err := r.Run(":8080"); err != nil {
		panic(err)
	}
}

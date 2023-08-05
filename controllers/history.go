package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/ophum/kakeibo/models"
	"gorm.io/gorm"
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
type HistoryController struct {
	db *gorm.DB
}

func NewHistoryController(db *gorm.DB) *HistoryController {
	return &HistoryController{
		db: db,
	}
}

func (c *HistoryController) FindAll(ctx *gin.Context) {
	handler(ctx, c.findAll)
}

func (c *HistoryController) findAll(ctx *gin.Context) error {
	var histories []*models.History
	if err := c.db.Order("date ASC").Find(&histories).Error; err != nil {
		return err
	}
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
	return nil
}

func (c *HistoryController) New(ctx *gin.Context) {
	handler(ctx, c.new)
}

func (c *HistoryController) new(ctx *gin.Context) error {
	var req NewHistoryRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		return err
	}

	history := models.History{
		Type:      req.Type,
		Amount:    req.Amount,
		Date:      req.Date,
		CreatedAt: time.Now(),
	}
	if err := c.db.Create(&history).Error; err != nil {
		return err
	}

	ctx.JSON(http.StatusCreated, History{
		ID:        history.ID,
		Type:      history.Type,
		Amount:    history.Amount,
		Date:      history.Date,
		CreatedAt: history.CreatedAt,
	})
	return nil
}

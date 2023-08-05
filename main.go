package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/ophum/kakeibo/controllers"
	"github.com/ophum/kakeibo/models"

	"gorm.io/driver/mysql"
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

func main() {
	db, err := gorm.Open(mysql.Open("root:@tcp(127.0.0.1:4000)/kakeibo?charset=utf8mb4&parseTime=True&loc=Local&tls=skip-verify"))
	if err != nil {
		panic(err)
	}
	sqlDB, err := db.DB()
	if err != nil {
		panic(err)
	}
	defer sqlDB.Close()

	db.AutoMigrate(&models.History{})

	historyController := controllers.NewHistoryController(db)

	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	r.Use(cors.New(config))

	r.GET("/histories", historyController.FindAll)
	r.POST("/histories", historyController.New)

	if err := r.Run(":8080"); err != nil {
		panic(err)
	}
}

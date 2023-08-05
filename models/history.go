package models

import "time"

type HistoryType string

const (
	HistoryTypeReceived HistoryType = "Received"
	HistoryTypeSend     HistoryType = "Send"
)

type History struct {
	ID        int `gorm:"primaryKey;default:auto_random()"`
	Type      HistoryType
	Amount    int
	Date      time.Time
	CreatedAt time.Time
}

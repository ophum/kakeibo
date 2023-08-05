package models

import "time"

type HistoryType string

const (
	HistoryTypeReceived HistoryType = "Received"
	HistoryTypeSend     HistoryType = "Send"
)

type History struct {
	ID        int
	Type      HistoryType
	Amount    int
	Date      time.Time
	CreatedAt time.Time
}

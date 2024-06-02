package main

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
	"receptacle/internal/pkg/dynamoDbGeo"
)

func HandleRequest(ctx context.Context, event dynamoDbGeo.LatLng) (any, error) {
	_, err := dynamoDbGeo.CreatePoint(event)
	if err != nil {
		return nil, err
	}

	return struct {
		Message string `json:"message"`
		Data    any    `json:"data"`
	}{
		Message: "success",
		Data:    event,
	}, nil
}

func main() {
	lambda.Start(HandleRequest)
}

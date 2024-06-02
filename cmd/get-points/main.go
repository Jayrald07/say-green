package main

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
	"receptacle/internal/pkg/dynamoDbGeo"
)

func HandleRequest(ctx context.Context, event dynamoDbGeo.GetPointsOptions) (any, error) {
	points, err := dynamoDbGeo.GetPoints(event)
	if err != nil {
		return nil, err
	}

	return struct {
		Message string `json:"message"`
		Data    any    `json:"data"`
	}{
		Message: "success",
		Data:    points,
	}, nil
}

func main() {
	lambda.Start(HandleRequest)
}

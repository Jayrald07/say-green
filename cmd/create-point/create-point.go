package main

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
	"receptacle/internal/pkg/dynamoDbGeo"
)

func main() {
	lambda.Start(Handler)
}

func Handler(ctx context.Context, input dynamoDbGeo.LatLng) (any, error) {
	_, err := dynamoDbGeo.CreatePoint(input)
	if err != nil {
		return nil, err
	}

	return struct {
		Message string `json:"message"`
		Data    any    `json:"data"`
	}{
		Message: "success",
		Data:    input,
	}, nil
}

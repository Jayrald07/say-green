package main

import (
	"context"
	"errors"
)

func handler(ctx context.Context, lambdaInput lambdaInput) (interface{}, error) {
	err := validateInput(&lambdaInput)
	if err != nil {
		return nil, err
	}

	var data any
	message := "Receptacle location stored"

	switch *lambdaInput.Type {
	case "create":
		data, err = handleCreateReceptacle(ctx, &lambdaInput.Payload)
	case "get":
		data, err = handleGetReceptacles(ctx)
		message = "Receptacles fetched"
	case "delete":
		err = handleDeleteReceptacles(ctx, *lambdaInput.Payload.Hash)
		message = "Receptacle deleted"
	}

	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"message": message,
		"data":    data,
	}, nil
}

func handleCreateReceptacle(ctx context.Context, location *receptacleLocation) (interface{}, error) {
	hash, err := create(ctx, *location.Longitude, *location.Latitude)
	if err != nil {
		return hash, err
	}

	return map[string]interface{}{
		"hash": hash,
	}, nil
}

func handleGetReceptacles(ctx context.Context) ([]receptacleLocation, error) {

	return query(ctx)

}

func handleDeleteReceptacles(ctx context.Context, hash string) error {

	return delete(ctx, hash)

}

func validateInput(input *lambdaInput) error {
	if input.Type == nil {
		return errors.New("type is expected")
	}

	if *input.Type == "get" {
		return nil
	}

	if *input.Type == "delete" {
		if input.Payload.Hash == nil {
			return errors.New("hash is expected")
		}

		return nil
	}

	if input.Payload.Latitude == nil {
		return errors.New("latitude is expected")
	}

	if input.Payload.Longitude == nil {
		return errors.New("longitude is expected")
	}

	return nil
}

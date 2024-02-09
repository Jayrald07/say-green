package storeReceptacleLambda

import (
	"context"
	"sync"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/expression"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/google/uuid"
)

var (
	dynamoDbInstance *dynamodb.Client = nil
	dynamoDbError    error            = nil
	dynamoDbSync     sync.Once
)

func getDynamoDbInstance(ctx context.Context) (*dynamodb.Client, error) {
	dynamoDbSync.Do(func() {
		configuration, err := config.LoadDefaultConfig(ctx)
		if err != nil {
			dynamoDbError = err
			return
		}

		dynamoDbInstance = dynamodb.NewFromConfig(configuration)
	})

	return dynamoDbInstance, dynamoDbError
}

func create(ctx context.Context, longitude, latitude float64) (string, error) {
	dynamoDbCurrentInstance, err := getDynamoDbInstance(ctx)
	if err != nil {
		return "", err
	}

	uuidString, err := uuid.NewUUID()
	if err != nil {
		return "", err
	}

	receptacleItem := map[string]interface{}{
		"hash":      uuidString.String(),
		"sort":      "receptacle",
		"longitude": longitude,
		"latitude":  latitude,
		"type":      "location",
	}

	dynamoDbMappedItem, err := attributevalue.MarshalMap(receptacleItem)
	if err != nil {
		return "", err
	}

	_, err = dynamoDbCurrentInstance.PutItem(ctx, &dynamodb.PutItemInput{
		TableName: aws.String("SayGreen"),
		Item:      dynamoDbMappedItem,
	})
	if err != nil {
		return "", err
	}

	return uuidString.String(), nil
}

func query(ctx context.Context) ([]receptacleLocation, error) {
	dynamoDbCurrentInstance, err := getDynamoDbInstance(ctx)
	if err != nil {
		return nil, err
	}

	hash := expression.Key("type").Equal(expression.Value("location"))
	sort := expression.Key("sort").Equal(expression.Value("receptacle"))

	keyExpresion, err := expression.NewBuilder().WithKeyCondition(hash.And(sort)).Build()
	if err != nil {
		return nil, err
	}

	queryResult, err := dynamoDbCurrentInstance.Query(ctx, &dynamodb.QueryInput{
		TableName:                 aws.String("SayGreen"),
		IndexName:                 aws.String("typeSort"),
		ExpressionAttributeNames:  keyExpresion.Names(),
		ExpressionAttributeValues: keyExpresion.Values(),
		KeyConditionExpression:    keyExpresion.KeyCondition(),
	})
	if err != nil {
		return nil, err
	}

	var items []receptacleLocation

	err = attributevalue.UnmarshalListOfMaps(queryResult.Items, &items)
	if err != nil {
		return nil, err
	}

	return items, nil
}

func delete(ctx context.Context, hash string) error {
	dynamoDbCurrentInstance, err := getDynamoDbInstance(ctx)
	if err != nil {
		return err
	}

	hashMap := map[string]string{
		"hash": hash,
		"sort": "receptacle",
	}

	mappedHash, err := attributevalue.MarshalMap(hashMap)
	if err != nil {
		return err
	}

	_, err = dynamoDbCurrentInstance.DeleteItem(ctx, &dynamodb.DeleteItemInput{
		TableName: aws.String("SayGreen"),
		Key:       mappedHash,
	})
	if err != nil {
		return err
	}

	return nil
}

package dynamoDbGeo

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"os"
	"sync"
)

var (
	dynamoDbInstance *dynamodb.DynamoDB = nil
	dynamoDbError    error              = nil
	dynamoDbSync     sync.Once
)

func getDynamoDbInstance() (*dynamodb.DynamoDB, error) {
	dynamoDbSync.Do(func() {
		awsSession, dynamoDbError := session.NewSession(&aws.Config{Region: aws.String(os.Getenv("AWS_DEFAULT_REGION"))}, nil)
		if dynamoDbError != nil {
			return
		}

		dynamoDbInstance = dynamodb.New(awsSession)
	})

	return dynamoDbInstance, dynamoDbError
}

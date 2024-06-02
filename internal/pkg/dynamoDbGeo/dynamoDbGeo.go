package dynamoDbGeo

import (
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/crolly/dyngeo"
	"github.com/gofrs/uuid"
	"os"
)

type LatLng struct {
	Latitude  float64 `json:"latitude,omitempty"`
	Longitude float64 `json:"longitude,omitempty"`
}

func CreatePoint(point LatLng) (any, error) {
	dynamoDbClient, err := getDynamoDbInstance()
	if err != nil {
		return nil, err
	}

	dynGeoConfig := dyngeo.DynGeoConfig{
		TableName:             os.Getenv("TABLE_NAME"),
		HashKeyAttributeName:  os.Getenv("HASH_KEY_ATTRIBUTE"),
		RangeKeyAttributeName: os.Getenv("RANGE_KEY_ATTRIBUTE"),
		GeoHashIndexName:      os.Getenv("GEO_HASH_INDEX_NAME"),
		HashKeyLength:         6,
		DynamoDBClient:        dynamoDbClient,
	}

	dynGeo, err := dyngeo.New(dynGeoConfig)
	if err != nil {
		return nil, err
	}

	uuidValue, err := uuid.NewV4()
	if err != nil {
		return nil, err
	}

	putPointInput := dyngeo.PutPointInput{
		PointInput: dyngeo.PointInput{
			GeoPoint:      dyngeo.GeoPoint{Latitude: point.Latitude, Longitude: point.Longitude},
			RangeKeyValue: uuidValue,
		},
		PutItemInput: dynamodb.PutItemInput{
			Item: make(map[string]*dynamodb.AttributeValue),
		},
	}
	putPointOutput, err := dynGeo.PutPoint(putPointInput)
	if err != nil {
		panic(err)
	}

	var output any

	err = dynamodbattribute.UnmarshalMap(putPointOutput.Attributes, &output)
	if err != nil {
		return nil, err
	}

	return output, nil
}

package storeReceptacleLambda

import (
	"context"
	"os"
	"testing"

	"github.com/aws/aws-sdk-go-v2/aws"
)

func TestMain(m *testing.M) {
	os.Setenv("AWS_DEFAULT_REGION", "ap-southeast-1")
	os.Exit(m.Run())
}

func TestCreate(t *testing.T) {
	hash, err := create(context.TODO(), 40.21, 1.5)
	if err != nil {
		t.Fatal(err)
	}

	t.Log(hash)
}

func TestQuery(t *testing.T) {
	receptacles, err := query(context.TODO())
	if err != nil {
		t.Fatal(err)
	}

	t.Log(receptacles)
}

func TestDelete(t *testing.T) {
	testingData := "8d3d44b2-7a4b-11ee-ad88-02967b5c22e7"
	t.Log("sample")
	err := delete(context.TODO(), testingData)
	if err != nil {
		t.Fatal(err)
	}
}

func TestHandlerGetReceptacle(t *testing.T) {
	testingData := lambdaInput{
		Type: aws.String("get"),
	}

	response, err := Handler(context.TODO(), testingData)
	if err != nil {
		t.Fatal(err)
	}

	t.Log(response)
}

func TestHandlerCreateReceptacle(t *testing.T) {
	testingData := lambdaInput{
		Type: aws.String("create"),
		Payload: receptacleLocation{
			Longitude: aws.Float64(1.4),
			Latitude:  aws.Float64(4.5),
		},
	}

	response, err := Handler(context.TODO(), testingData)
	if err != nil {
		t.Fatal(err)
	}

	t.Log(response)
}

func TestHandlerDeleteReceptacle(t *testing.T) {
	testingData := lambdaInput{
		Type: aws.String("delete"),
		Payload: receptacleLocation{
			Hash: aws.String("549a5d86-7a9b-11ee-97ee-1ec34096f47d"),
		},
	}

	response, err := Handler(context.TODO(), testingData)
	if err != nil {
		t.Fatal(err)
	}

	t.Log(response)
}

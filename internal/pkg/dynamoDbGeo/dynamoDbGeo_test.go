package dynamoDbGeo

import (
	"os"
	"testing"
)

func TestMain(m *testing.M) {
	_ = os.Setenv("AWS_DEFAULT_REGION", "ap-southeast-1")
	_ = os.Setenv("TABLE_NAME", "say-green")
	_ = os.Setenv("HASH_KEY_ATTRIBUTE", "hash")
	_ = os.Setenv("RANGE_KEY_ATTRIBUTE", "range")
	_ = os.Setenv("GEO_HASH_INDEX_NAME", "hash-geohash")

	os.Exit(m.Run())
}

func TestCreatePoint(t *testing.T) {
	response, err := CreatePoint(LatLng{
		Latitude:  14.654783998532679,
		Longitude: 120.98972975358811,
	})
	if err != nil {
		t.Error(err)
	}

	t.Log(response)
}

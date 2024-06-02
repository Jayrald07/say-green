package main_test

import (
	"context"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"os"
	createPoint "receptacle/cmd/create-point"
	"receptacle/internal/pkg/dynamoDbGeo"
)

var _ = Describe("Point", func() {
	var point dynamoDbGeo.LatLng
	var ctx context.Context

	BeforeEach(func() {
		_ = os.Setenv("AWS_DEFAULT_REGION", "ap-southeast-1")
		_ = os.Setenv("TABLE_NAME", "say-green")
		_ = os.Setenv("HASH_KEY_ATTRIBUTE", "hash")
		_ = os.Setenv("RANGE_KEY_ATTRIBUTE", "range")
		_ = os.Setenv("GEO_HASH_INDEX_NAME", "hash-geohash")

		point = dynamoDbGeo.LatLng{
			Latitude:  0,
			Longitude: 0,
		}

		ctx = context.Background()
	})

	Describe("Creating point", func() {
		It("should create a valid point", func() {
			result, err := createPoint.Handler(ctx, point)

			Expect(err).To(BeNil())
			Expect(result).ToNot(BeNil())
		})
	})
})

package main_test

import (
	"context"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"os"
	getPoints "receptacle/cmd/get-points"
	"receptacle/internal/pkg/dynamoDbGeo"
)

var _ = Describe("GetPoints", func() {
	var ctx context.Context

	BeforeEach(func() {
		_ = os.Setenv("AWS_DEFAULT_REGION", "ap-southeast-1")
		_ = os.Setenv("TABLE_NAME", "say-green")
		_ = os.Setenv("HASH_KEY_ATTRIBUTE", "hash")
		_ = os.Setenv("RANGE_KEY_ATTRIBUTE", "range")
		_ = os.Setenv("GEO_HASH_INDEX_NAME", "hash-geohash")

		ctx = context.Background()
	})

	Describe("Get Points", func() {
		It("should return a list of points", func() {
			points, err := getPoints.HandleRequest(ctx, dynamoDbGeo.GetPointsOptions{
				Radius: 100,
				LatLng: &dynamoDbGeo.LatLng{
					Latitude:  14.65422372457833,
					Longitude: 120.98895973266514,
				},
			})

			Expect(err).To(BeNil())
			Expect(points).ToNot(BeNil())
		})
	})
})

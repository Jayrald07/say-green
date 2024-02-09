package main

import (
	storeReceptacleLambda "receptacle/functions/storeReceptacleLambda/cmd"

	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(storeReceptacleLambda.Handler)
}

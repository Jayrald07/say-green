package storeReceptacleLambda

type receptacleLocation struct {
	Hash      *string  `json:"hash,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Latitude  *float64 `json:"latitude,omitempty"`
}

type lambdaInput struct {
	Type    *string            `json:"type,omitempty"`
	Payload receptacleLocation `json:"payload,omitempty"`
}

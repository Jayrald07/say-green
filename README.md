# Say Green
[![Say Green Deployment](https://github.com/Jayrald07/say-green/actions/workflows/deployment.yml/badge.svg)](https://github.com/Jayrald07/say-green/actions/workflows/deployment.yml)

A web app that monitor the green environment of certain area


## Infrastructure
![image](https://github.com/Jayrald07/say-green/assets/50800466/83b340ce-92a6-4916-bbaa-1754b53cfd55)


## Environment Variables

In order to run the source code. The following environment variables should be setup first:

```bash
MAPBOX_GL_ACCESS_TOKEN=<TOKEN-HERE>

BOUNDARY_COORDINATE_LNG_TOP_LEFT=<POINT> // Example: 120.123
BOUNDARY_COORDINATE_LAT_TOP_LEFT=<POINT>  // Example: 14.123

BOUNDARY_COORDINATE_LNG_TOP_RIGHT=<POINT>
BOUNDARY_COORDINATE_LAT_TOP_RIGHT=<POINT>

BOUNDARY_COORDINATE_LNG_BOTTOM_RIGHT=<POINT>
BOUNDARY_COORDINATE_LAT_BOTTOM_RIGHT=<POINT>

BOUNDARY_COORDINATE_LNG_BOTTOM_LEFT=<POINT>
BOUNDARY_COORDINATE_LAT_BOTTOM_LEFT=<POINT>
```

# geohashes-clusterer

## Table of contents

### Functions

- [assignClusterToGeohashes](README.md#assignclustertogeohashes)
- [clusterGeohashesAsGeoJSON](README.md#clustergeohashesasgeojson)
- [clusterGeohashesByValue](README.md#clustergeohashesbyvalue)

## Functions

### assignClusterToGeohashes

▸ **assignClusterToGeohashes**(`data`: _any_[], `geohashProp`: _string_, `valueProp`: _string_, `bucketsArray`: Buckets): ClusteredGeohashItem[]

Assigns a cluster to each geohash based on provided buckets

**`export`**

#### Parameters:

| Name           | Type     | Description                                                                                                                                     |
| :------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`         | _any_[]  | The input data, it can have any props, but only 2 will be used                                                                                  |
| `geohashProp`  | _string_ | The prop holding the geohash string                                                                                                             |
| `valueProp`    | _string_ | The prop holding the value (number)                                                                                                             |
| `bucketsArray` | Buckets  | The buckets array expressing min and max. Will check if geohash value is greater or equal than the bucket start, or smaller than the bucket max |

**Returns:** ClusteredGeohashItem[]

The geohash list with an assigned bucket

Defined in: index.ts:25

---

### clusterGeohashesAsGeoJSON

▸ **clusterGeohashesAsGeoJSON**(`data`: _any_[], `geohashProp`: _string_, `valueProp`: _string_, `buckets`: Buckets): _FeatureCollection_<Polygon \| MultiPolygon\>

Creates a GeoJSON FeatureCollection with the clusters as Features

**`export`**

#### Parameters:

| Name          | Type     | Description                                                                                                                                     |
| :------------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`        | _any_[]  | The input data, it can have any props, but only 2 will be used                                                                                  |
| `geohashProp` | _string_ | The prop holding the geohash string                                                                                                             |
| `valueProp`   | _string_ | The prop holding the value (number)                                                                                                             |
| `buckets`     | Buckets  | The buckets array expressing min and max. Will check if geohash value is greater or equal than the bucket start, or smaller than the bucket max |

**Returns:** _FeatureCollection_<Polygon \| MultiPolygon\>

The resulting FeatureCollection. Each Feature has the cluster name in its properties

Defined in: index.ts:65

---

### clusterGeohashesByValue

▸ **clusterGeohashesByValue**(`data`: _any_[], `geohashProp`: _string_, `valueProp`: _string_, `bucketsArray`: Buckets): ClusterObj

Clusters geohashes into an object, with the cluster tag as prop and the arrays of clustered geohashes as value

**`export`**

#### Parameters:

| Name           | Type     | Description                                                                                                                                     |
| :------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`         | _any_[]  | The input data, it can have any props, but only 2 will be used                                                                                  |
| `geohashProp`  | _string_ | The prop holding the geohash string                                                                                                             |
| `valueProp`    | _string_ | The prop holding the value (number)                                                                                                             |
| `bucketsArray` | Buckets  | The buckets array expressing min and max. Will check if geohash value is greater or equal than the bucket start, or smaller than the bucket max |

**Returns:** ClusterObj

The object holding the clusters and its members

Defined in: index.ts:50

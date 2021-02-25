import {Bucket} from './helpers/buckets';
import {ClusteredGeohashItem, convertGeohashListToPolygonFeature, GeohashItem} from './helpers/geohashes';
import {Feature} from 'geojson';
import {FeatureCollection, featureCollection, MultiPolygon, Polygon} from '@turf/helpers';
import {groupBy} from 'lodash';

type Buckets = {
  start: number;
  end: number;
}[];

interface ClusterObj {
  [clusterTag: string]: ClusteredGeohashItem[];
}

/**
 * Assigns a cluster to each geohash based on provided buckets
 * @export
 * @param  {any[]} data The input data, it can have any props, but only 2 will be used
 * @param  {string} geohashProp The prop holding the geohash string
 * @param  {string} valueProp The prop holding the value (number)
 * @param  {Buckets} bucketsArray The buckets array expressing min and max. Will check if geohash value is greater or equal than the bucket start, or smaller than the bucket max
 * @return {ClusteredGeohashItem[]} The geohash list with an assigned bucket
 */
export function assignClusterToGeohashes(data: any[], geohashProp: string, valueProp: string, bucketsArray: Buckets): ClusteredGeohashItem[] {
  const parsedData: GeohashItem[] = data.map((item) => new GeohashItem(item[geohashProp], item[valueProp]));

  const buckets: Bucket[] = bucketsArray.map(({start, end}) => new Bucket(start, end));

  return parsedData.reduce((agg: ClusteredGeohashItem[], item) => {
    for (const bucket of buckets) {
      if (bucket.isInBucket(item.value)) {
        agg.push(new ClusteredGeohashItem(item, bucket.tag));
        break;
      }
    }
    return agg;
  }, []);
}

/**
 * Clusters geohashes into an object, with the cluster tag as prop and the arrays of clustered geohashes as value
 * @export
 * @param  {any[]} data The input data, it can have any props, but only 2 will be used
 * @param  {string} geohashProp The prop holding the geohash string
 * @param  {string} valueProp The prop holding the value (number)
 * @param  {Buckets} bucketsArray The buckets array expressing min and max. Will check if geohash value is greater or equal than the bucket start, or smaller than the bucket max
 * @return {ClusterObj} The object holding the clusters and its members
 */
export function clusterGeohashesByValue(data: any[], geohashProp: string, valueProp: string, bucketsArray: Buckets): ClusterObj {
  const assigned = assignClusterToGeohashes(data, geohashProp, valueProp, bucketsArray);

  return groupBy(assigned, (d) => d.cluster);
}

/**
 * Creates a GeoJSON FeatureCollection with the clusters as Features
 * @export
 * @param  {any[]} data The input data, it can have any props, but only 2 will be used
 * @param  {string} geohashProp The prop holding the geohash string
 * @param  {string} valueProp The prop holding the value (number)
 * @param  {Buckets} buckets The buckets array expressing min and max. Will check if geohash value is greater or equal than the bucket start, or smaller than the bucket max
 * @return {(FeatureCollection<Polygon | MultiPolygon>)} The resulting FeatureCollection. Each Feature has the cluster name in its properties
 */
export function clusterGeohashesAsGeoJSON(data: any[], geohashProp: string, valueProp: string, buckets: Buckets): FeatureCollection<Polygon | MultiPolygon> {
  const bucketedData = clusterGeohashesByValue(data, geohashProp, valueProp, buckets);

  const features: Feature<Polygon | MultiPolygon>[] = Object.values(bucketedData).map((geohashes) => convertGeohashListToPolygonFeature(geohashes) as Feature<Polygon | MultiPolygon>);

  return featureCollection(features) as FeatureCollection<Polygon | MultiPolygon>;
}

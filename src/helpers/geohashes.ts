import union from '@turf/union';
import {geohashToPolygonFeature} from 'geohash-to-geojson';
import {GeoJsonProperties, Polygon, MultiPolygon, Feature} from 'geojson';
import {neighbors} from 'ngeohash';

/**
 * GeohashItem class
 * @export
 * @class GeohashItem
 */
export class GeohashItem {
  public geohash: string;
  public value: number;
  public neighbours: string[];

  /**
   * Creates an instance of GeohashItem.
   * @param  {string} geohash Geohash string representation
   * @param  {number} value Value for the geohash
   * @memberof GeohashItem
   */
  constructor(geohash: string, value: number) {
    this.geohash = geohash;
    this.value = value;
    this.neighbours = neighbors(geohash);
  }
}

/**
 * ClusteredGeohashItem class
 * @export
 * @class ClusteredGeohashItem
 * @extends GeohashItem
 */
export class ClusteredGeohashItem extends GeohashItem {
  public cluster: string;

  /**
   * Creates an instance of ClusteredGeohashItem.
   * @param  {GeohashItem} geohashItem Instance of GeohashItem
   * @param  {string} cluster Cluster ID to which it belongs
   * @memberof ClusteredGeohashItem
   */
  public constructor(geohashItem: GeohashItem, cluster: string) {
    super(geohashItem.geohash, geohashItem.value);
    this.cluster = cluster;
  }
}

/**
 * Gets the neighbours of a geohash
 * @export
 * @param  {string} geohash String representation of a geohash
 * @return {string[]} The neighbours list
 */
export function getNeighbours(geohash: string): string[] {
  return neighbors(geohash);
}

/**
 * Converts a single geohash to a GeoJSON Polygon Feature
 * @export
 * @param  {string} geohash Geohash to convert to GeoJSON
 * @param  {GeoJsonProperties} [properties] Properties to assign to the GeoJSON Feature
 * @return {Feature<Polygon>} The geohash expressed as a GeoJSON
 */
export function convertGeohashToPolygonFeature(geohash: string, properties?: GeoJsonProperties): Feature<Polygon> {
  return geohashToPolygonFeature(geohash, properties as any) as Feature<Polygon>;
}

/**
 * Converts a list of ClusteredGeohashItems to a GeoJSON Feature
 * @export
 * @param  {ClusteredGeohashItem[]} geohashList List of geohashes to transform and join
 * @return {(Feature<Polygon | MultiPolygon> | undefined)} The union of the geohashes
 */
export function convertGeohashListToPolygonFeature(geohashList: ClusteredGeohashItem[]): Feature<Polygon | MultiPolygon> | undefined {
  let joined: Feature<Polygon | MultiPolygon> | undefined;

  const [{cluster}] = geohashList;

  geohashList.forEach(({geohash}) => {
    if (joined === undefined) {
      joined = convertGeohashToPolygonFeature(geohash, {cluster});
    } else {
      joined = union(joined, convertGeohashToPolygonFeature(geohash), {properties: {cluster}}) as Feature<Polygon | MultiPolygon>;
    }
  });

  return joined;
}

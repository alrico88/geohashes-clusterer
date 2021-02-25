/* eslint-disable @typescript-eslint/no-magic-numbers */
import {getNeighbours} from '../src/helpers/geohashes';
import {assignClusterToGeohashes, clusterGeohashesAsGeoJSON} from '../src';

const testHash = 'ezjmgtxj';

const neighbours = getNeighbours(testHash);

const buckets = [
  {
    start: 1,
    end: 3,
  },
  {
    start: 3,
    end: 19,
  },
];

const testData = neighbours.reduce((agg, geohash, index) => {
  agg.push({
    geohash,
    value: index < 3 ? 2 : index + 1,
  });

  return agg;
}, [] as {geohash: string; value: number}[]);

describe('Test clustering methods', () => {
  it('Returns correct clusters number', () => {
    const withClusters = assignClusterToGeohashes(testData, 'geohash', 'value', buckets);
    const clustersLength = new Set(withClusters.map((d) => d.cluster)).size;
    expect(clustersLength).toEqual(2);
  });

  it('Returns correct clusters content length', () => {
    const withClusters = assignClusterToGeohashes(testData, 'geohash', 'value', buckets);
    const clusterNames: string[] = Array.from(new Set(withClusters.map((d) => d.cluster)));
    const lengths = clusterNames.reduce((agg, clusterName) => {
      const inCluster = withClusters.filter(({cluster}) => cluster === clusterName);
      agg.push(inCluster.length);
      return agg;
    }, [] as number[]);
    expect(lengths).toEqual([3, 5]);
  });
});

describe('Test GeoJSON methods', () => {
  it('Should return a FeatureCollection with as many features as clusters', () => {
    const withClusters = clusterGeohashesAsGeoJSON(testData, 'geohash', 'value', buckets);
    const clustersLength = withClusters.features.length;
    expect(clustersLength).toEqual(2);
  });
});

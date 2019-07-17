/* eslint-disable quotes */
/* eslint-disable no-console */
import 'app-module-path/cwd';
import 'src/util/env.util';

import fs from 'fs';
import parse from 'csv-parse';
import path from 'path';

import db from 'src/tables/_.tables';

const checkCoord = (rawCoord) => {
  const val = parseFloat(rawCoord);
  return (!!val && val <= 90 && val >= -90) ? val : null;
};

const parser = parse({
  columns: true,
  skip_empty_lines: true,
}, async (err, data) => {
  const restaurantDataArr = data.map((specificRestaurant) => {
    const restaurantData = {
      addressCity: specificRestaurant.city,
      addressState: specificRestaurant.state,
      addressStreet: specificRestaurant.street_address,
      addressZip: specificRestaurant.zip_code,
      categoryCode: specificRestaurant.naics_code,
      categoryName: specificRestaurant.sub_category,
      locationName: specificRestaurant.location_name,
      locationLatitude: checkCoord(specificRestaurant.latitude),
      locationLongitude: checkCoord(specificRestaurant.longitude),
      safegraphPlaceId: specificRestaurant.safegraph_place_id,
    };

    const coordinates = [
      specificRestaurant.polygon_wkt
        .substring(10, specificRestaurant.polygon_wkt.length - 2)
        .split(', ')
        .map(rawCoord => ([
          checkCoord(rawCoord.split(' ')[0]),
          checkCoord(rawCoord.split(' ')[1]),
        ])),
    ];

    restaurantData.safegraphPolygon = {
      type: 'Polygon',
      coordinates,
    };

    return restaurantData;
  });

  await db.Restaurant.bulkCreate(restaurantDataArr);
  console.log(`\n🚀 Imported 🚀`);
});

fs.createReadStream(path.resolve(__dirname, './data/nyc-restaurant-cleaned.csv')).pipe(parser);

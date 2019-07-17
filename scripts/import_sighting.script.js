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
  const sightingDataArr = data.map((specificSighting) => {
    const sightingData = {
      addressType: specificSighting.address_type,
      incidentAddress: specificSighting.incident_address,
      incidentBorough: specificSighting.borough,
      incidentCity: specificSighting.city,
      incidentStatus: specificSighting.status,
      incidentZip: specificSighting.incident_zip,
      locationLatitude: specificSighting.latitude,
      locationLongitude: specificSighting.longitude,
      locationType: specificSighting.location_type,
      sightingId: specificSighting.unique_key,
    };

    if (specificSighting.closed_date.length > 0) {
      sightingData.sightingClosedDate = specificSighting.closed_date;
    }
    if (specificSighting.created_date.length > 0) {
      sightingData.sightingCreatedDate = specificSighting.created_date;
    }
    if (specificSighting.due_date.length > 0) {
      sightingData.sightingDueDate = specificSighting.due_date;
    }

    const coordinates = specificSighting.location
      .substring(1, specificSighting.location.length - 1)
      .split(',')
      .map(rawCoord => checkCoord(rawCoord));

    if (!!coordinates[0] && !!coordinates[1]) {
      sightingData.locationCoords = {
        type: 'Point',
        coordinates,
      };
    }

    return sightingData;
  });

  await db.Sighting.bulkCreate(sightingDataArr);
  console.log(`\n🚀 Imported 🚀`);
});

fs.createReadStream(path.resolve(__dirname, './data/rat-cleaned-no-lat-long.csv')).pipe(parser);

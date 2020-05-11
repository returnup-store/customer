const REGION_URL = 'https://raw.githubusercontent.com/prettydev/app-data/master/findstuff_region.json';

const fetchRegionData = () => {
  return new Promise((resolve, reject) => {
    fetch(REGION_URL)
      .then(response => response.json())
      .then(area => {
        resolve(area);
      })
      .catch(err => reject(err));
  });
};

export default fetchRegionData;

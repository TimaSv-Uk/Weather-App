export const icon_map = new Map()


addMap([0, 1], 'sun-solid')
addMap([2], 'sun-cloud')
addMap([3], 'cloud-solid')
addMap([45, 46], 'smog-solid')
addMap([51,53,55,56,57,61,63,65,66,67,80,81,82], 'cloud-showers-heavy-solid')
addMap([45, 46], 'smog-solid')

addMap([71,73,75,85,86], 'snowflake-solid')
addMap([95, 96, 99], 'cloud-bolt-solid')

function addMap(value, icon) {
  value.forEach(value => {
    icon_map.set(value, icon)
  });
}


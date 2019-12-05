const countOccurrences = (array, item) => {
  const matches = array.filter((a) =>(
    a.latitude
    && a.longitude
    && a.latitude.toFixed(6) === item.latitude.toFixed(6)
    && a.longitude.toFixed(6) === item.longitude.toFixed(6)
  ));
  return matches.length;
};

export default function formatBuses(buses) {
  const formattedBuses = [];

  for (let i = 0; i < buses.length; i++) {
    const bus = buses[i];
    const numberOccurrences = countOccurrences(formattedBuses, bus);
    const newBus = {
      ...bus,
      id: bus.bus_id,
      name: bus.bus_name.replace(/_/g, ' '),
    };
    if (numberOccurrences > 0) {
      newBus.occurrence = numberOccurrences;
    }
    formattedBuses.push(newBus);
  }

  return formattedBuses;
}

export default function (next, language) {
  const month = new Date().getMonth() + next ? 3 : 0;
  let season;
  let yers = new Date().getFullYear();
  if (language !== "pl") {
    if (month <= 2) {
      season = "winter";
    }
    if (month > 2 && month <= 5) {
      season = "spring";
    }
    if (month > 5 && month <= 8) {
      season = "summer";
    }
    if (month > 8) {
      season = "fall";
    }
  } else {
    if (month <= 2) {
      season = "Zima";
    }
    if (month > 2 && month <= 5) {
      season = "Wiosna";
    }
    if (month > 5 && month <= 8) {
      season = "Lato";
    }
    if (month > 8) {
      season = "Jesień";
    }
  }
  if (season === "fall" && next) {
    season = "winter";
    yers += 1;
  }

  return { yers: yers, season: season };
}

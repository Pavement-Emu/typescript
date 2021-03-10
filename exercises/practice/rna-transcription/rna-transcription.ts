function mapNucleotide(nucleotide: string) {
  switch (nucleotide) {
    case "C":
      return "G";
    case "G":
      return "C";
    case "A":
      return "U";
    case "T":
      return "A";
    default:
      throw Error("Invalid input DNA.");
  }
}
class Transcriptor {
  toRna(dna: string) {
    return dna.split("").map(mapNucleotide).join("");
  }
}

export default Transcriptor;

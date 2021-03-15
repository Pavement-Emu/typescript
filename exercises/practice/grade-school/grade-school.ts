type GradeRoster = string[];
interface Roster {
  [grade: number]: GradeRoster;
}

type Grade = number;
interface Roster2 {
  [name: string]: Grade;
}

export default class GradeSchool {
  private roster2: Roster2 = {};
  addStudent(name: string, grade: number) {
    this.roster2[name] = grade;

    var gradeRoster = this.studentsInGrade(grade);
    // use sorted list implementation
    gradeRoster.push(name);
    gradeRoster.sort();
  }

  studentsInGrade(grade: number) {
    const studentIsInGrade = (entry: [string, number]) => entry[1] === grade;
    const studentsInGrade = Object.entries(this.roster2)
      .filter(studentIsInGrade)
      .map((entry) => entry[0]);
    return [...studentsInGrade].sort();
  }

  studentRoster(): Map<string, string[]> {
    const newRoster = Object.entries(this.roster2).reduce(
      (roster: Roster, entry: [string, number]) => {
        const name = entry[0];
        const grade = entry[1];
        var gradeRoster = roster[grade];
        if (!gradeRoster) {
          gradeRoster = [];
          roster[grade] = gradeRoster;
        }
        roster[grade].push(name);
        roster[grade].sort();
        return roster;
      },
      {}
    );

    return new Map<string, string[]>(Object.entries(newRoster));
  }
}

export const AMinorScale = ["A", "B", "C", "D", "E", "F", "G"];

export const addOctaveNumbers = (scale: string[], octaveNumber: number) =>
  scale.map((note) => {
    const firstOctaveNoteIndex =
      scale.indexOf("C") !== -1 ? scale.indexOf("C") : scale.indexOf("C#");
    const noteOctaveNumber =
      scale.indexOf(note) < firstOctaveNoteIndex
        ? octaveNumber - 1
        : octaveNumber;
    return `${note}${noteOctaveNumber}`;
  });

const AMinorScaleWithOctave = addOctaveNumbers(AMinorScale, 4);
// Output ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'];
const constructMajorChord = (
  scale: string[],
  octave: number,
  rootNote: string
) => {
  const scaleWithOctave = addOctaveNumbers(scale, octave);

  const getNextChordNote = (note: string, nextNoteNumber: number) => {
    const nextNoteInScaleIndex =
      scaleWithOctave.indexOf(note) + nextNoteNumber - 1;
    let nextNote;
    if (typeof scaleWithOctave[nextNoteInScaleIndex] !== "undefined") {
      nextNote = scaleWithOctave[nextNoteInScaleIndex];
    } else {
      nextNote = scaleWithOctave[nextNoteInScaleIndex - 7];
      const updatedOctave = parseInt(nextNote.slice(1)) + 1;
      nextNote = `${nextNote.slice(0, 1)}${updatedOctave}`;
    }

    return nextNote;
  };

  const thirdNote = getNextChordNote(rootNote, 3);
  const fifthNote = getNextChordNote(rootNote, 5);
  const chord = [rootNote, thirdNote, fifthNote];

  return chord;
};

export const IChord = constructMajorChord(AMinorScale, 4, "A3");
export const IIChord = constructMajorChord(AMinorScale, 4, "B3");
export const IIIChord = constructMajorChord(AMinorScale, 4, "C3");
// Output: ['A3', 'C4', 'E4']
export const VChord = constructMajorChord(AMinorScale, 4, "E4");
// Output: ['E4', 'G4', 'B4']
export const VIChord = constructMajorChord(AMinorScale, 3, "F3");
// Output: ['F3', 'A3', 'C3']
export const IVChord = constructMajorChord(AMinorScale, 3, "D3");
// Output: ['D3', 'F3', 'A3']


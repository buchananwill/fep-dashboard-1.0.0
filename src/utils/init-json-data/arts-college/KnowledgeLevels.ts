interface KnowledgeLevelSeries {
  id: number;
  knowledgeLevelDescriptor: string;
  knowledgeLevels: KnowledgeLevel[];
}

interface KnowledgeLevel {
  id: number;
  name: string;
  levelOrdinal: number;
}

const grades: KnowledgeLevelSeries = {
  id: 1,
  knowledgeLevelDescriptor: "Music Grade",
  knowledgeLevels: [
    { id: 1, name: "Initial", levelOrdinal: 0 },
    { id: 2, name: "Grade 1", levelOrdinal: 1 },
    { id: 3, name: "Grade 2", levelOrdinal: 2 },
    { id: 4, name: "Grade 3", levelOrdinal: 3 },
    { id: 5, name: "Grade 4", levelOrdinal: 4 },
    { id: 6, name: "Grade 5", levelOrdinal: 5 },
    { id: 7, name: "Grade 6", levelOrdinal: 6 },
    { id: 8, name: "Grade 7", levelOrdinal: 7 },
    { id: 9, name: "Grade 8", levelOrdinal: 8 },
    { id: 10, name: "Diploma", levelOrdinal: 9 },
    { id: 11, name: "Higher Diploma", levelOrdinal: 10 },
    { id: 12, name: "Master Diploma", levelOrdinal: 11 },
  ],
};
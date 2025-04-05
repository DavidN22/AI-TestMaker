export interface Difficulty {
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface Test {
  test_id: string;
  title: string;
  headline: string;
  description: string;
  difficulty: Difficulty;
  provider: string;
}

export interface TestCardProps {
  title: string;
  headline: string;
  description: string;
  showMenu?: boolean;
  testId?: string;
}
export type TestCreation = Omit<Test, "test_id">;

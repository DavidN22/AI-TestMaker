export interface Test {
    test_id?: string;
  title: string;
  headline: string;
  description: string;
  difficulty: string;
  provider: string;
}
export interface CreateTest {
    test_id?: string;
  title: string;
  headline: string;
  description: string;
  difficulty: string;
  provider: string;
}
export interface TestCardProps {
    title: string;
    headline: string;
    description: string;
    showMenu?: boolean;
    testId?: string;
  }

import { useState } from "react";
import ModalTemplate from "../ModalTemplate";
import { PreviewQuestion } from "@/Types/Question";
import { useCreateCustomTestMutation } from "../../../store/Slices/customTestsApi";
import { CreateTest } from "@/Types/Tests";
import { useApi } from "../../../utils/api";

import InlineSpinner from "../../Loading/InlineSpinner";
import PreviewTest from "./PreviewTest";
import CreateTestForm from "./CreateTestForm";
import CreateTestActions from "./CreateTestActions";

interface CreateTestModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function CreateTestModal({
  isOpen,
  setIsOpen,
}: CreateTestModalProps) {
  const [testData, setTestData] = useState<CreateTest>({
    title: "",
    headline: "",
    description: "",
    difficulty: "Intermediate",
    provider: "Custom",
  });

  const { getPreviewTest, loading } = useApi();
  const [isCreating, setIsCreating] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewQuestion[] | null>(null);

  const [createCustomTest] = useCreateCustomTestMutation();

  const handleCreate = async () => {
    if (!isFormValid()) return;
    setIsCreating(true);
    const finalData = {
      ...testData,
      headline: testData.headline.trim() || `Custom ${testData.title} exam`,
    };
  
    try {
      await createCustomTest(finalData);
      setPreviewData(null);
      setIsOpen(false);
    } catch (err) {
      console.error("Error creating test:", err);
    } finally {
      setIsCreating(false);
    }
  };
  

  const isFormValid = () => {
    return (
      testData.title.trim() !== "" &&
      testData.description.trim() !== ""
    );
  };

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Create a Custom Test"
      size="custom"
    >
  <div className="flex flex-col justify-between h-full space-y-6 relative">
  {isCreating ? (
    <div className="flex justify-center items-center flex-grow">
      <InlineSpinner message="Creating your test..." />
    </div>
  ) : loading ? (
    <div className="flex justify-center items-center flex-grow">
      <InlineSpinner message="Generating AI preview..." />
    </div>
  ) : previewData ? (
    <PreviewTest
      questions={previewData}
      onBack={() => setPreviewData(null)}
      onCreate={handleCreate}
    />
  ) : (
    <>
      <CreateTestForm testData={testData} setTestData={setTestData} />
      <CreateTestActions
        isCreating={isCreating}
        isFormValid={isFormValid}
        onCancel={() => setIsOpen(false)}
        onCreate={handleCreate}
        onGeneratePreview={async () => {
          if (!isFormValid()) return;
          const preview = await getPreviewTest({
            ...testData,
            difficulty: testData.difficulty,
          });
          setPreviewData(preview.questions);
        }}
      />
    </>
  )}
</div>


    </ModalTemplate>
  );
}

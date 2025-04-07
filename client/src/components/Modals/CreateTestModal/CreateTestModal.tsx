import { useState, useEffect } from "react";
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
  initialData?: CreateTest;
  isEditing?: boolean;
  onUpdate?: (updated: CreateTest) => Promise<void>;
}

export default function CreateTestModal({
  isOpen,
  setIsOpen,
  initialData,
  isEditing = false,
  onUpdate,
}: CreateTestModalProps) {
  const [testData, setTestData] = useState<CreateTest>({
    title: "",
    headline: "",
    description: "",
    difficulty: "Intermediate",
    provider: "Custom",
  });
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  useEffect(() => {
    if (initialData) {
      setTestData(initialData);
    }
  }, [initialData]);

  const { getPreviewTest, loading } = useApi();
  const [isCreating, setIsCreating] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewQuestion[] | null>(
    null
  );

  const [createCustomTest] = useCreateCustomTestMutation();

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsCreating(true);
    const finalData = {
      ...testData,
      headline: testData.headline.trim() || `Custom ${testData.title} exam`,
    };

    try {
      if (isEditing && onUpdate) {
        await onUpdate(finalData);
      } else {
        await createCustomTest(finalData);
      }
      setPreviewData(null);
      setIsOpen(false);
    } catch (err) {
      console.error("Error saving test:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const isFormValid = () => {
    const newErrors: { title?: string; description?: string } = {};
    if (!testData.title.trim()) newErrors.title = "Test name is required.";
    if (!testData.description.trim())
      newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={isEditing ? "Edit Custom Test" : "Create a Custom Test"}
      size="custom"
    >
      <div className="flex flex-col justify-between h-full space-y-6 relative">
        {isCreating ? (
          <div className="flex justify-center items-center flex-grow">
            <InlineSpinner
              message={
                isEditing ? "Updating your test..." : "Creating your test..."
              }
            />
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center flex-grow">
            <InlineSpinner message="Generating AI preview..." />
          </div>
        ) : previewData ? (
          <PreviewTest
            questions={previewData}
            onBack={() => setPreviewData(null)}
            onCreate={handleSubmit}
          />
        ) : (
          <>
            <CreateTestForm
              testData={testData}
              setTestData={setTestData}
              errors={errors}
              setErrors={setErrors}
            />

            <CreateTestActions
              isCreating={isCreating}
              isEditing={isEditing}
              isFormValid={isFormValid}
              onCancel={() => setIsOpen(false)}
              onCreate={handleSubmit}
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
